import ExtendsClass from "./examples/extends-class";
import "./App.css";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import { Pagination } from "./examples/pagination";

const MAP_URLS = {
  extends: <ExtendsClass />,
  pagination: <Pagination />,
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        {Object.entries(MAP_URLS).map((item) => (
          <Route key={item[0]} path={item[0]} element={item[1]} />
        ))}
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  console.log("render Layout");
  return (
    <div style={{ padding: "1rem" }}>
      <Outlet />
    </div>
  );
}

export function Page404() {
  return <div>Page not found - 404</div>;
}

function Home() {
  return (
    <ul style={{ display: "flex", gap: "1rem" }}>
      {Object.keys(MAP_URLS).map((url) => (
        <Link key={url} to={url}>
          <button>{url}</button>
        </Link>
      ))}
    </ul>
  );
}

export default App;

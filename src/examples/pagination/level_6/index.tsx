import { ButtonHTMLAttributes, InputHTMLAttributes, useRef } from "react";
import {
  PaginationStore,
  PaginationStoreContext,
  usePagination,
  usePaginationStore,
} from "./store";
import { observer } from "mobx-react-lite";
import { useRouterStore } from "../stores/root-store";

const PaginationPage = observer(() => {
  const store = usePaginationStore();

  return <h1>{store?.page}</h1>;
});

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button {...props} />;
};

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return <input type="number" {...props} />;
};

const PaginationData = observer(() => {
  const store = usePaginationStore();
  return (
    <>
      <h2>Data</h2>
      <div
        style={{
          height: "20rem",
          marginBottom: "2rem",
          overflowY: "scroll",
        }}
      >
        {store?.loading ? (
          <p>Loading....</p>
        ) : (
          <pre>{JSON.stringify(store?.swrData?.data, undefined, 2)}</pre>
        )}
      </div>
    </>
  );
});

const PaginationButtons = observer(() => {
  const store = usePaginationStore();

  return (
    <>
      <Button disabled={store?.isFirstPage} onClick={() => store?.onChange(1)}>
        {"<<"}
      </Button>
      <Button
        disabled={store?.isFirstPage}
        onClick={() => store?.onChange(store?.page - 1)}
      >
        {"prev"}
      </Button>
      <Button
        disabled={store?.isLastPage}
        onClick={() => store?.onChange(store?.page + 1)}
      >
        {"next"}
      </Button>
    </>
  );
});

const PaginationInput = observer(() => {
  const store = usePaginationStore();
  console.log("render Input", store?.inputPage, store?.page);

  return (
    <Input
      value={store?.inputPage}
      onChange={(e) => {
        store?.onInputChange(e.currentTarget.value);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          store?.onChange(store?.inputPage);
        }
      }}
    />
  );
});

const PaginationTotal = observer(() => {
  const store = usePaginationStore();

  return (
    <>
      {store?.isLastPage ? (
        <span>&nbsp;{store?.total}</span>
      ) : (
        <Button onClick={() => store?.onChange(store?.total)}>
          {store?.total}
        </Button>
      )}
    </>
  );
});

const Pagination = () => {
  const routerStore = useRouterStore();
  const store = useRef(new PaginationStore(routerStore)).current;

  usePagination(store);
  console.log("render Pagination");

  return (
    <PaginationStoreContext.Provider value={store}>
      <PaginationData />
      <PaginationButtons />
      <PaginationInput />

      <span>list of</span>
      <PaginationTotal />
      <PaginationPage />
    </PaginationStoreContext.Provider>
  );
};

export { Pagination };

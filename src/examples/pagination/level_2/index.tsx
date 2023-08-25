import { ButtonHTMLAttributes, InputHTMLAttributes, useRef } from "react";
import { PaginationStore, usePagination } from "./store";
import { Observer, observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const Page = observer(({ value }: { value: number }) => {
  return <h1>{value}</h1>;
});

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  console.log("render Button");
  return <button {...props} />;
};

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  console.log("render Input");
  return <input type="number" {...props} />;
};

const Pagination = () => {
  const store = useRef(new PaginationStore()).current;

  usePagination(store);

  console.log("render", store);
  return (
    <div>
      <Button onClick={() => store.onChange(1)}>{"<<"}</Button>

      <Button onClick={() => store.onChange(store.page - 1)}>{"prev"}</Button>

      <Button onClick={() => store.onChange(store.page + 1)}>{"next"}</Button>

      <Observer>
        {() => (
          <Input
            value={store.inputPage}
            onChange={(e) => {
              store.onInputChange(e.currentTarget.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                store.onChange(store.inputPage);
              }
            }}
          />
        )}
      </Observer>

      <Observer>{() => <Page value={store.page} />}</Observer>
    </div>
  );
};

export { Pagination };

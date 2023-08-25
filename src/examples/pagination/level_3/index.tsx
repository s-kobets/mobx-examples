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
      <Observer>
        {() => (
          <Button
            disabled={store.isFirstPage}
            onClick={() => store.onChange(1)}
          >
            {"<<"}
          </Button>
        )}
      </Observer>
      <Observer>
        {() => (
          <Button
            disabled={store.isFirstPage}
            onClick={() => store.onChange(store.page - 1)}
          >
            {"prev"}
          </Button>
        )}
      </Observer>

      <Observer>
        {() => (
          <Button
            disabled={store.isLastPage}
            onClick={() => store.onChange(store.page + 1)}
          >
            {"next"}
          </Button>
        )}
      </Observer>

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

      <span>list of</span>
      <Observer>
        {() => (
          <>
            {store.isLastPage ? (
              <span>&nbsp;{store.total}</span>
            ) : (
              <Button onClick={() => store.onChange(store.total)}>
                {store.total}
              </Button>
            )}
          </>
        )}
      </Observer>
      <Observer>{() => <Page value={store.page} />}</Observer>
    </div>
  );
};

export { Pagination };

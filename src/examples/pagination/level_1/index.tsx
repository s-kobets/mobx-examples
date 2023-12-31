import { CodeSandBox } from "helpers/codesandbox";
const jsx = `
import { ButtonHTMLAttributes, useRef } from "react";
import { PaginationStore, usePagination } from "./store";
import { Observer, observer } from "mobx-react-lite";

const Page = observer(({ value }: { value: number }) => {
  return <h1>{value}</h1>;
});

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  console.log("render Button");
  return <button {...props} />;
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
      <Observer>{() => <Page value={store.page} />}</Observer>
    </div>
  );
};

export default Pagination;
`;

const store = `
import { makeAutoObservable } from "mobx";

export class PaginationStore {
  page = 1;
  inputPage = this.page;
  total = 10;

  constructor() {
    makeAutoObservable(this);
  }

  onChange(page: number) {
    this.page = page;
  }
}

export const usePagination = (store: PaginationStore) => {};
`;
const Pagination = () => {
  return <CodeSandBox jsx={jsx} store={store} />;
};

export { Pagination };

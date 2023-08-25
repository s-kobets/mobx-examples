import { makeAutoObservable } from "mobx";
import { useSearchParams } from "react-router-dom";

type URLSearchParams = ReturnType<typeof useSearchParams>;
type QueryKey = "page";
type Value = string | string[];
interface SetQuery {
  (d: Partial<Record<QueryKey, Value>>): void;
}

const queryNamePage = "page";

export class RouterStore {
  constructor(public urlSearchParams: URLSearchParams) {
    makeAutoObservable(this);
  }

  get query() {
    return this.urlSearchParams[0];
  }

  setQuery: SetQuery = (data) => {
    const setSearchParams = this.urlSearchParams[1];
    return setSearchParams(data);
  };

  get page() {
    return Number(this.query?.get(queryNamePage));
  }
}

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
    const queryKeys = Array.from(this.query.keys()) ?? [];
    const queries = queryKeys.reduce(
      (acc, key) => ({ ...acc, [key]: this.query.get(key) }),
      {}
    );
    const setSearchParams = this.urlSearchParams[1];
    return setSearchParams({ ...queries, ...data });
  };

  get page() {
    return Number(this.query?.get(queryNamePage));
  }
}

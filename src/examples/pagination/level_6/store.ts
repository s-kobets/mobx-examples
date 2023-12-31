import { makeAutoObservable, reaction } from "mobx";
import { createContext, useContext, useEffect } from "react";
import useSWR, { SWRResponse } from "swr";
import { RouterStore } from "../stores/router-store";

type Data = {
  total: number;
};
export class PaginationStore {
  page = 1;
  inputPage = this.page;
  total = 1;
  peerPage = 10;
  swrData: SWRResponse<Data> | null = null;

  constructor(public routerStore: RouterStore) {
    makeAutoObservable(this);
  }

  reactions = () => {
    const disposers = [
      reaction(
        () => this.stringPage,
        (stringPage) => {
          this.onInputChange(stringPage);
        }
      ),
      reaction(
        () => this.swrData?.data,
        (data) => {
          if (data?.total) {
            this.total = data.total / this.peerPage;
          }
        }
      ),
      reaction(
        () => this.stringPage,
        (stringPage) => {
          this.routerStore.setQuery({ page: stringPage });
        }
      ),
    ];

    return () => disposers.forEach((i) => i());
  };

  get isFirstPage() {
    return this.page === 1;
  }

  get isLastPage() {
    return this.page === this.total;
  }

  onChange(page: number) {
    this.page = page;
  }

  onInputChange(value: string) {
    const page = Number(value);
    if (page > this.total) {
      this.inputPage = this.total;
    } else if (page < 1) {
      this.inputPage = 1;
    } else {
      this.inputPage = page;
    }
  }

  get stringPage() {
    return String(this.page);
  }

  setSwrData(data: SWRResponse<Data>) {
    this.swrData = data;
  }

  get loading() {
    return this.swrData?.isLoading || this.swrData?.isValidating;
  }

  get requestList() {
    return {
      peerPage: this.peerPage,
      page: this.page,
    };
  }

  // https://dummyjson.com/docs/products
  fetchList(params: typeof this.requestList) {
    return fetch(
      `https://dummyjson.com/products` +
        `?limit=${params.peerPage}&skip=${params.page * params.peerPage}`
    ).then((res) => res.json());
  }
}

export const usePagination = (store: PaginationStore) => {
  console.log(123, "usePagination");
  const swrData = useSWR(store.requestList, store.fetchList);

  useEffect(() => {
    store.setSwrData(swrData);
  }, [store, swrData]);

  useEffect(() => {
    const { page } = store.routerStore;
    if (page) {
      store.onChange(page);
    }
  }, [store, store.routerStore.page]);

  useEffect(() => store.reactions(), [store]);
};

export const PaginationStoreContext = createContext<PaginationStore | null>(
  null
);

export const usePaginationStore = () => useContext(PaginationStoreContext);

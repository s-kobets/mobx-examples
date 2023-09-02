import { makeAutoObservable, reaction } from "mobx";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useSWR, { SWRResponse } from "swr";

type Data = {
  total: number;
};
export class PaginationStore {
  page = 1;
  inputPage = this.page;
  total = 1;
  peerPage = 10;
  swrData: SWRResponse<Data> | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  reactions = () => {
    const disposers = [
      reaction(
        () => this.page,
        (page) => {
          this.onInputChange(String(page));
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

  setSwrData(data: any) {
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

const queryNamePage = "page";

export const usePagination = (store: PaginationStore) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const swrData = useSWR(store.requestList, store.fetchList);

  useEffect(() => {
    store.setSwrData(swrData);
  }, [store, swrData]);

  // initial
  useEffect(() => {
    const page = searchParams.get(queryNamePage);
    if (page) {
      store.onChange(+page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => store.reactions(), [store]);

  useEffect(() => {
    const disposer = reaction(
      () => store.stringPage,
      (stringPage) => {
        setSearchParams({ [queryNamePage]: stringPage });
      }
    );
    return () => {
      disposer();
    };
  }, [searchParams, setSearchParams, store]);
};

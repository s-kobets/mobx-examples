import { autorun, makeAutoObservable, reaction } from "mobx";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export class PaginationStore {
  page = 1;
  inputPage = this.page;
  total = 10;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.page,
      (page) => {
        this.onInputChange(String(page));
      }
    );
  }

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
}

const queryNamePage = "page";

export const usePagination = (store: PaginationStore) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // initial
  useEffect(() => {
    const page = searchParams.get(queryNamePage);
    if (page) {
      store.onChange(+page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // reaction(
    //   () => store.stringPage,
    //   (stringPage) => {
    //     const page = searchParams.get(queryNamePage);
    //     console.log("reaction", page, stringPage);

    //     setSearchParams({ [queryNamePage]: stringPage });
    //   }
    // );

    autorun(() => {
      const page = searchParams.get(queryNamePage);
      console.log("autorun", page, store.stringPage);

      setSearchParams({ [queryNamePage]: store.stringPage });
    });
  }, [searchParams, setSearchParams, store]);
};

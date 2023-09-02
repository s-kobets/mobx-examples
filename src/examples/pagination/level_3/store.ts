import { makeAutoObservable, reaction } from "mobx";
import { useEffect } from "react";

export class PaginationStore {
  page = 1;
  inputPage = this.page;
  total = 10;

  constructor() {
    makeAutoObservable(this);
  }

  reactions = () => {
    const disposers = [
      reaction(
        () => this.page,
        (page) => {
          console.log("reaction level_3");
          this.onInputChange(String(page));
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
}

export const usePagination = (store: PaginationStore) => {
  useEffect(() => {
    store.reactions();
  }, [store]);
};

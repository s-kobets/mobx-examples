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

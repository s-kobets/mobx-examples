import { makeAutoObservable, reaction } from "mobx";

export class PaginationStore {
  page = 1;
  inputPage = this.page;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.page,
      (page) => {
        console.log("reaction");
        this.onInputChange(String(page));
      }
    );
  }

  onChange(page: number) {
    this.page = page;
  }

  onInputChange(value: string) {
    const page = Number(value);

    if (page < 1) {
      this.inputPage = 1;
    } else {
      this.inputPage = page;
    }
  }
}

export const usePagination = (store: PaginationStore) => {};

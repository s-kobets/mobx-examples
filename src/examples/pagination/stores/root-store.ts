import { makeAutoObservable } from "mobx";
import { RouterStore } from "./router-store";
import { createContext, useContext } from "react";

function checkContext<T>(name: string, ctx: T) {
  if (!ctx) throw new Error(`Need ${name}Context.Provider`);

  return ctx as NonNullable<T>;
}

export class RootStore {
  constructor(public routerStore: RouterStore) {
    makeAutoObservable(this);
  }
}

export const RootStoreContext = createContext<RootStore | null>(null);

export const useRootStore = () =>
  checkContext("RooStore", useContext(RootStoreContext));

export const useRouterStore = () => useRootStore().routerStore;

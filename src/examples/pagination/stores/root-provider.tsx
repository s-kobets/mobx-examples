import { ReactNode, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { RouterStore } from "./router-store";
import { RootStore, RootStoreContext } from "./root-store";

export const RootProvider = (props: { children: ReactNode }) => {
  const urlSearchParams = useSearchParams();
  const routerStore = useRef(new RouterStore(urlSearchParams)).current;
  const rootStore = useRef(new RootStore(routerStore)).current;
  console.log("render Root");

  return (
    <RootStoreContext.Provider value={rootStore}>
      {props.children}
    </RootStoreContext.Provider>
  );
};

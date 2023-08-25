import { makeAutoObservable } from "mobx";
import { useEffect } from "react";

export class TimerStore {
  secondsPassed = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increaseTimer() {
    this.secondsPassed += 1;
  }
}

export const useTimer = (store: TimerStore) => {
  useEffect(() => {
    const handle = setInterval(() => {
      store.increaseTimer();
    }, 1000);
    return () => {
      clearInterval(handle);
    };
  }, [store]);
};

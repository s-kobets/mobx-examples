import { makeObservable, observable, action, override } from "mobx";

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

class MyBaseClass {
  name = "";

  constructor() {
    makeObservable(this, {
      name: observable,
      changeName: action,
      setName: action,
    });
  }

  setName(name: string) {
    this.name = name;
  }

  changeName() {
    const names = ["Alice", "Bob", "Joe"];
    let newName = names[getRandomInt(3)];

    while (this.name === newName) {
      if (newName === this.name) {
        newName = names[getRandomInt(3)];
      }
    }

    // console.log(this.name, newName);
    this.name = newName;
  }

  sayHello() {
    console.log(`Hello, my name is ${this.name}`);
  }
}

class MyStore extends MyBaseClass {
  count = 0;

  constructor() {
    super();
    makeObservable(this, {
      // name: override,
      count: observable,
      increment: action,
      decrement: action,
    });
  }

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }
}

export default MyStore;

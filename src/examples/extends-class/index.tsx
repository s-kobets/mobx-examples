import { Observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import MyStore from './MyStore';


const MyComponent = () => {
  const store = useRef(new MyStore()).current;
  useEffect(() => {
    store.setName('Alice')
  }, [store])

  return <Observer>{() => (
    <div>
      <div>Name: {store.name}</div>
      <div>Count: {store.count}</div>
      <button onClick={() => store.changeName()}>Change Name</button>
      <button onClick={() => store.increment()}>Increment</button>
      <button onClick={() => store.decrement()}>Decrement</button>
      <button onClick={() => store.sayHello()}>Say Hello</button>
    </div>
  )}</Observer>;
};

export default MyComponent;
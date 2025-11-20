import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  fetchUser,
  increaseByValue,
  increment,
} from "./redux/reducers/counterSlice";

const App = () => {
  let count = useSelector((state) => state.counter);
  count = count.count;
  const users = useSelector((state) => state.counter.users);
  console.log("count", count);
  console.log("users", users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  return (
    <div>
      <div>Count: {count}</div>
      <button onClick={() => dispatch(increment())}>increment</button>
      <button onClick={() => dispatch(decrement())}>decrement</button>
      <button onClick={() => dispatch(increaseByValue(2))}>inc by 2</button>
      <div>Users</div>
      <div>Loading: {users.loading}</div>
      <div>Error: {users.error}</div>
      <div>Users: {JSON.stringify(users.data)}</div>
    </div>
  );
};

export default App;

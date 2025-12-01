import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, setSearchData } from "./redux/userSlice";
// import "./style.css";

export default function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const dispatch = useDispatch();
  const storeData = useSelector((state) => state.user);
  // const {data, lo} = storeData;
  console.log("storeData", storeData);
  useEffect(() => {
    console.log("effect");
    // const fetchUsers = async () => {
    //   try {
    //     setIsLoading(true);
    //     let result = await fetch("https://jsonplaceholder.typicode.com/users");
    //     result = await result.json();
    //     console.log(result);
    //     result = result.map((user) => user.name);
    //     setIsLoading(false);
    //     setData(result);
    //     setSearchResult(result);
    //   } catch (err) {
    //     setIsLoading(false);
    //     setError(err);
    //   }
    // };
    // fetchUsers();
    dispatch(fetchUsers());
  }, []);
  const changeHandler = (e) => {
    const searchString = e.target.value;
    setSearchValue(searchString);
    console.log("sear", searchString);
    if (searchString) {
      let resultUpdated = [...storeData.data];
      resultUpdated = resultUpdated.filter((user) =>
        user?.includes(searchString)
      );
      // setSearchResult(resultUpdated);
      dispatch(setSearchData(resultUpdated));
    } else {
      // setSearchResult(data);
      dispatch(setSearchData(storeData.data));
    }
  };
  const sortUserHandler = () => {
    let resultWithSort = [...storeData.searchResult];
    console.log("resultWithSort", resultWithSort);
    resultWithSort = resultWithSort.sort();
    console.log("resultWithSort", resultWithSort);
    // setSearchResult([...resultWithSort]);
    dispatch(setSearchData(resultWithSort));
  };
  console.log("searchResult", searchResult);
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <input name="searchUser" onChange={changeHandler} value={searchValue} />
      <button onClick={sortUserHandler}>Sort by username</button>
      <div key={searchResult}>
        {!storeData.loading ? (
          <>
            {storeData.searchResult.map((user) => {
              return <div key={user}>Username: {user}</div>;
            })}
          </>
        ) : (
          <div>Loading</div>
        )}
      </div>
      {storeData.error?.message && <div>Error: {storeData.error?.message}</div>}
    </div>
  );
}

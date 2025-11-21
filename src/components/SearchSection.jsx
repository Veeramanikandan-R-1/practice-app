import React, { useEffect, useState } from "react";
import Modal from "./Modal";

const SearchSection = ({ tasks }) => {
  const [taskData, setTaskData] = useState(tasks);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  useEffect(() => {
    setTaskData(tasks);
    setSearch("");
  }, [tasks]);
  const searchHandler = () => {
    const filteredData = [...tasks].filter((task) =>
      task.task.includes(search)
    );
    setTaskData(filteredData);
  };

  return (
    <div className="search-sec">
      <div className="search-input">
        <input
          name="search"
          value={search}
          placeholder="search by task name"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={searchHandler}>Search</button>
      </div>
      <table>
        <thead>
          <td>Sl.no</td>
          <td>Task name</td>
          <td>Status</td>
        </thead>
        <tbody>
          {taskData.map((task, index) => (
            <tr
              onClick={() => {
                setIsOpen(true);
                setModalData(task);
              }}
            >
              <td>{index + 1}</td>
              <td>{task.task}</td>
              <td>{task.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div>id: {modalData.id}</div>
        <div>task name: {modalData.task}</div>
        <div>status: {modalData.status}</div>
      </Modal>
    </div>
  );
};

export default SearchSection;

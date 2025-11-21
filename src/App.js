import { useEffect, useState } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { addTask, updateTasks } from "./redux/reducers/taskSlice";
import TaskSection from "./components/TaskSection";
import SearchSection from "./components/SearchSection";

const App = () => {
  const tasks = useSelector((state) => state.tasks);
  const [dragItem, setDragItem] = useState(null);
  const [isDark, setIsDark] = useState(() => {});
  const dispatch = useDispatch();
  const [task, setTask] = useState("");
  const handleAdd = () => {
    console.log("tasks", tasks);
    console.log("task", task);
    const taskObj = {
      id: Date.now(),
      task: task,
      status: "pending",
    };
    dispatch(addTask(taskObj));
  };
  const handleDrop = (type) => {
    console.log("handleDrop", type);
    console.log("dragItem", dragItem);
    if (!dragItem) return;

    const { source, taskItem } = dragItem || {};
    if (type === taskItem.status) {
      return;
    } else {
      const tasksUpdated = [...tasks].map((task) => {
        if (task.id === dragItem.taskItem.id) {
          console.log("match");
          return { ...task, status: type };
        } else {
          return task;
        }
      });
      console.log("tasksUpdated", tasksUpdated);
      dispatch(updateTasks(tasksUpdated));
    }
  };

  const handleDragStart = (source, taskItem) => {
    console.log("start");
    setDragItem({ source, taskItem });
  };

  const toggleTheme = () => setIsDark((prev) => !prev);

  useEffect(() => {
    document.body.className = isDark ? "dark" : "light";
  }, [isDark]);

  return (
    <div>
      <label className="switch">
        <input type="checkbox" checked={isDark} onChange={toggleTheme} />
        <span className="slider round"></span>
      </label>
      <h2 className="app-title">Task Manager</h2>
      <div className="input-sec">
        <input
          name="tasks"
          onChange={(e) => setTask(e.target.value)}
          value={task}
        />
        <button onClick={handleAdd}>Add Task</button>
      </div>

      {/* search section  */}
      <SearchSection tasks={tasks} />
      <div className="task-section">
        <TaskSection
          tasks={tasks.filter((task) => task.status === "pending")}
          label="Pending"
          handleDrop={() => {
            handleDrop("pending");
          }}
          handleDrag={(taskItem) => {
            handleDragStart("pending", taskItem);
          }}
        />
        <TaskSection
          tasks={tasks.filter((task) => task.status === "in-progress")}
          label="In-Progress"
          handleDrop={() => {
            handleDrop("in-progress");
          }}
          handleDrag={(taskItem) => {
            handleDragStart("in-progress", taskItem);
          }}
        />
        <TaskSection
          tasks={tasks.filter((task) => task.status === "completed")}
          label="Completed"
          handleDrop={() => {
            handleDrop("completed");
          }}
          handleDrag={(taskItem) => {
            handleDragStart("completed", taskItem);
          }}
        />
      </div>
    </div>
  );
};

export default App;

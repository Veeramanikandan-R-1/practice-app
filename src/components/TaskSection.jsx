import React from "react";

const TaskSection = ({ tasks, label, handleDrop, handleDrag }) => {
  console.log("tasks child", tasks);
  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="task-section-container"
    >
      <h3>{label}</h3>

      {tasks.map((task) => (
        <div
          key={task.id}
          draggable
          onDragStart={() => {
            handleDrag(task);
          }}
          className="task-item"
        >
          {task.task}
        </div>
      ))}
    </div>
  );
};

export default TaskSection;

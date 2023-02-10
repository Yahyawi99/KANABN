import React from "react";
import { useGlobal } from "../context";
// components
import Checkbox from "./Checkbox";

const TaskModel = () => {
  const { clickedTask, currentData, setModalNameToActivate } = useGlobal();
  const { title, description, subtasks } = clickedTask;

  const completedTasks = subtasks.filter((subtask) => subtask.isCompleted);

  return (
    <section className="sharedModal taskModal">
      <div>
        <h1>{title}</h1>

        <button type="button">
          <p></p>
          <p></p>
          <p></p>
        </button>
      </div>

      <p className="taskDescription">
        {description.length > 0 ? description : "No description"}
      </p>

      <div className="dropDownContainer">
        <p>Current Status</p>
        <div>
          <input type="text" readOnly value={"Todo"} />
          <i>
            <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
              <path
                stroke="#635FC7"
                strokeWidth="2"
                fill="none"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </i>

          {/* <div className="dropDown">
            {currentData.columns.map((column) => {
              const { name } = column;
              return <p>{name}</p>;
            })}
          </div> */}
        </div>
      </div>

      <div>
        <p>
          Subtasks ({completedTasks.length} of {subtasks.length})
        </p>
        <div className="subtaskContainer">
          {subtasks.map((subtask) => {
            const { isCompleted, title } = subtask;

            return (
              <div className={`${isCompleted && "completedTask"}`}>
                <Checkbox completed={isCompleted} />
                <p>{title}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="modal"
        onClick={() => setModalNameToActivate("Edit Task")}
      >
        <p>Edit Task</p>
        <p>Delete Task</p>
      </div>
    </section>
  );
};

export default TaskModel;

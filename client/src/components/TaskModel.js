import React, { useState } from "react";
import { useGlobal } from "../context";
// components
import Checkbox from "./Checkbox";

const TaskModel = () => {
  const {
    clickedTask,
    currentData,
    setModalNameToActivate,
    setTaskToEditOrCreate,
    updateTaskStatus,
    setClickedTask,
    updateTaskState,
  } = useGlobal();

  const { _id: taskID, title, description, subtasks, status } = clickedTask;
  const completedTasks = subtasks.filter((subtask) => subtask.isCompleted);

  const [showEditDelete, setShowEditDelete] = useState(false);
  const [isDropDownOn, setIsDropDownOn] = useState(false);
  const [dropDownTxt, setDropDownTxt] = useState(status);

  return (
    <section className="sharedModal taskModal">
      <div>
        <h1>{title}</h1>

        <button
          type="button"
          onClick={() => setShowEditDelete(!showEditDelete)}
        >
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

        <div onClick={() => setIsDropDownOn(!isDropDownOn)}>
          <input type="text" value={dropDownTxt} readOnly />
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

          <div className={`dropDown ${isDropDownOn && "showDropDown"}`}>
            {currentData.columns.map((column) => {
              const { _id: columnID, name } = column;
              return (
                <p
                  key={columnID}
                  onClick={async () => {
                    await updateTaskStatus(taskID, columnID, clickedTask);
                    setDropDownTxt(name);
                  }}
                >
                  {name}
                </p>
              );
            })}
          </div>
        </div>
      </div>

      <div>
        <p>
          Subtasks ({completedTasks.length} of {subtasks.length})
        </p>

        <div className="subtaskContainer">
          {subtasks.map((subtask, i) => {
            const { isCompleted, title } = subtask;

            return (
              <div
                key={i}
                className={`${isCompleted && "completedTask"}`}
                onClick={async () => {
                  await updateTaskState(taskID, status, title);
                  subtask.isCompleted = !isCompleted;
                  setClickedTask({ ...clickedTask });
                }}
              >
                <Checkbox completed={isCompleted} />
                <p>{title}</p>
              </div>
            );
          })}
        </div>
      </div>

      {showEditDelete && (
        <div className="modal">
          <p
            onClick={() => {
              setModalNameToActivate("Edit Task");
              setTaskToEditOrCreate(clickedTask);
            }}
          >
            Edit Task
          </p>
          <p onClick={() => setModalNameToActivate("Delete Task")}>
            Delete Task
          </p>
        </div>
      )}
    </section>
  );
};

export default TaskModel;

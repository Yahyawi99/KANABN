import React, { useState } from "react";
import { useGlobal } from "../context";

const AddEditTaskModel = () => {
  const {
    modalNameToActivate,
    currentData,
    addNewTask,
    taskToEditOrCreate,
    editTask,
  } = useGlobal();
  const [isDropDownOn, setIsDropDownOn] = useState(false);

  const [newTask, setNewTask] = useState(taskToEditOrCreate);

  return (
    <section className="sharedModal editAddTask">
      <h1>{modalNameToActivate}</h1>

      <form noValidate>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={newTask.title}
            onChange={(e) =>
              setNewTask({ ...newTask, title: e.currentTarget.value })
            }
          />
          <p className="errorMsg">Required!</p>
        </div>

        <div>
          <label htmlFor="decsription">Description</label>
          <textarea
            id="description"
            rows="5"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.currentTarget.value })
            }
          ></textarea>
        </div>

        <div className="dropDownContainer">
          <p>Current Status</p>

          <div onClick={() => setIsDropDownOn(!isDropDownOn)}>
            <input type="text" readOnly value={newTask.status} />
            <i>
              <svg
                className={`${isDropDownOn && "rotate"}`}
                width="10"
                height="7"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke="#635FC7"
                  strokeWidth="2"
                  fill="none"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </i>

            <div className={`dropDown ${isDropDownOn && "showDropDown"}`}>
              {currentData.columns.map((column, i) => {
                const { name } = column;
                return (
                  <p
                    key={i}
                    onClick={() => setNewTask({ ...newTask, status: name })}
                  >
                    {name}
                  </p>
                );
              })}
            </div>
          </div>
        </div>

        <div>
          <label>Subtasks</label>

          <div>
            {newTask.subtasks.map((subtask, i) => {
              const { title } = subtask;
              return (
                <span key={i}>
                  <input
                    type="text"
                    id="subtask"
                    value={title}
                    onChange={(e) => {
                      newTask.subtasks[i].title = e.currentTarget.value;

                      setNewTask({
                        ...newTask,
                      });
                    }}
                  />

                  <i
                    onClick={() => {
                      const newSubTaskArr = newTask.subtasks.filter(
                        (e) => e !== subtask
                      );

                      setNewTask({ ...newTask, subtasks: newSubTaskArr });
                    }}
                  >
                    <svg
                      width="15"
                      height="15"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g fill="#828FA3" fillRule="evenodd">
                        <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                        <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
                      </g>
                    </svg>
                  </i>

                  <p className="errorMsg">Required!</p>
                </span>
              );
            })}
          </div>

          {newTask.subtasks.length < 6 && (
            <button
              type="button"
              onClick={() => {
                const newSubTask = { title: "", isCompleted: false };
                setNewTask({
                  ...newTask,
                  subtasks: newTask.subtasks.concat(newSubTask),
                });
              }}
            >
              + Add New Subtask
            </button>
          )}
        </div>

        {modalNameToActivate === "Add New Task" ? (
          <button type="submit" onClick={(e) => addNewTask(e, newTask)}>
            Create Task
          </button>
        ) : (
          <button type="submit" onClick={(e) => editTask(e, newTask)}>
            Save Changes
          </button>
        )}
      </form>
    </section>
  );
};

export default AddEditTaskModel;

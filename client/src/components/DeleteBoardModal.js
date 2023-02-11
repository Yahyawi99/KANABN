import React from "react";
import { useGlobal } from "../context";

const DeleteModal = () => {
  const {
    setIsModalOn,
    deleteBoard,
    currentData,
    modalNameToActivate,
    clickedTask,
    deleteTask,
  } = useGlobal();

  if (modalNameToActivate === "Delete Task") {
    return (
      <section className="deleteBoradContainer">
        <h1>Delete this task?</h1>
        <p>
          Are you sure you want to delete the '{clickedTask.title}' task? This
          action will remove all this tasks's subtasks and cannot be reversed.
        </p>

        <div className="btns">
          <button
            onClick={() => deleteTask(clickedTask._id, clickedTask.status)}
          >
            Delete
          </button>
          <button onClick={() => setIsModalOn(false)}>Cancel</button>
        </div>
      </section>
    );
  } else {
    return (
      <section className="deleteBoradContainer">
        <h1>Delete this board?</h1>
        <p>
          Are you sure you want to delete the '{currentData.name}' board? This
          action will remove all columns and tasks and cannot be reversed.
        </p>

        <div className="btns">
          <button onClick={deleteBoard}>Delete</button>
          <button onClick={() => setIsModalOn(false)}>Cancel</button>
        </div>
      </section>
    );
  }
};

export default DeleteModal;

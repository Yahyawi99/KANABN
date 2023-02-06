import React from "react";
import { useGlobal } from "../context";

const DeleteModal = () => {
  const { setIsModalOn, deleteBoard } = useGlobal();

  return (
    <section className="deleteBoradContainer">
      <h1>Delete this board?</h1>
      <p>
        Are you sure you want to delete the 'RoadMap' board? This action will
        remove all columns and tasks and cannot be reversed.
      </p>

      <div className="btns">
        <button onClick={deleteBoard}>Delete</button>
        <button onClick={() => setIsModalOn(false)}>Cancel</button>
      </div>
    </section>
  );
};

export default DeleteModal;

import React from "react";
import { useGlobal } from "../context";
// components
import DeleteBoardModal from "./DeleteBoardModal";
import EditBoardModal from "./EditBoardModal";
import NewColumnModal from "./NewColumnModal";
import CreateBoardModal from "./CreateBoardModal";
import TaskModel from "./TaskModel";
import AddTaskModel from "./AddTaskModel";
// css
import "../styles/Modals.css";

const Modals = () => {
  const { modalNameToActivate, setIsModalOn } = useGlobal();

  return (
    <section
      className="modalsContainer"
      onClick={(e) => {
        if (e.currentTarget === e.target) {
          setIsModalOn(false);
        }
      }}
    >
      {modalNameToActivate === "Delete board" && <DeleteBoardModal />}

      {modalNameToActivate === "Edit Board" && <EditBoardModal />}

      {modalNameToActivate === "Add New Column" && <NewColumnModal />}

      {modalNameToActivate === "Add New Board" && <CreateBoardModal />}

      {modalNameToActivate === "Task" && <TaskModel />}

      {modalNameToActivate === "Add New Task" && <AddTaskModel />}
    </section>
  );
};

export default Modals;

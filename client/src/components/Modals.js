import React from "react";
import { useGlobal } from "../context";
// components
import DeleteBoardModal from "./DeleteBoardModal";
import EditBoardModal from "./EditBoardModal";
import NewColumnModal from "./NewColumnModal";
import CreateBoardModal from "./CreateBoardModal";
import TaskModel from "./TaskModel";
import AddEditTaskModel from "./AddEditTaskModel";
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
      {(modalNameToActivate === "Delete board" ||
        modalNameToActivate === "Delete Task") && <DeleteBoardModal />}

      {modalNameToActivate === "Edit Board" && <EditBoardModal />}

      {modalNameToActivate === "Add New Column" && <NewColumnModal />}

      {modalNameToActivate === "Add New Board" && <CreateBoardModal />}

      {modalNameToActivate === "Task" && <TaskModel />}

      {(modalNameToActivate === "Add New Task" ||
        modalNameToActivate === "Edit Task") && <AddEditTaskModel />}
    </section>
  );
};

export default Modals;

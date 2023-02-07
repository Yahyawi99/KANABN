import React from "react";
import { useGlobal } from "../context";
// components
import DeleteBoardModal from "./DeleteBoardModal";
import EditBoardModal from "./EditBoardModal";
import NewColumnModal from "./NewColumnModal";
import CreateBoardModal from "./CreateBoardModal";
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
    </section>
  );
};

export default Modals;

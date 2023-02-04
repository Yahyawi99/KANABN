import React from "react";
import { useGlobal } from "../context";
// components
import DeleteBoardModal from "./DeleteBoardModal";
import EditBoardModal from "./EditBoardModal";
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

      {(modalNameToActivate === "Edit Board" ||
        modalNameToActivate === "Add New Column" ||
        modalNameToActivate === "Add New Board") && <EditBoardModal />}
    </section>
  );
};

export default Modals;

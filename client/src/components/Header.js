import React from "react";
import { useGlobal } from "../context";
// css
import "../styles/header.css";

const Header = () => {
  const {
    currentData,
    isDarkMode,
    editDelete,
    setEditDelete,
    setIsModalOn,
    setModalNameToActivate,
  } = useGlobal();

  return (
    <header className="header">
      <div className="logo-container">
        {isDarkMode ? (
          <img src="/assets/logo-light.svg" alt="logo" />
        ) : (
          <img src="/assets/logo-dark.svg" alt="logo" />
        )}
      </div>

      <div>
        <h1 className="title">{currentData && currentData.name}</h1>

        <div className="btns">
          <button className="addBtn">
            <img src="/assets/icon-add-task-mobile.svg" alt="plus" />
            <p>Add New Task</p>
          </button>

          <button onClick={() => setEditDelete(!editDelete)}>
            <p></p>
            <p></p>
            <p></p>
          </button>

          {editDelete && (
            <div className="modal">
              <p
                onClick={() => {
                  setEditDelete(false);
                  setIsModalOn(true);
                  setModalNameToActivate("Edit Board");
                }}
              >
                Edit Board
              </p>
              <p
                onClick={() => {
                  setIsModalOn(true);
                  setEditDelete(false);
                  setModalNameToActivate("Delete board");
                }}
              >
                Delete Board
              </p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

import React from "react";
import { useGlobal } from "../context";
import { v4 as uuidv4 } from "uuid";
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
    setTaskToEditOrCreate,
    setMobileNavBar,
    mobileNavBar,
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
        <h1 className="title">
          <img src="/assets/logo-mobile.svg" alt="logo" />

          {currentData && (
            <>
              {currentData.name}
              <img
                onClick={() => setMobileNavBar(true)}
                src="/assets/icon-chevron-down.svg"
                alt="arrow-down"
                className={`arrow-down ${mobileNavBar && "rotateArrow"}`}
              />
            </>
          )}
        </h1>

        {currentData && (
          <div className="btns">
            <button
              className="addBtn"
              onClick={() => {
                setModalNameToActivate("Add New Task");
                setEditDelete(false);
                setIsModalOn(true);
                setTaskToEditOrCreate({
                  _id: uuidv4(),
                  title: "",
                  description: "",
                  status: currentData.columns[0].name,
                  subtasks: [{ title: "", isCompleted: false }],
                });
              }}
            >
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
        )}
      </div>
    </header>
  );
};

export default Header;

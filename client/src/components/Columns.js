import React from "react";
import { useGlobal } from "../context";
import { DragDropContext } from "react-beautiful-dnd";
// Components
import SingleColumns from "./SingleColumns";
// css
import "../styles/columns.css";

const Columns = () => {
  const {
    isSideBarOpen,
    currentData,
    setIsModalOn,
    setModalNameToActivate,
    handleOndragEnd,
    data,
  } = useGlobal();

  if (data && data.length) {
    return (
      <section
        className={`columnsContainer ${isSideBarOpen || "stretchColumns"}`}
      >
        <DragDropContext onDragEnd={(result) => handleOndragEnd(result)}>
          {currentData &&
            currentData.columns.map((column) => {
              const { _id } = column;
              return <SingleColumns key={_id} columnData={column} />;
            })}

          {currentData && currentData.columns.length < 6 && (
            <button
              className="newColumnBtn"
              onClick={() => {
                setIsModalOn(true);
                setModalNameToActivate("Add New Column");
              }}
            >
              <i>
                <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z" />
                </svg>
              </i>
              <p>New Column</p>
            </button>
          )}
        </DragDropContext>
      </section>
    );
  } else {
    return (
      <section
        className={`columnsContainer ${isSideBarOpen || "stretchColumns"}`}
        style={{
          cursor: "initial",
        }}
      >
        <div className="createBoardBtn">
          <p>This board is empty. Create a new column to get started.</p>
          <button
            onClick={() => {
              setIsModalOn(true);
              setModalNameToActivate("Add New Board");
            }}
          >
            <span>+</span> Create New Board
          </button>
        </div>
      </section>
    );
  }
};

export default Columns;

/*

 

    */

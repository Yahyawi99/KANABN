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
    setCurrentData,
    setIsModalOn,
    setModalNameToActivate,
  } = useGlobal();

  const handleOndragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (destination.droppableId !== source.droppableId) {
      // remove the draggable task
      const oldColumn = currentData.columns.find(
        (e) => e.id === source.droppableId
      );

      const oldColumn_copy = JSON.parse(JSON.stringify(oldColumn));
      const [removed] = oldColumn_copy.tasks.splice(source.index, 1);

      // change the draggabale item's column
      const newColumn = currentData.columns.find(
        (e) => e.id === destination.droppableId
      );
      const newColumn_copy = JSON.parse(JSON.stringify(newColumn));
      removed.status = newColumn_copy.name;
      newColumn_copy.tasks.splice(destination.index, 0, removed);

      // replace current data
      const udpateCurrentDataColumns = currentData.columns.map((e) => {
        if (e.id === oldColumn_copy.id) {
          return (e = oldColumn_copy);
        }

        if (e.id === newColumn_copy.id) {
          return (e = newColumn_copy);
        }

        return e;
      });

      setCurrentData({ ...currentData, columns: udpateCurrentDataColumns });
    } else {
      const column = currentData.columns.find(
        (e) => e.id === source.droppableId
      );

      const newColumn = JSON.parse(JSON.stringify(column));

      // remove the draggable task
      const [removed] = newColumn.tasks.splice(source.index, 1);

      // change the draggabale item's index
      newColumn.tasks.splice(destination.index, 0, removed);

      // replace current data
      const udpateCurrentDataColumns = currentData.columns.map((e) => {
        if (e.id === newColumn.id) {
          return newColumn;
        }
        return e;
      });

      setCurrentData({ ...currentData, columns: udpateCurrentDataColumns });
    }
  };

  // ********************************

  return (
    <section
      className={`columnsContainer ${isSideBarOpen || "stretchColumns"}`}
    >
      <DragDropContext
        onDragEnd={(result) => handleOndragEnd(result)}
        placeholder={{}}
      >
        {currentData &&
          currentData.columns.map((column) => {
            const { id } = column;
            return <SingleColumns key={id} columnData={column} />;
          })}
        {currentData && currentData.columns.length <= 6 && (
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
};

export default Columns;

/*

 

    */

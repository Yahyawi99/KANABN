import React, { useState } from "react";
import { useGlobal } from "../context";
import { v4 as uuidv4 } from "uuid";

const NewColumnModal = () => {
  const { currentData, createColumn } = useGlobal();
  const [editedBoard, setEditedBoard] = useState(currentData);

  return (
    <section className="sharedModal addNewColumnModal">
      <h1>Add New Column</h1>

      <form noValidate>
        <div>
          <label htmlFor="boardName">Name</label>
          <input type="text" id="boardName" value={currentData.name} />
        </div>

        <div>
          <label htmlFor="columns">Columns</label>

          <div id="columns">
            {editedBoard.columns.map((column, i) => {
              const { _id, name } = column;

              return (
                <div key={_id}>
                  <input
                    type="text"
                    className="newColumnInput"
                    value={name}
                    onChange={(e) => {
                      editedBoard.columns[i].name = e.currentTarget.value;
                      setEditedBoard({
                        ...editedBoard,
                      });
                    }}
                  />
                  {[...editedBoard.columns].length > 1 && (
                    <i
                      onClick={() => {
                        setEditedBoard({
                          ...editedBoard,
                          columns: editedBoard.columns.filter(
                            (e) => e._id !== column._id
                          ),
                        });
                      }}
                    >
                      <svg
                        width="15"
                        height="15"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g fill="#828FA3" fillRule="evenodd">
                          <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                          <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
                        </g>
                      </svg>
                    </i>
                  )}
                  <p className="errorMsg">Required!</p>
                </div>
              );
            })}
          </div>

          {[...editedBoard.columns].length < 6 && (
            <button
              onClick={() => {
                const newColumn = { _id: uuidv4(), name: "", tasks: [] };

                setEditedBoard({
                  ...editedBoard,
                  columns: editedBoard.columns.concat([newColumn]),
                });
              }}
              type="button"
            >
              + New Column
            </button>
          )}
        </div>

        <button type="submit" onClick={(e) => createColumn(e, editedBoard)}>
          Save Changes
        </button>
      </form>
    </section>
  );
};

export default NewColumnModal;

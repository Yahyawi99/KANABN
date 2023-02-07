import React from "react";
import { useGlobal } from "../context";

const CreateBoardModal = () => {
  const { createBoard, newBoard, addColumn, deleteColumnInput, setNewBoard } =
    useGlobal();

  return (
    <section className="sharedModal">
      <h1>Add New Board</h1>

      <form noValidate onSubmit={(e) => createBoard(e)}>
        <div>
          <label htmlFor="boardName">Name</label>
          <input
            type="text"
            id="boardName"
            value={newBoard.name}
            onChange={(e) =>
              setNewBoard({ ...newBoard, name: e.currentTarget.value })
            }
          />
          <p className="errorMsg">Required!</p>
        </div>

        <div>
          <label htmlFor="columns">Columns</label>

          <div id="columns">
            {newBoard.columns.map((column, i) => {
              const { name, _id } = column;
              return (
                <div key={_id}>
                  <input
                    id="columnName"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      newBoard.columns[i].name = e.currentTarget.value;
                      setNewBoard({
                        ...newBoard,
                      });
                    }}
                  />
                  {newBoard.columns.length > 1 && (
                    <i onClick={() => deleteColumnInput(column)}>
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

          <button type="button" onClick={addColumn}>
            + New Column
          </button>
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </section>
  );
};

export default CreateBoardModal;

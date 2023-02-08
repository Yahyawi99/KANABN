import React from "react";
import { useGlobal } from "../context";

const NewColumnModal = () => {
  const { currentData, createNewColumn, createColumn, setCurrentData } =
    useGlobal();

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
            {currentData.columns.map((column, i) => {
              const { _id, name } = column;

              return (
                <div key={_id}>
                  <input
                    type="text"
                    className="newColumnInput"
                    value={name}
                    onChange={(e) => {
                      currentData.columns[i].name = e.currentTarget.value;
                      setCurrentData({
                        ...currentData,
                      });
                    }}
                  />
                  {[...currentData.columns].length > 1 && (
                    <i
                      onClick={() => {
                        setCurrentData({
                          ...currentData,
                          columns: currentData.columns.filter(
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

          {[...currentData.columns].length < 6 && (
            <button onClick={createNewColumn} type="button">
              + New Column
            </button>
          )}
        </div>

        <button type="submit" onClick={(e) => createColumn(e)}>
          Save Changes
        </button>
      </form>
    </section>
  );
};

export default NewColumnModal;

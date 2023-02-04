import React from "react";
import { useGlobal } from "../context";

const EditBoardModal = () => {
  const { modalNameToActivate } = useGlobal();

  return (
    <section className="editBoardContainer">
      <h1>{modalNameToActivate}</h1>

      <form noValidate>
        <div>
          <label htmlFor="boardName">Name</label>
          <input type="text" id="boardName" />
        </div>

        <div>
          <label htmlFor="columns">Columns</label>

          <div id="columns">
            <div>
              <input type="text" />
              <i>
                <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
                  <g fill="#828FA3" fillRule="evenodd">
                    <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                    <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
                  </g>
                </svg>
              </i>
            </div>

            <div>
              <input type="text" />
              <i>
                <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
                  <g fill="#828FA3" fillRule="evenodd">
                    <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                    <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
                  </g>
                </svg>
              </i>
            </div>

            <div>
              <input type="text" />
              <i>
                <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
                  <g fill="#828FA3" fillRule="evenodd">
                    <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                    <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
                  </g>
                </svg>
              </i>
            </div>
          </div>

          <button>+ New Column</button>
        </div>

        <button>Save Changes</button>
      </form>
    </section>
  );
};

export default EditBoardModal;

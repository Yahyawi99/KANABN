import React, { useRef, useEffect } from "react";

const CreateBoardModal = () => {
  const columnInputContainerRef = useRef(null);

  useEffect(() => {
    const constainerLength = columnInputContainerRef.current.children.length;
    const firstColumnIcon =
      columnInputContainerRef.current.children[0].children[1];

    if (constainerLength === 1) {
      firstColumnIcon.style.display = "none";
    } else {
      firstColumnIcon.style.display = "flex";
    }
  }, [columnInputContainerRef.current.children]);

  return (
    <section className="sharedModal">
      <h1>Add New Board</h1>

      <form noValidate>
        <div>
          <label htmlFor="boardName">Name</label>
          <input type="text" id="boardName" />
        </div>

        <div>
          <label htmlFor="columns">Columns</label>

          <div id="columns" ref={columnInputContainerRef}>
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

export default CreateBoardModal;

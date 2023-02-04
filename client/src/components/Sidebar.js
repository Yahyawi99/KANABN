import React from "react";
import { useGlobal } from "../context";
// components
import Toggle from "./Toggle";
// css
import "../styles/sidebar.css";

const Sidebar = () => {
  const {
    isSideBarOpen,
    setIsSideBarOpen,
    data,
    currentData,
    setCurrentData,
    setIsModalOn,
    setModalNameToActivate,
  } = useGlobal();

  return (
    <section className={`sidebarContainer ${isSideBarOpen || "hideSidebar"}`}>
      <div>
        <div className="boards">
          <p>ALL BOARDS ({data && data.length})</p>

          <div className="boardsContainer">
            {data &&
              data.map((board) => {
                const { id, name } = board;
                return (
                  <div
                    key={id}
                    className={`${name === currentData.name && "clickedBoard"}`}
                    onClick={() => setCurrentData(board)}
                  >
                    <i>
                      <svg
                        width="16"
                        height="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
                          fill="#828FA3"
                        />
                      </svg>
                    </i>
                    <h3>{name}</h3>
                  </div>
                );
              })}
          </div>

          <button
            className="createBtn"
            onClick={() => {
              setIsModalOn(true);
              setModalNameToActivate("Add New Board");
            }}
          >
            <i>
              <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
                  fill="var(--darkBlue)"
                />
              </svg>
            </i>

            <i>
              <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
                  fill="var(--darkBlue)"
                />
              </svg>
            </i>

            <p>Create New Board</p>
          </button>
        </div>
      </div>

      <div>
        <div>
          <div className="toggleContainer">
            <img src="/assets/icon-dark-theme.svg" alt="moon" />

            <Toggle />

            <img src="/assets/icon-light-theme.svg" alt="sun" />
          </div>

          <button className="hideBtn" onClick={() => setIsSideBarOpen(false)}>
            <img src="/assets/icon-hide-sidebar.svg" alt="crossed-eye" />
            <p>Hide Sidebar</p>
          </button>
        </div>
      </div>

      <button
        className={`openbtn ${isSideBarOpen && "hideOpenBtn"}`}
        onClick={() => setIsSideBarOpen(true)}
      >
        <img src="/assets/icon-show-sidebar.svg" alt="eye" />
      </button>
    </section>
  );
};

export default Sidebar;

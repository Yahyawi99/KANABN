import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const AppContext = React.createContext();
const Provider = ({ children }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [data, setData] = useState(null);
  const [currentData, setCurrentData] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [editDelete, setEditDelete] = useState(false);
  const [isModalOn, setIsModalOn] = useState(false);
  const [modalNameToActivate, setModalNameToActivate] = useState("");
  const [newBoard, setNewBoard] = useState({
    name: "",
    columns: [{ _id: uuidv4(), name: "", tasks: [] }],
  });

  // ******************************************
  // API CALLS
  // ******************************************
  // get all boards
  useEffect(() => {
    getAllBoards();
  }, []);

  const getAllBoards = async () => {
    try {
      const res = await axios(`${process.env.REACT_APP_BASE_URL}api/v1/boards`);

      const myData = res.data.data.sort((a, b) => {
        if (a.columns.length > b.columns.length) {
          return -1;
        }
        if (a.columns.length < b.columns.length) {
          return 1;
        }

        return 0;
      });

      setData(myData);
      setCurrentData(myData[0]);
    } catch (error) {
      console.log(error);
    }
  };

  // update all data
  const updateAllData = async (newData) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/v1/boards`,
        newData
      );
    } catch (error) {
      console.log(error);
    }
  };

  // delete board
  const deleteBoard = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}api/v1/board/delete/${currentData._id}`
      );

      getAllBoards();
      setIsModalOn(false);
    } catch (error) {
      console.log(error);
    }
  };

  // create board
  const createBoard = async (e) => {
    e.preventDefault();

    try {
      errorStyles();

      await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/v1/board/create`,
        newBoard
      );

      setIsModalOn(false);
      setNewBoard({
        name: "",
        columns: [{ _id: uuidv4(), name: "", tasks: [] }],
      });

      getAllBoards();
    } catch (error) {
      console.log(error);
    }
  };

  // ******************************************
  // Update my data array
  const updateData = (myUdpateCurrentDataColumns) => {
    const newData = data.map((e) => {
      if (e._id === currentData._id) {
        return { ...e, columns: myUdpateCurrentDataColumns };
      }
      return e;
    });

    setData(newData);

    updateAllData(newData);
  };

  // ******************************************
  // Drag and Drop functionality
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

      // update my data array
      updateData(udpateCurrentDataColumns);
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

      // update my data
      updateData(currentData, udpateCurrentDataColumns);
    }
  };

  // ******************************************
  // create new board modal
  const addColumn = () => {
    const newColumn = { _id: uuidv4(), name: "", tasks: [] };
    const newColumns = newBoard.columns.concat([newColumn]);

    setNewBoard({ ...newBoard, columns: newColumns });
  };

  const deleteColumnInput = (oldColumn) => {
    setNewBoard({
      ...newBoard,
      columns: newBoard.columns.filter((e) => e._id !== oldColumn._id),
    });
  };

  const errorStyles = () => {
    const columns = [...document.querySelectorAll("#columnName")];
    const boardName = document.querySelector("#boardName");
    let isError = false;

    if (!newBoard.name) {
      boardName.classList.add("emptyInputError");
      setTimeout(() => {
        boardName.classList.remove("emptyInputError");
      }, 2500);

      const errorMsg = boardName.nextElementSibling;
      errorMsg.style.display = "initial";
      setTimeout(() => {
        errorMsg.style.display = "none";
      }, 2500);

      isError = true;
    }

    columns.forEach((column, i) => {
      if (!newBoard.columns[i].name) {
        column.classList.add("emptyInputError");
        setTimeout(() => {
          column.classList.remove("emptyInputError");
        }, 2500);

        const columnContainer = column.parentElement;
        const errorMsg = columnContainer.querySelector(".errorMsg");
        errorMsg.style.display = "initial";
        setTimeout(() => {
          errorMsg.style.display = "none";
        }, 2500);

        if (columnContainer.parentElement.children.length > 1) {
          errorMsg.style.marginRight = "25px";
        }

        isError = true;
      }
    });

    if (isError) {
      throw Error("All inputs are required!");
    }
  };

  return (
    <AppContext.Provider
      value={{
        isSideBarOpen,
        setIsSideBarOpen,
        data,
        setData,
        currentData,
        setCurrentData,
        isDarkMode,
        setIsDarkMode,
        editDelete,
        setEditDelete,
        isModalOn,
        setIsModalOn,
        modalNameToActivate,
        setModalNameToActivate,
        handleOndragEnd,
        deleteBoard,
        createBoard,
        newBoard,
        setNewBoard,
        addColumn,
        deleteColumnInput,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobal = () => useContext(AppContext);

export default Provider;

/*
  const hideShowCross = (container) => {
    const containerLength = container.children.length;
    const firstColumnIcon = container.children[0].children[1];

    if (containerLength === 1) {
      firstColumnIcon.style.display = "none";
    } else {
      firstColumnIcon.style.display = "flex";
    }
  };

  const deleteColumnInput = (e) => {
    const columnInputContainer = e.currentTarget.parentElement;
    const columnsContainer = document.querySelector("#columns");

    const newColumnsContainer = [...columnsContainer.children].filter(
      (e) => e !== columnInputContainer
    );
    columnsContainer.innerHTML = "";
    newColumnsContainer.forEach((e) => {
      columnsContainer.appendChild(e);
    });

    hideShowCross(columnsContainer);
  };
  */

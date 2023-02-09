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
  // ******************************************
  // get all boards
  useEffect(() => {
    getAllBoards();
  }, []);

  const getAllBoards = async (boardName) => {
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

      if (boardName) {
        setCurrentData(myData.find((e) => e.name === boardName));
      } else {
        setCurrentData(myData[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // update all data
  const updateBoard = async (editedBoard) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/v1/board/${currentData._id}`,
        editedBoard
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

      await getAllBoards();
      setIsModalOn(false);
    } catch (error) {
      console.log(error);
    }
  };

  // create board
  const createBoard = async (e) => {
    e.preventDefault();

    try {
      newBoard_editBoard_errors();

      await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/v1/board/create`,
        newBoard
      );

      await getAllBoards();
      setNewBoard({
        name: "",
        columns: [{ _id: uuidv4(), name: "", tasks: [] }],
      });
      setIsModalOn(false);
    } catch (error) {
      console.log(error);
    }
  };

  // edit board
  const editBoard = async (e, data) => {
    e.preventDefault();

    try {
      newBoard_editBoard_errors();

      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URL}api/v1/board/edit`,
        data
      );
      const boardName = res.data.name;

      await getAllBoards(boardName);
      setNewBoard({
        name: "",
        columns: [{ _id: uuidv4(), name: "", tasks: [] }],
      });
      setIsModalOn(false);
    } catch (error) {
      console.log(error);
    }
  };

  // create new column
  const createColumn = async (e, newData) => {
    e.preventDefault();

    try {
      newColumnErrors();

      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/v1/column/create`,
        newData
      );
      const boardName = res.data.name;

      await getAllBoards(boardName);
      setIsModalOn(false);
    } catch (error) {
      console.log(error);
    }
  };

  // ********************************************
  // ********************************************
  // ********************************************

  // ******************************************
  // Drag and Drop functionality
  const updateData = (myUdpateCurrentDataColumns) => {
    const newData = data.map((e) => {
      if (e._id === currentData._id) {
        return { ...e, columns: myUdpateCurrentDataColumns };
      }
      return e;
    });

    setData(newData);

    updateBoard({ ...currentData, columns: myUdpateCurrentDataColumns });
  };

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
        (e) => e._id === source.droppableId
      );

      const oldColumn_copy = JSON.parse(JSON.stringify(oldColumn));
      const [removed] = oldColumn_copy.tasks.splice(source.index, 1);

      // change the draggabale item's column
      const newColumn = currentData.columns.find(
        (e) => e._id === destination.droppableId
      );
      const newColumn_copy = JSON.parse(JSON.stringify(newColumn));
      removed.status = newColumn_copy.name;
      newColumn_copy.tasks.splice(destination.index, 0, removed);

      // replace current data
      const udpateCurrentDataColumns = currentData.columns.map((e) => {
        if (e._id === oldColumn_copy._id) {
          return (e = oldColumn_copy);
        }

        if (e._id === newColumn_copy._id) {
          return (e = newColumn_copy);
        }

        return e;
      });
      setCurrentData({ ...currentData, columns: udpateCurrentDataColumns });

      // update my data array
      updateData(udpateCurrentDataColumns);
    } else {
      const column = currentData.columns.find(
        (e) => e._id === source.droppableId
      );

      const newColumn = JSON.parse(JSON.stringify(column));

      // remove the draggable task
      const [removed] = newColumn.tasks.splice(source.index, 1);

      // change the draggabale item's index
      newColumn.tasks.splice(destination.index, 0, removed);

      // replace current data
      const udpateCurrentDataColumns = currentData.columns.map((e) => {
        if (e._id === newColumn._id) {
          return newColumn;
        }
        return e;
      });

      setCurrentData({ ...currentData, columns: udpateCurrentDataColumns });

      // update my data
      updateData(udpateCurrentDataColumns);
    }
  };

  // ******************************************
  // Moadl Errors
  const newBoard_editBoard_errors = () => {
    const columns = [...document.querySelectorAll("#columnName")];
    const boardName = document.querySelector("#boardName");
    let isError = false;

    if (!boardName.value) {
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
      if (!column.value) {
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
        } else {
          errorMsg.style.marginRight = "0px";
        }

        isError = true;
      }
    });

    if (isError) {
      throw Error("All inputs are required!");
    }
  };

  const newColumnErrors = () => {
    const Inputs = [...document.querySelectorAll(".newColumnInput")];
    let isError = false;

    Inputs.forEach((input) => {
      if (!input.value) {
        input.classList.add("emptyInputError");

        setTimeout(() => {
          input.classList.remove("emptyInputError");
        }, 2500);

        const errorMsg = input.parentElement.querySelector(".errorMsg");
        errorMsg.style.display = "initial";
        setTimeout(() => {
          errorMsg.style.display = "none";
        }, 2500);
        if (input.parentElement.parentElement.children.length > 1) {
          errorMsg.style.marginRight = "25px";
        } else {
          errorMsg.style.marginRight = "0px";
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
        createColumn,
        editBoard,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobal = () => useContext(AppContext);

export default Provider;

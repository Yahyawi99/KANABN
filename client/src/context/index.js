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
  const [clickedTask, setClickedTask] = useState("");
  const [taskToEditOrCreate, setTaskToEditOrCreate] = useState(null);
  const [mobileNavBar, setMobileNavBar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingState, setLoadingState] = useState("loading");

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
      setLoadingState("loading");
      setLoading(true);

      const res = await axios(`/api/v1/boards`);

      const myData = res.data.data.sort((a, b) => {
        if (a.columns.length > b.columns.length) {
          return -1;
        }
        if (a.columns.length < b.columns.length) {
          return 1;
        }

        return 0;
      });

      setLoadingState("done");
      setLoading(false);

      setData(myData);

      if (boardName) {
        setCurrentData(myData.find((e) => e.name === boardName));
      } else {
        setCurrentData(myData[0]);
      }
    } catch (error) {
      setLoadingState("error");
      setLoading(false);
    }
  };

  // update all data
  const updateBoard = async (editedBoard) => {
    try {
      await axios.post(`/api/v1/board/${currentData._id}`, editedBoard);
    } catch (error) {
      setLoadingState("error");
      setLoading(false);
    }
  };

  // delete board
  const deleteBoard = async () => {
    try {
      setLoadingState("loading");
      setLoading(true);

      await axios.delete(`/api/v1/board/delete/${currentData._id}`);

      setLoadingState("done");
      setLoading(false);

      await getAllBoards();
      setIsModalOn(false);
    } catch (error) {
      setLoadingState("error");
      setLoading(false);
    }
  };

  // create board
  const createBoard = async (e) => {
    e.preventDefault();

    try {
      newBoard_editBoard_errors();

      setLoadingState("loading");
      setLoading(true);

      await axios.post(`/api/v1/board/create`, newBoard);

      setLoadingState("done");
      setLoading(false);

      await getAllBoards();
      setNewBoard({
        name: "",
        columns: [{ _id: uuidv4(), name: "", tasks: [] }],
      });
      setIsModalOn(false);
    } catch (error) {
      setLoadingState("error");
      setLoading(false);
    }
  };

  // edit board
  const editBoard = async (e, data) => {
    e.preventDefault();

    try {
      newBoard_editBoard_errors();

      setLoadingState("loading");
      setLoading(true);

      const res = await axios.put(`/api/v1/board/edit`, data);
      const boardName = res.data.name;

      setLoadingState("done");
      setLoading(false);

      await getAllBoards(boardName);
      setNewBoard({
        name: "",
        columns: [{ _id: uuidv4(), name: "", tasks: [] }],
      });
      setIsModalOn(false);
    } catch (error) {
      setLoadingState("error");
      setLoading(false);
    }
  };

  // create new column
  const createColumn = async (e, newData) => {
    e.preventDefault();

    try {
      newColumnErrors();

      setLoadingState("loading");
      setLoading(true);

      const res = await axios.post(`/api/v1/column/create`, newData);
      const boardName = res.data.name;

      setLoadingState("done");
      setLoading(false);

      await getAllBoards(boardName);
      setIsModalOn(false);
    } catch (error) {
      setLoadingState("error");
      setLoading(false);
    }
  };

  // create new task
  const addNewTask = async (e, newTaskData) => {
    e.preventDefault();

    try {
      newTaskErrors();

      setLoadingState("loading");
      setLoading(true);

      const res = await axios.post(
        `/api/v1/column/task/create/${currentData._id}`,
        newTaskData
      );
      const boardName = res.data.name;

      setLoadingState("done");
      setLoading(false);

      await getAllBoards(boardName);

      setIsModalOn(false);
    } catch (error) {
      console.log(error);
    }
  };

  // update task status
  const updateTaskStatus = async (taskID, columnID, myTask) => {
    try {
      setLoadingState("loading");
      setLoading(true);

      const res = await axios.put(
        `/api/v1/column/task/update/${currentData._id}`,
        { taskID, columnID, myTask }
      );
      const boardName = res.data.name;

      setLoadingState("done");
      setLoading(false);

      await getAllBoards(boardName);
    } catch (error) {
      setLoadingState("error");
      setLoading(false);
    }
  };

  // update task state
  const updateTaskState = async (taskID, columnName, mySubTask) => {
    try {
      setLoadingState("loading");
      setLoading(true);

      await axios.put(`/api/v1/column/task/subtask/update/${currentData._id}`, {
        taskID,
        columnName,
        mySubTask,
      });

      setLoadingState("done");
      setLoading(false);
    } catch (error) {
      setLoadingState("error");
      setLoading(false);
    }
  };

  // Edit task
  const editTask = async (e, editedTask) => {
    e.preventDefault();

    try {
      newTaskErrors();

      setLoadingState("loading");
      setLoading(true);

      const res = await axios.put(
        `/api/v1/column/task/edit/${currentData._id}`,
        { editedTask, columnName: editedTask.status }
      );
      const boardName = res.data.name;

      setLoadingState("done");
      setLoading(false);

      await getAllBoards(boardName);
      setIsModalOn(false);
    } catch (error) {
      setLoadingState("error");
      setLoading(false);
    }
  };

  // delete task
  const deleteTask = async (taskID, columnName) => {
    try {
      setLoadingState("loading");
      setLoading(true);

      const res = await axios.post(
        `/api/v1/column/task/subtask/delete/${currentData._id}`,
        { taskID, columnName }
      );
      const boardName = res.data.name;

      setLoadingState("done");
      setLoading(false);

      await getAllBoards(boardName);

      setIsModalOn(false);
    } catch (error) {
      setLoadingState("error");
      setLoading(false);
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

  const newTaskErrors = () => {
    const title = document.querySelector("#title");
    const subtasks = [...document.querySelectorAll("#subtask")];
    let isError = false;

    if (!title.value) {
      title.classList.add("emptyInputError");
      setTimeout(() => {
        title.classList.remove("emptyInputError");
      }, 2500);

      const errorMsg = title.nextElementSibling;
      errorMsg.style.display = "initial";
      setTimeout(() => {
        errorMsg.style.display = "none";
      }, 2500);

      isError = true;
    }

    subtasks.forEach((subtask, i) => {
      if (!subtask.value) {
        subtask.classList.add("emptyInputError");
        setTimeout(() => {
          subtask.classList.remove("emptyInputError");
        }, 2500);

        const subtaskContainer = subtask.parentElement;
        const errorMsg = subtaskContainer.querySelector(".errorMsg");
        errorMsg.style.display = "initial";
        setTimeout(() => {
          errorMsg.style.display = "none";
        }, 2500);
        errorMsg.style.marginRight = "25px";

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
        clickedTask,
        setClickedTask,
        addNewTask,
        taskToEditOrCreate,
        setTaskToEditOrCreate,
        editTask,
        updateTaskStatus,
        updateTaskState,
        deleteTask,
        mobileNavBar,
        setMobileNavBar,
        loading,
        loadingState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobal = () => useContext(AppContext);

export default Provider;

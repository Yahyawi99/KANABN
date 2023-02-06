import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

const AppContext = React.createContext();
const Provider = ({ children }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [data, setData] = useState(null);
  const [currentData, setCurrentData] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [editDelete, setEditDelete] = useState(false);
  const [isModalOn, setIsModalOn] = useState(false);
  const [modalNameToActivate, setModalNameToActivate] = useState("");

  // ******************************************
  // get all boards
  useEffect(() => {
    getAllBoards();
  }, []);

  const getAllBoards = async () => {
    try {
      const res = await axios(`${process.env.REACT_APP_BASE_URL}api/v1/boards`);
      const myData = res.data.data;

      setData(myData);
      setCurrentData(myData[0]);
    } catch (error) {
      console.log(error);
    }
  };
  // ******************************************
  // Update my data
  const updateData = (myCurrentData, myUdpateCurrentDataColumns) => {
    setData((prevData) => {
      prevData = prevData.map((e) => {
        if (e.id === myCurrentData.id) {
          e = { ...e, columns: myUdpateCurrentDataColumns };
          return e;
        }
        return e;
      });
      return prevData;
    });
  };

  // ******************************************
  // Drag and Drop
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

      // update my data
      updateData(currentData, udpateCurrentDataColumns);
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobal = () => useContext(AppContext);

export default Provider;

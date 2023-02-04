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
      const myData = res.data.data.boards;

      setData(myData);
      setCurrentData(myData[0]);
    } catch (error) {
      console.log(error);
    }
  };
  // ******************************************

  // ******************************************

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobal = () => useContext(AppContext);

export default Provider;

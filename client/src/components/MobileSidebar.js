import React from "react";
import { useGlobal } from "../context";
// components
import Sidebar from "./Sidebar";
// css
import "../styles/mobileSidebar.css";

const MobileSidebar = () => {
  const { mobileNavBar, setMobileNavBar } = useGlobal();

  if (mobileNavBar) {
    return (
      <div className="mobileSidebar" onClick={() => setMobileNavBar(false)}>
        <Sidebar />
      </div>
    );
  }
};

export default MobileSidebar;

import React from "react";
import { useGlobal } from "../context";
// css
import "../styles/toggle.css";

const Toggle = () => {
  const { isDarkMode, setIsDarkMode } = useGlobal();

  return (
    <section
      onClick={() => setIsDarkMode(!isDarkMode)}
      className={`toggle ${isDarkMode && "slideToggle"}`}
    >
      <div></div>
    </section>
  );
};

export default Toggle;

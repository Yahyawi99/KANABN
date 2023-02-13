import React from "react";
import { useGlobal } from "./context";
// components
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Columns from "./components/Columns";
import Modals from "./components/Modals";
import MobileSidebar from "./components/MobileSidebar";
import Loader from "./components/Loader";
// css
import "./styles/app.css";

function App() {
  const { isDarkMode, isModalOn } = useGlobal();

  let variables = {};
  if (isDarkMode) {
    variables = {
      "--bg": "#20212C",
      "--color-main": "#2B2C37",
      "--color-title": "#fff",
      "--color-border": "#3E3F4E",
      "--shadow": " 0 4px 6px #364e7e1a",
      "--modal-back": "#20212C",
    };
  } else {
    variables = {
      "--bg": "#F4F7FD",
      "--color-main": "#fff",
      "--color-title": "#000",
      "--color-border": "#E4EBFA",
      "--shadow": "0 0 5px 1px #E4EBFA",
      "--modal-back": "#fff",
    };
  }

  return (
    <main style={variables} className="App">
      <Header />

      <section>
        <Sidebar />

        <MobileSidebar />

        <Columns />
      </section>

      {isModalOn && <Modals />}
      <Loader />
    </main>
  );
}

export default App;

/*

    --color-bg: #F4F7FD;
    --color-scroll: #828fa3;
    --color-borderLine: #E4EBFA;
    --color-main: #ffffff;
    --color-title: #000000;
    --color-subTitle: #828fa3;
    --color-board: #ffffff;
    --color-themeSwitchBox: #F4F7FD;
    --color-addButton: #f0effa;
    --color-ellipsis: #E4EBFA;
    --color-checked: rgba(0, 0, 0, .5);

*/

/* 
--color-bg: #20212C;
    --color-scroll: #3E3F4E;
    --color-borderLine: #3E3F4E;
    --color-main: #2B2C37;
    --color-title: #ffffff;
    --color-subTitle: #ffffff;
    --color-board: #20212C;
    --color-themeSwitchBox: #20212C;
    --color-addButton: #ffffff;
    --color-ellipsis: #20212C;
    --color-checked: rgba(255, 255, 255, .5);
*/

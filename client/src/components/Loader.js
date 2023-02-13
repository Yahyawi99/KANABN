import React from "react";
import { useGlobal } from "../context";
// css
import "../styles/loader.css";

const Loader = () => {
  const { loading, loadingState } = useGlobal();

  return (
    <section className={`loader ${loading && "showloader"}`}>
      {loadingState === "loading" && <h1 className="loading">Loading...</h1>}

      {loadingState === "done" && <h1 className="done">Done.</h1>}

      {loadingState === "error" && (
        <h1 className="error">Something went wrong!</h1>
      )}
    </section>
  );
};

export default Loader;

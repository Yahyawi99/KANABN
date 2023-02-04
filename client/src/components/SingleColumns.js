import React from "react";
import { Droppable } from "react-beautiful-dnd";
// components
import Task from "./Task";
// css
import "../styles/SingleColumns.css";

const SingleColumns = ({ columnData }) => {
  const { id, name, tasks } = columnData;

  return (
    <section className="columnContainer">
      <h5 className="name">
        <div className="circle"></div>
        <p>
          {name.toLocaleUpperCase()} ({tasks.length})
        </p>
      </h5>

      <Droppable droppableId={id}>
        {(provided) => (
          <div
            className={`subTasksContainer ${tasks.length === 0 && "noTasks"}`}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks.map((task, i) => {
              return <Task key={i} task={task} name={name} index={i} />;
            })}

            <div style={{ display: "none" }}>{provided.placeholder}</div>
          </div>
        )}
      </Droppable>
    </section>
  );
};

export default SingleColumns;

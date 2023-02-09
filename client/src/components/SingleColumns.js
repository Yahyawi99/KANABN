import React from "react";
import { Droppable } from "react-beautiful-dnd";
// components
import Task from "./Task";
// css
import "../styles/SingleColumns.css";

const SingleColumns = ({ columnData }) => {
  const { _id, name, tasks } = columnData;

  return (
    <section className="columnContainer">
      <h5 className="name">
        <div className="circle"></div>
        <p>
          {name.toLocaleUpperCase()} ({tasks ? tasks.length : 0})
        </p>
      </h5>

      <Droppable droppableId={_id}>
        {(provided) => (
          <div
            className={`subTasksContainer ${
              tasks && tasks.length === 0 && "noTasks"
            }`}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks &&
              tasks.map((task, i) => {
                const { _id } = task;
                return <Task key={_id} task={task} name={name} index={i} />;
              })}

            <div style={{ display: "none" }}>{provided.placeholder}</div>
          </div>
        )}
      </Droppable>
    </section>
  );
};

export default SingleColumns;

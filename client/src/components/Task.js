import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Task = ({ task, name, index }) => {
  const { id, title, subtasks } = task;

  let isCompletedTasks = subtasks.filter((e) => e.isCompleted);

  return (
    task.status === name && (
      <Draggable draggableId={id} index={index} key={id}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <h4>{title}</h4>
            <p>
              {isCompletedTasks.length} of {subtasks.length} subtasks
            </p>
          </div>
        )}
      </Draggable>
    )
  );
};

export default Task;

import React from "react";
import { useGlobal } from "../context";
import { Draggable } from "react-beautiful-dnd";

const Task = ({ task, name, index }) => {
  const {
    setEditDelete,
    setIsModalOn,
    setModalNameToActivate,
    setClickedTask,
  } = useGlobal();
  const { _id, title, subtasks } = task;

  let isCompletedTasks = subtasks.filter((e) => e.isCompleted);

  return (
    task.status === name && (
      <Draggable draggableId={_id} index={index} key={_id}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onClick={() => {
              setEditDelete(false);
              setModalNameToActivate("Task");
              setIsModalOn(true);
              setClickedTask(task);
            }}
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

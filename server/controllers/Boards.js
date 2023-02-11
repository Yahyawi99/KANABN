const { StatusCodes } = require("http-status-codes");
const Boards = require("../models/Boards");

// get all Boards
const getAllBoards = async (req, res) => {
  const Data = await Boards.find();
  res.status(StatusCodes.OK).json({ success: true, data: Data });
};

// update all boards
const updateBoard = async (req, res) => {
  const { id } = req.params;

  await Boards.replaceOne({ _id: id }, req.body);
  const board = await Boards.findOne({ _id: id });

  res.status(StatusCodes.OK).json({ success: true, data: board });
};

// delete board
const deleteBoard = async (req, res) => {
  const { id } = req.params;

  const board = await Boards.findOneAndDelete({ _id: id });

  res.status(StatusCodes.OK).json({ success: true, data: board });
};

// create new board
const createboard = async (req, res) => {
  const { name } = req.body;

  const allBoards = await Boards.find();

  const checkForMatch = allBoards.some((e) => e.name === name);

  if (!checkForMatch) {
    const newBoard = await Boards.create(req.body);
    res.status(StatusCodes.CREATED).json({ succes: true, data: newBoard });
  }

  res
    .status(StatusCodes.BAD_REQUEST)
    .json({ success: true, message: "Board name already exist!" });
};

// editBoard
const editBoard = async (req, res) => {
  const { _id, name, columns } = req.body;

  const editedColumns = columns.map((column) => {
    column.tasks.forEach((task) => {
      task.status = column.name;
    });

    return column;
  });

  await Boards.updateOne(
    { _id },
    {
      $set: { columns: editedColumns, name },
    }
  );
  const Board = await Boards.findOne({ _id });

  res.status(StatusCodes.OK).json({ success: true, name: Board.name });
};

// create new column
const createColumn = async (req, res) => {
  const { _id, columns } = req.body;

  await Boards.updateOne({ _id }, { $set: { columns } });
  const Board = await Boards.findOne({ _id });

  res.status(StatusCodes.CREATED).json({ success: true, name: Board.name });
};

// create new task
const addNewTask = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const board = await Boards.findOne({ _id: id });

  const newColumns = board.columns.map((e) => {
    if (e.name === status) {
      e.tasks.push(req.body);
      return e;
    }
    return e;
  });

  await Boards.updateOne(
    { _id: id },
    {
      $set: { columns: newColumns },
    }
  );

  const newBoard = await Boards.findOne({ _id: id });

  res
    .status(StatusCodes.CREATED)
    .json({ success: true, data: newBoard, name: newBoard.name });
};

// update task status
const updateTaskStatus = async (req, res) => {
  const { taskID, columnID, myTask } = req.body;
  const { id } = req.params;

  const board = await Boards.findOne({ _id: id });

  let editedColumns = board.columns.map((column) => {
    column.tasks = column.tasks.filter((task) => task._id !== taskID);
    return column;
  });

  editedColumns = board.columns.map((column) => {
    if (column._id === columnID) {
      myTask.status = column.name;
      column.tasks.push(myTask);
      return column;
    }
    return column;
  });

  await Boards.updateOne(
    { _id: id },
    {
      $set: { columns: editedColumns },
    }
  );
  const updatedBoard = await Boards.findOne({ _id: id });

  res
    .status(StatusCodes.OK)
    .json({ succes: true, data: updatedBoard, name: updatedBoard.name });
};

// update task state
const updateTaskState = async (req, res) => {
  const { id } = req.params;
  const { taskID, columnName, mySubTask } = req.body;

  const board = await Boards.findOne({ _id: id });

  let editedColumns = board.columns.map((column) => {
    if (column.name === columnName) {
      column.tasks = column.tasks.map((task) => {
        if (task._id === taskID) {
          task.subtasks = task.subtasks.map((subtask) => {
            if (subtask.title === mySubTask) {
              subtask.isCompleted = !subtask.isCompleted;
              console.log(subtask.isCompleted);
              return subtask;
            }
            return subtask;
          });
          return task;
        }
        return task;
      });
      return column;
    }
    return column;
  });

  await Boards.updateOne(
    { _id: id },
    {
      $set: { columns: editedColumns },
    }
  );
  const updatedBoard = await Boards.findOne({ _id: id });

  res
    .status(StatusCodes.OK)
    .json({ succes: true, data: updatedBoard, name: updatedBoard.name });
};

// edit task
const editTask = async (req, res) => {
  const { id } = req.params;
  const { editedTask, columnName } = req.body;

  const board = await Boards.findOne({ _id: id });

  let editedColumns = board.columns.map((column) => {
    if (column.name === columnName) {
      column.tasks = column.tasks.map((task) => {
        if (task._id === editedTask._id) {
          return editedTask;
        }
        return task;
      });
      return column;
    }
    return column;
  });

  await Boards.updateOne(
    { _id: id },
    {
      $set: { columns: editedColumns },
    }
  );
  const updatedBoard = await Boards.findOne({ _id: id });

  res
    .status(StatusCodes.OK)
    .json({ succes: true, data: updatedBoard, name: updatedBoard.name });
};

// delete task
const deleteTask = async (req, res) => {
  const { id } = req.params;
  const { taskID, columnName } = req.body;

  const board = await Boards.findOne({ _id: id });

  const editedColumns = board.columns.map((column) => {
    if (column.name === columnName) {
      column.tasks = column.tasks.filter((task) => task._id !== taskID);
      return column;
    }
    return column;
  });

  await Boards.updateOne(
    { _id: id },
    {
      $set: { columns: editedColumns },
    }
  );
  const updatedBoard = await Boards.findOne({ _id: id });

  res
    .status(StatusCodes.OK)
    .json({ succes: true, data: updatedBoard, name: updatedBoard.name });
};

// ********************************************
// ********************************************
module.exports = {
  getAllBoards,
  updateBoard,
  deleteBoard,
  createboard,
  editBoard,
  createColumn,
  addNewTask,
  updateTaskStatus,
  updateTaskState,
  deleteTask,
  editTask,
};

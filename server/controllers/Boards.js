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

// create new column
const createColumn = async (req, res) => {
  const { _id, columns } = req.body;

  await Boards.updateOne({ _id }, { $set: { columns } });
  const Board = await Boards.findOne({ _id });

  res.status(StatusCodes.CREATED).json({ success: true, name: Board.name });
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

// ********************************************
// ********************************************
module.exports = {
  getAllBoards,
  updateBoard,
  deleteBoard,
  createboard,
  createColumn,
  editBoard,
  addNewTask,
};

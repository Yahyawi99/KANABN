const { StatusCodes } = require("http-status-codes");
const Boards = require("../models/Boards");

// get all Boards
const getAllBoards = async (req, res) => {
  const Data = await Boards.find();
  res.status(StatusCodes.OK).json({ success: true, data: Data });
};

// update all boards
const updateAllBoards = async (req, res) => {
  const { body: newData } = req;

  await Boards.deleteMany();
  await Boards.create(newData);

  res.status(StatusCodes.OK).json({ success: true });
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

  await Boards.updateOne(
    { _id },
    {
      $set: { columns, name },
    }
  );
  const Board = await Boards.findOne({ _id });

  res.status(StatusCodes.OK).json({ success: true, name: Board.name });
};

// ********************************************
// ********************************************
module.exports = {
  getAllBoards,
  updateAllBoards,
  deleteBoard,
  createboard,
  createColumn,
  editBoard,
};

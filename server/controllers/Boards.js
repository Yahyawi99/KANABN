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
  console.log(id);

  const board = await Boards.findOneAndDelete({ _id: id });

  res.status(StatusCodes.OK).json({ success: true, data: board });
};

module.exports = {
  getAllBoards,
  updateAllBoards,
  deleteBoard,
};

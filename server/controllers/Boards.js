const { StatusCodes } = require("http-status-codes");
const Data = require("../../client/src/data/data.json");

// get all Boards
const getAllBoards = async (req, res) => {
  res.status(StatusCodes.OK).json({ success: true, data: Data });
};

module.exports = {
  getAllBoards,
};

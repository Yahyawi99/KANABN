const express = require("express");
const {
  getAllBoards,
  updateAllBoards,
  deleteBoard,
  createboard,
  createColumn,
} = require("../controllers/Boards");

const router = express.Router();

router.route("/boards").get(getAllBoards).post(updateAllBoards);
router.route("/board/delete/:id").delete(deleteBoard);
router.route("/board/create").post(createboard);
router.route("/column/create").post(createColumn);

module.exports = router;

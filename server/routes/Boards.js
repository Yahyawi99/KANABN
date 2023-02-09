const express = require("express");
const {
  getAllBoards,
  updateBoard,
  deleteBoard,
  createboard,
  createColumn,
  editBoard,
} = require("../controllers/Boards");

const router = express.Router();

router.route("/boards").get(getAllBoards);
router.route("/board/create").post(createboard);
router.route("/board/edit").put(editBoard);
router.route("/board/delete/:id").delete(deleteBoard);
router.route("/board/:id").post(updateBoard);

router.route("/column/create").post(createColumn);

module.exports = router;

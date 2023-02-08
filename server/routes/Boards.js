const express = require("express");
const {
  getAllBoards,
  updateAllBoards,
  deleteBoard,
  createboard,
  createColumn,
  editBoard,
} = require("../controllers/Boards");

const router = express.Router();

router.route("/boards").get(getAllBoards).post(updateAllBoards);
router.route("/board/create").post(createboard);
router.route("/board/edit").put(editBoard);
router.route("/board/delete/:id").delete(deleteBoard);

router.route("/column/create").post(createColumn);

module.exports = router;

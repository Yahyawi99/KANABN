const express = require("express");
const {
  getAllBoards,
  updateAllBoards,
  deleteBoard,
} = require("../controllers/Boards");

const router = express.Router();

router.route("/boards").get(getAllBoards).post(updateAllBoards);
router.route("/board/delete/:id").delete(deleteBoard);

module.exports = router;

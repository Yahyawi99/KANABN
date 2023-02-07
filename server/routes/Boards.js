const express = require("express");
const {
  getAllBoards,
  updateAllBoards,
  deleteBoard,
  createboard,
} = require("../controllers/Boards");

const router = express.Router();

router.route("/boards").get(getAllBoards).post(updateAllBoards);
router.route("/board/delete/:id").delete(deleteBoard);
router.route("/board/create").post(createboard);

module.exports = router;

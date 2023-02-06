const express = require("express");
const { getAllBoards, updateAllBoards } = require("../controllers/Boards");

const router = express.Router();

router.route("/boards").get(getAllBoards).post(updateAllBoards);

module.exports = router;

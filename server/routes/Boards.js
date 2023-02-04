const express = require("express");
const { getAllBoards } = require("../controllers/Boards");

const router = express.Router();

router.route("/boards").get(getAllBoards);

module.exports = router;

const mongoose = require("mongoose");

const BoardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name cannot be empty!"],
  },
  columns: {
    type: Array,
    required: [true, "At least one column must be added!"],
  },
});

const Boards = mongoose.model("Boards", BoardSchema);

module.exports = Boards;

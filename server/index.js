require("dotenv").config();
require("express-async-errors");
require("dotenv").config();
const cors = require("cors");

const express = require("express");
const app = express();
const connectDB = require("./db/connect");

const BoardsRoutes = require("./routes/Boards");

// Middlewares
app.use(express.static("../client/build"));
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/v1", BoardsRoutes);

const PORT = process.env.PORT || 3001;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Listening on port : ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

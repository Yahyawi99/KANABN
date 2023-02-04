require("dotenv").config();
const cors = require("cors");

const express = require("express");
const app = express();

const BoardsRoutes = require("./routes/Boards");

// Middlewares
app.use(cors());

// Routes
app.use("/api/v1", BoardsRoutes);

const PORT = process.env.PORT || 3001;
const start = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Listening on port : ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

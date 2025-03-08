const bodyParser = require("body-parser");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;

const setupAndStartServer = () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.listen(PORT, () => {
    console.log("Server started at port :", PORT);
  });
};

setupAndStartServer();

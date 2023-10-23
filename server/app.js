const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Errorhandler = require("./middleware/Error");
const userouter = require("./routes/Userrouter");

const app = express();

//mongoose connect
mongoose
  .connect("mongodb://127.0.0.1:27017/Portfolio")
  .then(() => console.log("mongo connect successfull"))
  .catch((err) => console.log(err));

//cors setup
app.use(cors());

//bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//dotenv config
dotenv.config();

//router  use
app.use(userouter);

//error
app.use(Errorhandler);

module.exports = app;

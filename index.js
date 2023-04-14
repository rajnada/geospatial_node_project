/****************************************************************************** ***
 * ITE5315 – Project
 * I declare that this assignment is my own work in accordance with Humber Academic Policy. * No part of this assignment has been copied manually or electronically from any other source * (including web sites) or distributed to other students. *
 * Group member Name: Raj Nada Student IDs: N01517482 Date: 13/04/2023
 * Group member Name: Nand Patel Student IDs: N01512143 Date: 13/04/2023
 *
 ******************************************************************************
 **/

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
var path = require("path");
require("dotenv").config();

const port = process.env.PORT || 8000;

const app = express();

// setup handlebars
app.engine(
  ".hbs",
  exphbs.engine({
    extname: ".hbs",
  })
);

// here we are setting up the hbs as a view engine to display the output on server side
app.set("view engine", ".hbs");

// middleware for bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// get settings
const settings = require("./config/settings");

// mongo db url
const db = settings.mongoDBUrl;

// attempt to connect with DB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected successfully."))
  .catch((err) => console.log(err));

// Get ship routes
const ship = require("./routes/api/ship");

app.get("/", (req, res) => {
  res.send("Project is Running");
});

// Insert Shipwreck details using form
// STEP - 1 - Display insert shipwreck HTML form
app.get("/insert-shipwreck-form", (req, res) => {
  res.sendFile(path.join(__dirname + "/static-files/index.html"));
});

// actual routes
app.use("/api/ship", ship);

app.listen(port, () => console.log(`App running at port : ${port}`));

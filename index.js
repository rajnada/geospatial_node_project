const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
var path = require("path");

const port = process.env.PORT || 8000;

const app = express();

// setup handlebars
app.engine(
  ".hbs",
  exphbs.engine({
    extname: ".hbs",
  })
);

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

// Get profile routes
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

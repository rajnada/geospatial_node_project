const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const port = process.env.PORT || 8000;

const app = express();

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

// actual routes
app.use("/api/ship", ship);

app.listen(port, () => console.log(`App running at port : ${port}`));

const express = require("express");
const router = express.Router();

// Import Ship schema
const Ship = require("./../../models/Ship");
const { log } = require("console");

//@type     -   GET
//@route    -   /api/profile
//@desc     -   Just for testing
//@access   -   PUBLIC
router.get("/", (req, res) => res.send("Ship related routes"));

//@type     -   GET
//@route    -   /api/profile/get
//@desc     -   Get all people record
//@access   -   PUBLIC
router.get("/get", async (req, res) => {
  // without cursor.
  const ship = await Ship.find({});
  console.log("n", ship);
  try {
    res.send(ship);
  } catch (error) {
    res.status(500).send(error);
  }

  // with cursor
  // const cursor = await Person.find()
  // cursor.forEach(function(myDoc) {
  //     console.log( myDoc );
  // })
});

module.exports = router;

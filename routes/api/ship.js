const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
var cookie = require("cookie-parser");
const jsonwt = require("jsonwebtoken");
const passport = require("passport");
require("../../strategies/jsonWtStrategy")(passport);
const settings = require("../../config/settings");

// Import Ship schema
const Ship = require("./../../models/Ship");

//@type     -   GET
//@route    -   /api/ship
//@desc     -   Just for testing
//@access   -   PUBLIC
router.get("/", (req, res) => res.send("Ship related routes"));

//@type     -   GET
//@route    -   /api/ship/get
//@desc     -   Get all people record
//@access   -   PUBLIC
router.get("/get", async (req, res) => {
  try {
    await Ship.find({}).then((ship) => {
      res.send(ship);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//@type     -   POST
//@route    -   /api/ship/record
//@desc     -   post api to filtered data using the parameters
//@access   -   PUBLIC
router.post("/record", async (req, res) => {
  const page = req.body.page;
  const perpage = req.body.perpage;
  const depth = req.body.depth;
  const query = depth ? { depth } : {};

  try {
    const ship = await Ship.find(query)
      .skip((page - 1) * perpage)
      .limit(perpage)
      .lean() //returns plain js object
      .exec();

    res.render("singleShipWreck", { title: "Filtered Data", data: ship });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//@type     -   GET
//@route    -   /api/ship/get/:id
//@desc     -   Get a particular record
//@access   -   PUBLIC
router.get(
  "/get/:_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Ship.findOne({ _id: req.params._id })
      .then((ship) => res.send(ship))
      .catch((err) => {
        res.status(403).send("Record doesn't exist!");
        console.log(err);
      });
  }
);

// create a new document. URL : /api/ship/add
//@type     -   POST
//@route    -   /api/ship/add
//@desc     -   add a new record
//@access   -   PUBLIC
router.post("/add", (req, res) => {
  res.setHeader("Content-Type", "application/json");

  const shipData = Ship({
    recrd: req.body.recrd,
    vesslterms: req.body.vesslterms,
    feature_type: req.body.feature_type,
    chart: req.body.chart,
    londec: req.body.londec,
    latdec: req.body.latdec,
    gp_quality: req.body.gp_quality,
    depth: req.body.depth,
    watlev: req.body.watlev,
    quasou: req.body.quasou,
    history: req.body.history,
    sounding_type: req.body.sounding_type,
    coordinates: req.body.coordinates,
  });

  // add new document to the collection.
  shipData
    .save()
    .then((shipData) => {
      res.send(shipData);
      // res.send("Successfully ! Added");
    })
    .catch((err) => {
      res.status(500).send(err.message);
      res.send(err.message);
    });
});

//@type     -   PUT
//@route    -   /api/ship/put/:id
//@desc     -   update a particular record
//@access   -   PUBLIC
router.put("/put/:_id", (req, res) => {
  res.setHeader("Content-Type", "application/json");

  const shipData = {
    recrd: req.body.recrd,
    vesslterms: req.body.vesslterms,
    feature_type: req.body.feature_type,
    chart: req.body.chart,
    londec: req.body.londec,
    latdec: req.body.latdec,
    gp_quality: req.body.gp_quality,
    depth: req.body.depth,
    watlev: req.body.watlev,
    quasou: req.body.quasou,
    history: req.body.history,
    sounding_type: req.body.sounding_type,
    coordinates: req.body.coordinates,
  };

  Ship.updateOne({ _id: req.params._id }, { $set: shipData })
    .exec()
    .then(() => {
      res.status(201).send("Successfully ! Record Updated");
    })
    .catch((err) => {
      res.status(403).send("Record doesn't exist!");
      console.log(err);
    });
});

//@type     -   DELETE
//@route    -   /api/ship/delete/:id
//@desc     -   Delete a record on the basis of id
//@access   -   PUBLIC
router.delete("/delete/:_id", (req, res) => {
  Ship.deleteOne({ _id: req.params._id })
    .exec()
    .then(() => {
      res.status(201).send("Successfully ! Record Deleted.");
    })
    .catch((err) => {
      console.log(err);
      res.status(403).send("Record doesn't exist!");
    });
});

// Create temp database
const auth_db = {
  user: [
    {
      id: 1,
      name: "Raj",
      username: "raj",
      password: "$2a$10$kYQvNEOWJmh6ERvIdCkfw.i.V/B/pUPn.al6crDwL4zWAUhu6wCna", // 123456
    },
  ],
};

// Route to login a user. URL : /api/auth/login
router.post("/login", (req, res) => {
  username = req.body.username;
  password = req.body.password; // 123456

  const user = auth_db.user.find((user) => user.username === username);

  console.log(user);

  // check if username is already in collection.
  if (user) {
    // compare the password
    bcrypt
      .compare(password, user.password)
      .then((isCompared) => {
        if (isCompared) {
          // generate JWT
          const payload = {
            id: user.id,
            name: user.name,
            username: user.username,
          };

          console.log(payload);
          // jsonwebtoken method used to create token.
          jsonwt.sign(
            payload,
            settings.secret,
            { expiresIn: 3600 },
            (err, token) => {
              console.log("Error : " + err);
              res.json({
                success: true,
                token: "Bearer " + token,
              });
            }
          );
        } else {
          res.status(401).send("Password is not correct");
        }
      })
      .catch();
  } else {
    res.status(400).send("Username is not there.");
  }
});

module.exports = router;

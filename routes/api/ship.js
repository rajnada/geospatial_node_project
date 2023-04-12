const express = require("express");
const router = express.Router();

// Import Ship schema
const Ship = require("./../../models/Ship");
const { log } = require("console");

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
  let page = req.query.page;
  let perPage = req.query.perPage;
  let depth = req.query.depth;
  // without cursor.
  try {
    await Ship.find({})
      // .lean()
      // .skip(page)
      // .limit(perPage)
      .then((ship) => {
        // console.log("ship =>", ship);
        res.send(ship);
      });
  } catch (error) {
    res.status(500).send(error);
  }
});

//@type     -   GET
//@route    -   /api/ship/get/:id
//@desc     -   Get a particular record
//@access   -   PUBLIC
router.get("/get/:id", (req, res) => {
  Ship.findOne({ _id: req.params._id })
    .then((ship) => res.send(ship))
    .catch((err) => console.log(err));
});

// create a new document. URL : /api/ship/add
router.post("/add", (req, res) => {
  console.log("req =>", req.body);
  res.setHeader("Content-Type", "application/json");

  const shipData = Ship({
    recrd: req.body.recrd,
    vesslterms: req.body.vesslterms,
    feature_type: req.body.feature_type,
    chart: req.body.chart,
    latdec: req.body.latdec,
    londec: req.body.londec,
    gp_quality: req.body.gp_quality,
    depth: req.body.depth,
    watlev: req.body.watlev,
    quasou: req.body.quasou,
    history: req.body.history,
    sounding_type: req.body.sounding_type,
    coordinates: req.body.coordinates,
  });

  // const shipData = Ship({
  //   recrd: "qaz",
  //   vesslterms: "qwe",
  //   feature_type: "Wrecks - Visible",
  // });

  // add new document to the collection.
  shipData
    .save()
    .then((shipData) => {
      console.log("shipData =>", shipData);
      res.json(shipData);
      // res.send("Successfully ! Added");
    })
    .catch((err) => res.send(err.message));
});
// })
// .catch((err) => res.send(err));
// });

module.exports = router;

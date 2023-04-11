const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ShipSchema = new Schema({
  recrd: {
    type: String,
  },
  vesslterms: {
    type: String,
  },
  feature_type: {
    type: String,
  },
  chart: {
    type: String,
  },
  latdec: {
    type: Number,
  },
  londec: {
    type: Number,
  },
  gp_quality: {
    type: String,
  },
  depth: {
    type: Number,
  },
  sounding_type: {
    type: String,
  },
  history: {
    type: String,
  },
  quasou: {
    type: String,
  },
  watlev: {
    type: String,
  },
  coordinates: {
    type: Array,
  },
});
module.exports = Ship = mongoose.model("shipwrecks", ShipSchema);

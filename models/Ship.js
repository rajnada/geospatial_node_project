const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ShipSchema = new Schema({
  recrd: {
    type: String,
    require: true,
  },
  vesslterms: {
    type: String,
    require: true,
  },
  feature_type: {
    type: String,
    require: true,
  },
  chart: {
    type: String,
    require: true,
  },
  latdec: {
    type: Number,
    require: true,
  },
  londec: {
    type: Number,
    require: true,
  },
  gp_quality: {
    type: String,
    require: true,
  },
  depth: {
    type: Number,
    require: true,
  },
  sounding_type: {
    type: String,
    require: true,
  },
  history: {
    type: String,
    require: true,
  },
  quasou: {
    type: String,
    require: true,
  },
  watlev: {
    type: String,
    require: true,
  },
  coordinates: {
    type: Array,
    require: true,
  },
});
module.exports = Ship = mongoose.model("shipwrecks", ShipSchema);

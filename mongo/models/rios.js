const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const riosSchema = new Schema({
  nombre: String,
  descripcion: String,
});

const riosDB = model("rios", riosSchema);

module.exports = riosDB;
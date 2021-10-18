const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const pajaroSchema = new Schema({
  especie: String,
  color: String,
});

const pajarosDB = model("pajaros", pajaroSchema);

module.exports = pajarosDB;
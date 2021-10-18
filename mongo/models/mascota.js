const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const mascotaSchema = new Schema({
  nombre: String,
  descripcion: String,
}, {versionKey: false});

module.exports = model("mascotas", mascotaSchema)

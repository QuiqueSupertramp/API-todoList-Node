const mongoose = require("mongoose");
require("dotenv").config();


const URI = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.s8mcp.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

// Conectar a Mongo----------------------------------------------------
const initMongo = async () => {
  await mongoose
    .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Conectado a MongoDB"))
    .catch(() => console.log("NO se ha podido conectar a MongoDB"));
};


// Exportar funciones ----------------------------
module.exports = {
  initMongo,
};




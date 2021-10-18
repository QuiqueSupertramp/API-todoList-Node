const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Conectamos con Mongo ------------------------------------------------------
const db = require("./mongo/mongoose");
db.initMongo();

//Rutas de la API ---------------------------------------------------------------------
app.use("/api/carpetas", require("./mongo/router/folders.router"));
app.use("/api/tareas", require("./mongo/router/tasks.router"));

// //Conectamos con Mongo ----------------------------------------------------------------
// const db = require("./mongo/mongoose");
// db.initMongo();


//Iniciamos el servidor --------------------------------------------------------------
app.listen(process.env.PORT, () => {
  console.log("Conectado al servidor");
});

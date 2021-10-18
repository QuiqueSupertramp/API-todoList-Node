const express = require("express");
const router = express.Router();

// Import Task model and CRUD functions------------------------------------------
const Tasks = require("../models/Task");
const {
  getAllTasks,
  getTaskById,
  addNewTask,
  deleteTask,
  updateTask,
} = require("../controllers/tasks.controllers");

// Tasks Endpoints----------------------------------------------------------
router.post("/", addNewTask);
router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;

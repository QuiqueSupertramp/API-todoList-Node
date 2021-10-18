const Tasks = require("../models/Task");
const Folder = require("../models/Folder");

// Read all tasks----------------------------------------
const getAllTasks = async (req, res) => {
  try {
    const data = await Tasks.find({}).populate({
      path: "folder",
      select: "_id name",
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message || `Something goes wrong creating ${name}`,
    });
  }
};

// Read one task-----------------------------------------
const getTaskById = async(req,res) => {
  const { id } = req.params

  try {
    let data = await Tasks.findById(id).populate({
      path:"folder",
      select:"_id name"
    })
    res.json(data)
  } catch (error) {
    res.status(500).json({
      message: error.message || `Something goes wrong creating ${name}`,
    });
  }
}

// Add new task------------------------------------------
const addNewTask = async (req, res) => {
  let { name, folder } = req.body;

  try {
    let newTask = new Tasks({ name, folder });
    let data = await newTask.save();
    await Folder.findByIdAndUpdate(folder, { $push: { tasks: data._id } });
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message || `Something goes wrong creating ${name}`,
    });
  }
};

// Delete task-------------------------------------------
const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Tasks.findByIdAndDelete(id);

    !data
      ? res.status(404).json({ message: `ID ${id} doesn't exist!` })
      : (await Folder.findByIdAndUpdate(data.folder, {
          $pull: { tasks: data._id },
        }),
        res.json(data));
  } catch (error) {
    res.status(500).json({ message: error.message || "Something goes wrong" });
  }
};

// Update Task-------------------------------------------
const updateTask = async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  let data = await Tasks.findByIdAndUpdate(id, changes, { new: true });
  res.json({ message: "Task was updated succesfully", data });
};

module.exports = {
  getAllTasks,
  getTaskById,
  addNewTask,
  deleteTask,
  updateTask,
};

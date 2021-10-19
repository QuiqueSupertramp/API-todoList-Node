const Folder = require("../models/Folder");
const Tasks = require("../models/Task")


const getAllFolders = async (req, res) => {
  try {
    const data = await Folder.find({}).populate({
      path: "tasks",
      select: "id name status",
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong",
    });
  }
};

const getFolderById = async (req, res) => {
  const { id } = req.params;

  try {
    let data = await Folder.findById(id).populate({
      path: "tasks",
      select: "id name status",
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong",
    });
  }
};

const addNewFolder = async (req, res) => {
  const { name } = req.body;

  try {
    let newFolder = new Folder({ name });
    const data = await newFolder.save();
    res.status(201).json({ message: "Folder was created succesfully", data });
  } catch (error) {
    res.status(500).json({
      message: error.message || `Something goes wrong creating ${name}`,
    });
  }
};

const deleteFolder = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Folder.findByIdAndDelete(id);
    await Tasks.deleteMany({folder:id})
    !data
      ? res.status(404).json({ message: `ID ${id} doesn't exist!` })
      : res.json({ message: "Folder was deleted succesfully", data });
  } catch (error) {
    res.status(500).json({ message: error.message || "Something goes wrong" });
  }
};


const updateFolder = async (req, res) => {
  let { id } = req.params;
  let name = req.body;

  try {
    const data = await Folder.findByIdAndUpdate(id, name, { new: true });
    res.json({ message: "Folder was updated succesfully", data });
  } catch (error) {
    res.status(500).json({ message: error.message || "Something goes wrong" });
  }
};

module.exports = {
  getAllFolders,
  getFolderById,
  addNewFolder,
  deleteFolder,
  updateFolder,
};

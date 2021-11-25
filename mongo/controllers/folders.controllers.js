const Folder = require("../models/Folder");
const Tasks = require("../models/Task")
const Users = require("../models/User")


const getAllFolders = async (req, res) => {
  try {
    const data = await Folder.find({}).populate({
      path: "tasks",
      select: "id name status",
    }).populate({
      path: "user",
      select: "id"
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
    }).populate({
      path: "user",
      select: "id"
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong",
    });
  }
};

const addNewFolder = async (req, res) => {
  const { name, user } = req.body;
  console.log(user)

  try {
    let newFolder = new Folder({ name, user });
    const data = await newFolder.save();
    await Users.findByIdAndUpdate(user, {$push: {folders: data._id}})
    res.status(201).json({ message: "Folder was created succesfully", data });
  } catch (error) {
    res.status(500).json({
      message: error.message || `Something goes wrong creating ${name}`,
    });
  }
};

const deleteFolder = async (req, res) => {
  const { id, user } = req.params;
  try {
    const data = await Folder.findByIdAndDelete(id);
    await Tasks.deleteMany({folder:id})
    await Users.findByIdAndUpdate(data.user, {$pull: {folders: data._id}})
    
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

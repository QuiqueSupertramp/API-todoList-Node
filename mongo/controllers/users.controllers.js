const userDB = require("../models/User");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
  try {
    let data = await userDB.find({}).populate({
        path: "folders",
        select: "_id name tasks",
        populate: { path : 'tasks'}
    }).populate({
        path: "tasks",
        select: "_id name status",
    });
    res.json(data);
  } catch (error) {
    console.log(error);
    res.json("error");
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    let data = await userDB.findById(id).populate({
        path: "folders",
        select: "_id name tasks",
        populate: { path : 'tasks'}
    }).populate({
        path: "tasks",
        select: "_id name status"
    });
    res.json(data);
  } catch (error) {
    res.json("error");
  }
};

const getUserByMail = (req, res) => {
  //email and password
  const email = req.body.email;
  const password = req.body.password;

  //find user exist or not
  userDB.findOne({ email }).populate({
    path: "folders",
    select: "_id name tasks"
}).populate({
    path: "tasks",
    select: "_id name status"
}).then((user) => {
    if (!user) return res.status(400).json({ msg: "User not exist" });

    //if user exist than compare password
    bcrypt.compare(password, user.password, (err, data) => {
      if (err) throw err;

      if (data) {
        return res.status(200).json({ user, msg: "Login success" });
      } else {
        return res.status(401).json({ msg: "Invalid credencial" });
      }
    });
  });
};

const addUser = async (req, res) => {
  try {
    let { email, name, password } = req.body;
    let newUser = new userDB({ email, name, password });
    newUser.password = await newUser.encryptPassword(newUser.password);
    await newUser.save();
    res.status(201).json({ newUser, message: `WELCOME ${name}` });
  } catch (error) {
    if (error.code === 11000) {
      res
        .status(403)
        .json({ error, message: `el email ${error.keyValue.email} ya existe` });
    } else {
      res.json(error);
    }
  }
};

module.exports = { getUsers, addUser, getUserById, getUserByMail };

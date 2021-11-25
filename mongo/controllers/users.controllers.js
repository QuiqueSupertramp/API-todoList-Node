const userDB = require("../models/User");

const getUsers = async (req, res) => {
  try {
    let data = await userDB.find({});
    res.json(data);
  } catch (error) {
    console.log(error);
    res.json("error");
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    let data = await userDB.findById(id);
    res.json(data);
  } catch (error) {
    res.json("error");
  }
};

const addUser = async (req, res) => {
  try {
    let { email, name, password } = req.body;
    let newUser = new userDB({ email, name, password });
    newUser.password = await newUser.encryptPassword(newUser.password);
    await newUser.save();
    res.status(201).json(`WELCOME ${name}`);
  } catch (error) {
    if (error.code === 11000) {
      res.json(`el email ${error.keyValue.email} ya existe`);
    } else {
      console.log(error);
      res.json(error);
    }
  }
};

module.exports = { getUsers, addUser, getUserById };

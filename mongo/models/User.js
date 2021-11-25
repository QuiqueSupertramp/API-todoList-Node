const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "EMAIL REQUIRED"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "NAME REQUIRED"],
  },
  password: {
    type: String,
    required: [true, "PASSWORD REQUIRED"],
  },
  folders: [
    {
      type: Schema.Types.ObjectId,
      ref: "folders",
    },
  ],
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "tasks",
    },
  ],
});

userSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const userDB = model("users", userSchema);

module.exports = userDB;

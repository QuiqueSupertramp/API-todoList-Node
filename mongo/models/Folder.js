const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

// Folder Schema----------------------------------------------
const folderSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "NAME REQUIRED!"],
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'tasks'
    }]
  },
  { versionKey: false }
);

//  Folder Model----------------------------------------------
const folderDB = model('folders', folderSchema);

module.exports = folderDB;

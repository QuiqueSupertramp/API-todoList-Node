const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

// Task Schema--------------------------------------------
const taskSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name required!"],
    },
    status: {
        type: Boolean,
        default: false
    },
    folder:{
        type: Schema.Types.ObjectId,
        ref:'folders'
    }
}, {versionKey: false})

// Task Model--------------------------------------------
const taskModel = model('tasks', taskSchema)

module.exports = taskModel
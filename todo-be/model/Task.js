const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = Schema({
    task: {
        type: String,
        required: true,
    },
    isComplete: {
        type: Boolean,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId, // _id 가져오기
        required: true,
        ref: "User" // 어디의 아이디를 가져올껀지? User를 참조할 것이다.
    },
},
{ timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;

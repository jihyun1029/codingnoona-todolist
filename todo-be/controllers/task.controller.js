const Task = require('../model/Task');
const taskController = {}

taskController.createTask = async (req, res) => {
    try {
        const { task, isComplete } = req.body;
        const {userId} = req;
        // const newTask = new Task({task, isComplete});
        const newTask = new Task({task, isComplete, author: userId});
        await newTask.save();
        res.status(200).json({ status: 'ok', data: newTask });
    } catch (err) {
        res.status(400).json({ status: 'fail', error: err })
    }
};

taskController.getTask = async (req, res) => {
    try {
        console.log("=== getTask 호출됨 ===");
        const taskList = await Task.find({}).populate("author", "name email");
        console.log("populate 후 taskList:", JSON.stringify(taskList, null, 2));
        res.status(200).json({ status: 'ok', data: taskList });
    } catch (err) {
        console.error("getTask 에러:", err);
        res.status(400).json({ status: 'fail', error: err });
    }
}

taskController.updateTask = async (req, res) => {
    try {
        const updateTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // req.body에 스키마 검증을 적용
        );
        if (!updateTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ status: 'ok', data: updateTask });
    } catch (err) {
        res.status(400).json({ status: 'fail', error: err})
    }
}

taskController.deleteTask = async (req, res) => {
    try {
        const deleteItem = await Task.findByIdAndDelete(req.params.id);
        if (!deleteItem) {
            return res.status(404).json({ status: 'fail', message: 'Task not found' });
        }
        res.status(200).json({ status: 'ok', data: deleteItem });
    } catch (err) {
        res.status(400).json({ status: 'fail', error: err });
    }
}

module.exports = taskController;
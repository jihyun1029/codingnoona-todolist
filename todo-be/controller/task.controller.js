const Task = require('../model/Task');
const taskController = {}

taskController.createTask = async (req, res) => {
    try {
        const { task, isComplete } = req.body;
        const newTask = new Task({task, isComplete})
        await newTask.save();
        res.status(200).json({ status: 'ok', data: newTask });
    } catch (err) {
        res.status(400).json({ status: 'fail', error: err })
    }
};

taskController.getTask = async (req, res) => {
    try {
        const taskList = await Task.find({}).select("-__v");
        res.status(200).json({ status: 'ok', data: tastList });
    } catch (err) {
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
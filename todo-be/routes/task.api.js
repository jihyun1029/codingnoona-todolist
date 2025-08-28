const express = require('express')
const authController = require('../controllers/auth.controller');
const taskController = require('../controllers/task.controller');
const router = express.Router()

router.get('/', taskController.getTask);

router.post('/', authController.authenticate, taskController.createTask);

router.put('/:id', taskController.updateTask);

router.delete('/:id', taskController.deleteTask);

module.exports = router;
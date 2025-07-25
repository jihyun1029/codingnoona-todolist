const express = require('express')
const router = express.Router()
const taskApi = require('./task.api')
const userApi = require('./user.api')

router.use('/tasks', taskApi); // 라우터가 ‘/tasks’라는 주소 요청이 오면 taskApi로 넘어갈 것이다.
router.use("/user", userApi); // /user post => create user

module.exports = router;
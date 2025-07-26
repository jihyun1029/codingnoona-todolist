const express = require('express')
const router = express.Router();
const userController = require('../controller/user.controller')


// 1. 회원가입 endpoint
router.post("/", userController.createUser);
router.post("/login", userController.loginWithEmail);
// 왜 post? 이메일과 패스워드 정보를 읽어와야해서 get이라고 생각할 수 있지만,
// get은 추가적인 정보를 req.body를 사용할 수 없다.
// url에 이메일과 패스워드를 넣을 수 없으니 post를 사용한다.

module.exports = router;
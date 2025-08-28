const authController = {};
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// 토큰을 통해서 권한을 가져오기
authController.authenticate = (req, res, next) => {
    try {
        const tokenString = req.headers.authorization; // Bearer <token>
        if (!tokenString) {
            throw new Error("invalid token")
        }
        const token = tokenString.replace("Bearer ", "");

        jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
            if(error) {
                throw new Error("invalid token");
            }
            // res.status(200).json({status: "success", userId: payload._id});
            // User.findById(userId); 여기서 사용 X. why? 토큰이 유효한지 아닌지 판별하는 함수이기 때문에 user.controller 에서 사용
            req.userId = payload._id
        });
        next(); // 여기서 다음이 뭔지 어떻게 알까? user.api에서
    } catch (error) {
        res.status(400).json({status: "fail", message: error.message});
    }
}

module.exports = authController
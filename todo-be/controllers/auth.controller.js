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
            req.userId = payload._id
        });
        next();
    } catch (error) {
        res.status(400).json({status: "fail", message: error.message})
    }
}

module.exports = authController
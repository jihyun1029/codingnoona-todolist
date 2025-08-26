const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
require('dotenv').config()
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})

// 언제 호출을 하던 패스워드를 빼고 보내주겠다.
userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    delete obj.updatedAt;
    delete obj.__v;
    return obj;
}

// user에서 사용하는 user만의 기능을 여기에 넣는다.
userSchema.methods.generateToken = function() {
    const token = jwt.sign({ _id : this._id }, JWT_SECRET_KEY, {
        expiresIn: '1d', // token 유효기간
    });
    return token;
}

const User = mongoose.model("User", userSchema);

module.exports = User;
const User = require('../model/User')
const bcrypt = require('bcryptjs')
const saltRounds = 10

const userController = {}

userController.createUser = async (req, res) => {
    try {
        const {email, name, password} = req.body
        const user = await User.findOne({email})
        if(user) {
            throw new Error('이미 가입이 된 유저 입니다')
        }
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        console.log("hash", hash);
        const newUser = new User({email, name, password:hash});
        await newUser.save();
        res.status(200).json({status:"success"});

    } catch (error) {
        res.status(400).json({status: "fail", error: error.message});
    }
}

userController.loginWithEmail = async (req, res) => {
    try {
        // 2. 이메일 패스워드 정보 읽어오기
        const {email, password} = req.body;
        // 3. 이메일을 가지고 유저정보 가져오기
        const user = await User.findOne({email}, "-createdAt -updatedAt -__v")
        if(user) {
            // password ==> 유저가 입력한 그 자체
            // user.password => 암호화된 패스워드
            // 어떻게 비교?
            const isMatch = await bcrypt.compare(password, user.password);

            if(isMatch) {
                // 5. 맞다! 그러면 토큰 발행
                // 토큰은 model/User.js에서 만들꺼다. 왜? User와 관련이 있기 때문에 같이 모아두는 것.
                // 5. 맞다! 그러면 토큰 발행
                const token = user.generateToken();
                // 7. 응답으로 유저정보 + 토큰 보냄
                return res.status(200).json({status: 'success', user, token})
            }
        }
        // 6. 틀리면 에러메세지 보냄
        throw new Error('아이디 또는 비밀번호가 일차하지 않습니다')
    } catch (error) {
        res.status(400).json({status: 'fail', message: error.message});
    }
};

userController.getUser = async(req, res) => {
    try {
        const {userId} = req // req.userId
        const user = User.findById(userId);
        if(!user) {
            throw new Error("can not find user");
        }
        res.status(200).json({status:"success", user});
    } catch (error) {
        res.status(400).json({status: "fail", message: error.message});
    }

}

module.exports = userController

// 미들웨어

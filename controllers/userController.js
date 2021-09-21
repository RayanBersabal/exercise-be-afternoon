const { User } = require('../models')
const { isCorrectPw, encrypt } = require('../middlewares/bcrypt')
const { generateToken, getUserData } = require('../middlewares/jwt')

class UserController{
    static async getUsers (req, res) {
      const users = await User.findAll();
      res.status(200).json(users)
    }

    static async loginUser(req, res, next){
        const username = req.body.username;
        const password = encrypt(req.body.password);
        const user = await User.findOne({ where: { username: username}})
        const hashedPw = user.dataValues.password

        if (isCorrectPw(password, hashedPw)) {
            let dataUser = user.dataValues;
            delete dataUser.passwords
            let token = generateToken(dataUser)
            res.status(200).json({token, message: "login success"})
        } else {
            let message ={ message: "auth failed"}
            res.status(401).json(message)
        }
    }
    static async register(req, res, next) {
      let usernameUser = req.body.username;
        let passwordUser = encrypt(req.body.password);
        let genderUser = req.body.gender;

        let objUser = {
            username: usernameUser,
            password: passwordUser,
            gender: genderUser
        }
        const user = await User.create(objUser);
        if(user){
            res.status(200).json({ message: "Success"}, user);
        }
      }
}
module.exports = UserController
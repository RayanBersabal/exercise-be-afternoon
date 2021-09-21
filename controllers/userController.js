const { User } = require('../models')
const { isCorrectPw, encrypt } = require('../middlewares/bcrypt')
const { generateToken, getUserData } = require('../middlewares/jwt')

class UserController{
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
      let statusCode;
      let token = req.params.token
      let userData = getUserData(token)
      const username = req.body.username
      const password = req.body.password
      const objUser = { username, password }
      User.register(objUser)
        .then(user => {
          if (user) {
            statusCode = 201;
            let output = {
              statusCode, userCreated: user
            }
            res.status(201).json(output)
          }
        })
        .catch(err => {
          next(err)
        })
    } 
  
    static async getAll(req, res) {
      let token = req.headers.token;
      let userData = getUserData(token)
      const users = await User.findAll();
      res.status(200).json(users)
    }
}
module.exports = UserController
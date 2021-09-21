const router = require('express').Router()
const UserController = require('../controllers/userController')
const { isLogin } = require('../middlewares/auth')

router.get('/', isLogin, UserController.getUser)
router.post('/', isLogin, UserController.loginUser)
router.post('/', isLogin, UserController.register)

module.exports = router
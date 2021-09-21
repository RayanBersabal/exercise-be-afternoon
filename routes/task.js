const router = require('express').Router()
const TaskController = require('../controllers/taskController')
const { isLogin } = require('../middlewares/auth')

router.get('/', isLogin, TaskController.getTask)
router.post('/', isLogin, TaskController.createTask)
router.put('/', isLogin, TaskController.updateTask)
router.delete('/', isLogin, TaskController.deleteTask)

module.exports = router
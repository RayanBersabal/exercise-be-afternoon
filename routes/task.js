const router = require('express').Router()
const TaskController = require('../controllers/taskController')
const { isLogin, authorized } = require('../middlewares/auth')

router.get('/', isLogin, TaskController.getTask)
router.post('/add', isLogin, TaskController.createTask)
router.put('/update/:id', isLogin, authorized,TaskController.updateTask)
router.delete('/:id', isLogin, authorized,TaskController.deleteTask)

module.exports = router
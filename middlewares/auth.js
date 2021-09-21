function isLogin(req,res,next) {
    let token = req.headers.token
    
    if(!token){
        res.status(400).json({ message: "please sign in first"})
    }
    next()
}
function authorized (req, res, next) {
    const taskId = req.params.id
    const userId = getUserData(req.headers.token).id
    

    const task = Task.findByPk(taskId)
    .then(task => {
        if(!task) {
            res.status(404).json({ messages: `Task id ${taskId} is not found` })
        } else if (task.dataValues.userId !== userId) {
            res.status(401).json({ messages: `You are not authorized` })
        } else {
            next()
        }
    })
    .catch(next)
}
module.exports = { isLogin, authorized }
const { Task } = require('../models')


class TaskController{
    static async getTask (req, res){
        const tasks = await Task.findAll()
        res.status(200).json(tasks)
    }
    static async getTaskById (req, res){
        const {id} = req.params.id
        const tasks = await Task.findByPk(id)
        if (tasks) {
            res.status(200).json(tasks)
        } else {
            res.status(404)
        }
        
    }
    static async createTask (req, res){
        
        let task = req.body.taskname
        let taskstatus = req.body.status
        let ObjTask = {
            taskname: task,
            status: taskstatus
        }
       const tasks = await Task.create(ObjTask)
       if(tasks){
           res.status(200).json(tasks)
       }else{
        res.status(404).json({"message": "task not created"})
       }
    }
    static async updateTask (req, res){
        let taskId = req.params.id
        let task = req.body.taskname
        let taskstatus = req.body.status
        let ObjTask = {
            taskname: task,
            status: taskstatus
        }
        const tasks = await Task.update(ObjTask, { where: {id:taskId}})
       
       if(tasks){
           res.status(200).json(tasks)
       }else{
        res.status(404).json({"message": "task not updated"})
       }
    }
    static async deleteTask (req, res){
        let taskId = req.params.id
        const deletedTask = await Task.findByPk(taskId)
        if (deletedTask) {
            const tasks = await Task.destroy(ObjTask, { where: {id:taskId}})
        }
       
       if(tasks){
           res.status(200).json(tasks)
       }else{
        res.status(404).json({"message": "task not deleted"})
       }
    }

}

module.exports = TaskController
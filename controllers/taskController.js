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
        const { id } = getUserData(req.headers.token)
        const { id: taskId } = req.params
        const update = await Task.update({
            status : "done"
        },
        {
            where:{id: taskId }
        });
       
       if(tasks){
           res.status(200).json(tasks)
       }else{
        res.status(404).json({"message": "task not updated"})
       }
    }
    static async deleteTask (req, res){
        const { id, gender } = getUserData(req.headers.token)
        const { id: taskId } = req.params

        if (gender !== 'female') res.status(403).json({ message: "forbidden access to this endpoint"});
        const task = await Task.destroy({where:{id: taskId }})
        res.status(200).json("success")
    }

}

module.exports = TaskController
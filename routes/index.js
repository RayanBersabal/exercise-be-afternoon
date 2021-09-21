const router = require('express').Router();
const userRoute = require("./user")
const taskRoute = require("./task")

router.use("/users", userRoute)
router.use("/tasks", taskRoute)


module.exports = router;
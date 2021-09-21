function isLogin(req,res,next) {
    let token = req.headers.token
    
    if(!token){
        res.status(400).json({ message: "please sign in first"})
    }
    next()
}
module.exports = { isLogin }
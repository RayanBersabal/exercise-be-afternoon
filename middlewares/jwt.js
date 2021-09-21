require('dotenv').config()
const jwt = require('jsonwebtoken');
const secretkey = process.env.SECRET_KEY

function generateToken(dataUser = {}) {
    let token = jwt.sign(dataUser, secretkey)
    return token
}
function getUserData(token) {
    let decoded = jwt.verify(token, secretkey)
    return decoded
}
module.exports = { generateToken, getUserData }
const bcrypt = require('bcryptjs');

function encrypt(rawPassword) {
    const saltRound = 10
    const hash = bcrypt.hashSync(rawPassword, saltRound)
    return hash
}

function isCorrectPw(rawPw, hashedPw) {
    return bcrypt.compareSync(rawPw, hashedPw)
}
module.exports = { encrypt, isCorrectPw,}
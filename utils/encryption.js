const bcrypt = require('bcrypt');
const crypto = require('crypto');

const encryptPassword = async(string) => {
    const salt = Math.random(Math.floor() * 10)
    const hash = await bcrypt.hash(string, salt)
    if(!hash) return
    return hash
}
const comparePassword = async(string, hash) => {
    const result = await bcrypt.compare(string, hash)
    if(!result) return false
    return true
}
const encryptUser = async(string) => {
    const result = crypto.createHash("sha256").update(string).digest('hex')
    return result
}

module.exports = {
    encryptPassword,
    comparePassword,
    encryptUser,
}
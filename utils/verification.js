const userData = require("../schema/userInfo.js")
const {encryptPassword, comparePassword, encryptUser } = require("./encryption.js")
const verifyToken = async(token)=> {
    var error
    const verify = await userData.find({token: token})
    if(verify.length != 0){
        return verify[0]
    }
    return error
}
const verifyUser = async(username, password) => {
    var error;
    const userHash = await encryptUser(username)
    const query = await userData.find({username: userHash})
    if(query.length == 0){
        return error
    }
    const passwordHash = query[0].password
    const compare = await comparePassword(password, passwordHash)
    if(compare){
        return query[0]
    }
    return error
}
module.exports = {
    verifyToken,
    verifyUser
}
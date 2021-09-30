const { nanoid } = require("nanoid/async")

const userData = require(__dirname + `/../../schema/userInfo.js`)
const {comparePassword, encryptUser} = require(__dirname + `/../../utils/encryption.js`)

module.exports = async(req, res) => {
    const { headers } = req
    const username = headers.username
    const password = headers.password
    const userHash = await encryptUser(username)

    const query = await userData.find({username: userHash})
    if(query.length == 0){
        res.status = 401
        return res.json({
            Status: 401,
            Message: "Username or password invalid"
        })
    }
    const passwordHash = query[0].password
    const verifyPassword = await comparePassword(password, passwordHash)
    if(!verifyPassword){
        res.status = 401
        return res.json({
            Status: 401,
            Message: "Username or password is invalid"
        })
    }
    var token = await nanoid(20)
    await userData.findOneAndUpdate({
        username: userHash
    },{
        token: token
    }, {
        upsert: false
    }).then((data, error) => {
        if(error){
            res.status =  500
            return res.json({
                Status: 500,
                Message: "Internal server error",
                Description: "Unable to save new token. Please contact an administrator or try again"
            })
        }
        res.status = 200
        return res.json({
            Status: 200,
            Message: "Successfully updated token",
            Data: {
                token: token
            }
        })
    })
    



}
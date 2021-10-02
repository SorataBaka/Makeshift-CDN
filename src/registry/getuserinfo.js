const { encryptUser, comparePassword } = require(__dirname + '/../../utils/encryption.js')
const userData = require(__dirname + '/../../schema/userInfo.js')


module.exports = async(req, res) =>{
    const { body } = req
    const username = body.username
    const password = body.password
    if(!username || !password){
        res.status = 400
        return res.json({
            Status: 400,
            Message : "Invalid body"
        })
    }


    const userHash = await encryptUser(username)

    const query = await userData.find({username: userHash})
    if(query.length == 0) {
        res.status = 401
        return res.json({
            Status: 401,
            Message: "Username or password is invalid"
        })
    }
    const compare = await comparePassword(password, query[0].password)
    if(!compare){
        res.status = 401
        return res.json({
            Status: 401,
            Message: "Username or password is invalid"
        })
    }

    const id = query[0].id
    const token = query[0].token

    res.status = 200
    return res.json({
        Status: 200,
        Message: "Successfully retrieved userdata",
        Descryption : "Userdata retrieved from the database",
        Content: {
            username: username,
            id : id,
            token : token,
        }
    })


} 
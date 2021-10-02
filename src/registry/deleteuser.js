//Takes in the username and password and deletes everything from the database. Including all stored medias.

const { encryptUser, comparePassword } = require(__dirname + `/../../utils/encryption.js`)
const userData = require(__dirname + `/../../schema/userInfo.js`)
const fs = require("fs")
const path = require("path")
module.exports = async(req, res) =>{
    const { body } = req
    if(!body.username || !body.password){
        res.status = 401
        return res.json({
            Status: 401,
            Message: "Insufficient body content",
            Description: " Please provide a username header and password header"
        })
    }

    const username = body.username
    const password = body.password
    const userEncrypted = await encryptUser(username)

    const dataQuery = await userData.find({username: userEncrypted})
    if(dataQuery.length == 0){
        res.status = 401
        return res.json({
            Status: 401,
            Message: "Invalid username or password",
            Description: "The username you have provided is not found or the password you have provided is invalid"
        })
    }
    const passwordHash = dataQuery[0].password
    const compare = await comparePassword(password, passwordHash)
    if(!compare){
        res.status = 401
        return res.json({
            Status: 401,
            Message: "Invalid username or password",
            Description: "The username you have provided is not found or the password you have provided is invalid"
        })
    }
    const id = dataQuery[0].id
    const newpath = path.resolve(__dirname + `/../../data/${id}`)
    const databaseDeletion = async() => {
        const deleteMongo = await userData.findOneAndDelete({username: userEncrypted})
        if(!deleteMongo) return false
        return true
    }
    if(!fs.existsSync(newpath)){
        await databaseDeletion()
        res.status = 500
        return res.json({
            Status: 500,
            Message: "Data not found",
            Description: "Your data directory is not found on the server. Deleting user from database. "
        })
    }
    fs.rmdirSync(newpath, {recursive: true, force: true})
    
    const deleteUser = await databaseDeletion()
    if(deleteUser){
        res.status = 200
        return res.json({
            Status: 200,
            Message: "Successfully deleted user and data",
            Description: "Successfully deleted user from the database and every data associated.",
            deletedUser:{
                user: username,
                id: id
            }
        })
    }else{
        res.status =  500
        return res.json({
            Status: 500,
            Message: "Failed to delete user from database",
            Description: "Client is unable to delete user data from the database. Please contact an administrator or try again."
        })
    }
} 
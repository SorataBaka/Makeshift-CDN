//Create a user that may use the database to add, edit, or remove content.
//Once a user registers themselves within the API, create a folder at directory /../../users with the name of the folder as the id of the user.
//Store user info in a mongodb database. The information stored contains the name of the user, the id, generated token, 

//takes in username and password


const userData = require(__dirname + '/../../schema/userInfo.js')
const { nanoid } = require("nanoid/async")
const fs = require("fs")
const path = require("path")

module.exports = async(req, res) =>{
    const { headers } = req
    //verify if user provided a username and password
    if(!headers.username || !headers.password) return res.json({
        Status: 401,
        Message: "Insufficient headers",
        Description: " Please provide a username header and password header"
    })
    const username = headers.username
    const password = headers.password
    
    //verify if username already exists
    const verify = await userData.find({username: username})
    if(verify.length != 0) return res.json({
        Status: 401,
        Message: "Username taken",
        Description: "The username you've chosen has already been taken. Please choose another one."
    })
    //generate a new id and token then create a directory based on it
    const generate = async() => {
        var id = await nanoid(10)
        var token = await nanoid(20)
        const dirpath = path.resolve(__dirname + `/../../data/${id}`)
        const sourcepath = path.resolve(__dirname + `/../../data/${id}/source`)
        const buildpath = path.resolce(__dirname + `/../../data/${id}/build`)
        if(!fs.existsSync(dirpath)){
            fs.mkdirSync(dirpath)
            fs.mkdirSync(sourcepath)
            fs.mkdirSync(buildpath)
            return {
                id,
                token
            }
        }else{
            return generate()
        }
    }
    const { id, token } = await generate()
    //save generated id and token to the database
    const saveDatabase = async() => {
        await userData.findOneAndUpdate({
            username: username,
            password: password,
            id: id,
            token: token,
        },{
            username: username,
            password: password,
            id: id,
            token: token,
        },{
            upsert: true
        }).then((data, error) => {
            if(error){
                console.log(error)
                return saveDatabse()
            }
            return res.json({
                Status: 200,
                Message: "Successfully created a new user. Please save the information below. You can use the token to perform actions later on. The id is used to identify your account while the username and password can be used to retrieve your id and token.",
                Data: {
                    username: username,
                    id: id,
                    token: token,
                }
            })
        })
    }
    saveDatabase()
} 
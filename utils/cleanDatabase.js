const fs = require("fs")
const path = require("path")
const userData = require("../schema/userInfo.js")
module.exports = async() => {
    const data = await userData.find({})
    data.forEach(async document => {
        const id = document.id
        const folderPath = path.resolve(__dirname + `/../data/${id}`)
        //if there is no folder matching the id from the database, delete user from database
        if(!fs.existsSync(folderPath)){
            await userData.findOneAndDelete({id: id})
        }
    })
}
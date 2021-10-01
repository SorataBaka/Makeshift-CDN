const fs = require('fs')
const path = require('path')
const userData = require("../../schema/userInfo.js")
module.exports = async(req, res) => {
    const id = req.params.id
    const { headers } = req
    const token = headers.token
    if(!token){
        res.status = 401
        return res.json({
            Status: 401,
            Message: "Unauthorized Access"
        })
    }
    const verify = await userData.find({token: token})
    if(verify.length == 0 || verify[0].id != id){
        res.status = 401
        return res.json({
            Status: 401,
            Message: "Unauthorized Access"
        })
    }
    const folderPath = path.resolve(__dirname + `/../../data/${id}`)
    if(!fs.existsSync(folderPath)){
        await userData.findOneAndDelete({id: id})
        res.status = 404
        return res.json({
            Status: 404,
            Message: "ID invalid and not found in storage. Deleting userdata from database."
        })
    }
    const fileList = fs.readdirSync(folderPath)
    res.status = 200
    return res.json({
        Status: 200,
        Message: "Successfully retrieved",
        fileList: fileList
    })
}
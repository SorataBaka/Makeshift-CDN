const fs = require('fs')
const path = require('path')
const userData = require("../../schema/userInfo.js")
module.exports = async(req, res) => {
    const id = req.params.id
    const fileName = req.params.filename
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
    const filePath = path.resolve(__dirname + `/../../data/${id}/${fileName}`)
    if(!fs.existsSync(filePath)){
        res.status = 404
        return res.json({
            Status: 404,
            Message: "File not found"
        })
    }
    fs.rmSync(filePath)
    res.status = 200
    return res.json({
        Status: 200,
        Message: "Successfully Deleted",
        file: fileName
    })
}
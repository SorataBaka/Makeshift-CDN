const userData = require(__dirname + "/../../schema/userInfo.js")
const multer = require("multer")
const fs = require("fs")
const path = require("path")
module.exports = async(req, res)=>{
  //verify token existence and validity
  const { params } = req
  const { headers } = req
  const token = headers.token
  const fileName = params.filename
  if(!token || !fileName){
    res.status = 400
    return res.json({
      Status: 400,
      Message: "Please provide a token"
    })
  }
  const query = await userData.find({token: token})
  if(query.length == 0){
    res.status = 400
    return res.json({
      Status: 400,
      Message: "Token invalid"
    })
  }
  const id = query[0].id
  //check if id exists in directory
  const folderPath = path.resolve(__dirname + `/../../data/${id}`)
  if(!fs.existsSync(folderPath)){
    res.status = 404
    await userData.findOneAndDelete({token: token})
    return res.json({
      Status : 404,
      Message : "Directory not found in the database. Deleting userdata"
    })
  }

  return res.json({
    Message: "success"
  })
}
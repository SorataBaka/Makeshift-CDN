const userData = require(__dirname + "/../../schema/userInfo.js")
const fs = require("fs")
const path = require("path")
module.exports = async(req, res)=>{
  //verify token existence and validity
  if(!req.file){
    res.status = 400
    return res.json({
      Status: 400,
      Message: "No file provided"
    })
  }
  const { headers } = req
  const token = headers.token
  const fileName = req.file.originalname
  //-----------------------------------------------------------------------------------------------------------------------------------
  //Do checks to see if user exists and data may be written
  var Allowed = true
  const fileExtensionArray = fileName.split(".")
  const fileExtension = fileExtensionArray[fileExtensionArray.length - 1]
  const restrictedJSON = JSON.parse(fs.readFileSync(path.resolve(__dirname + `/../../restrictedFile.json`)))
  restrictedJSON.forEach(extension => {
    if(fileExtension.toUpperCase() == extension){
      Allowed = false
    }
  })
  if(!Allowed){
    res.status = 401
    fs.rmSync(req.file.path)
    return res.json({
      Status: 401,
      Message: "Unauthorized file extension",
      Content: {
        fileName: fileName,
        extension: fileExtension,
        fileType: req.file.mimetype,
        size: req.file.size
      }
    })
  }
  if(req.file.size > 2000000){
    res.status = 401
    fs.rmSync(req.file.path)
    return res.json({
      Status: 400,
      Message: "File too big"
    })
  }
  if(!token || !fileName){
    res.status = 400
    fs.rmSync(req.file.path)
    return res.json({
      Status: 400,
      Message: "Please provide a token"
    })
  }
  const query = await userData.find({token: token})
  if(query.length == 0){
    res.status = 400
    fs.rmSync(req.file.path)
    return res.json({
      Status: 400,
      Message: "Token invalid"
    })
  }
  const id = query[0].id
  const folderPath = path.resolve(__dirname + `/../../data/${id}`)
  if(!fs.existsSync(folderPath)){
    res.status = 404
    fs.rmSync(req.file.path)
    await userData.findOneAndDelete({token: token})
    return res.json({
      Status : 404,
      Message : "Directory not found in the database. Deleting userdata"
    })
  }
  if(fs.existsSync(__dirname + `/../../data/${id}/${fileName}`)){
    res.status = 400
    fs.rmSync(req.file.path)
    return res.json({
      Status: 400,
      Message: "File name already exists"
    })
  }
  //-----------------------------------------------------------------------------------------------------------------------------------
  //write file from the temporary buffer
  const tempPath = path.resolve(req.file.path)
  const writePath = path.resolve(__dirname + `/../../data/${id}/${fileName}`)
  const fileBuffer = fs.readFileSync(tempPath)
  fs.writeFileSync(writePath, fileBuffer)
  fs.rmSync(tempPath)
  if(fs.existsSync(writePath)){
    res.status = 200
    return res.json({
      Status: 200,
      Message: "Finished written file",
      Content: {
        fileName: fileName,
        fileType: req.file.mimetype,
        size: req.file.size,
        path: `/file/${id}/${fileName}`
      }
    })
  }
}
const fs = require('fs')
const path = require("path")
module.exports = async(req, res) => {
    const id = req.params.id
    const fileName = req.params.filename
    const filePath = path.resolve(__dirname + `/../../data/${id}/${fileName}`)
    if(!fs.existsSync(filePath)){
        res.status = 404
        return res.json({
            Status: 404,
            Message: "id or filename invalid"
        })
    }
    res.status = 200
    return res.sendFile(filePath)
}
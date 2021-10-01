const fs = require('fs')
const path = require("path")
module.exports = () => {
    const tempPath = path.resolve(__dirname + "/../data/temp")
    const templist = fs.readdirSync(tempPath)
    templist.forEach(fileName => {
        const filePath = path.resolve(__dirname + `/../data/temp/${fileName}`)
        fs.rmSync(filePath)
    })
}
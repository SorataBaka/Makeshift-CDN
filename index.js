const express = require('express');
const morgan = require('morgan');
const compression = require("compression")
const bodyParser = require("body-parser")
const fs = require("fs")
require("dotenv").config()

const app = new express();
//check if required env's are available
if(!process.env["URI"] && !process.env['PORT']){
    console.log("Please provide a mongoDB URI and running PORT")
    process.exit(-1)
}


const router = require("./src/router.js")
const clearTemp = require("./utils/clearTemp.js")
const clearDatabase = require("./utils/cleanDatabase.js")

app.use(express.json())
app.use(compression())
app.use(bodyParser.raw())
app.use(morgan("dev"))
app.use("/", router)

app.all('/', (req, res) => {
    return res.json({
        Status: 200,
        Message: "Welcome to the the Makeshift CDN. A homemade CDN to provide content hosting for your private needs"
    })
})
const connectMongoose = require("./utils/mongooseconnect.js")

if(!fs.existsSync("./data") || !fs.existsSync("./data/temp")){
    fs.mkdir("./data/temp")
}
if(!fs.existsSync("./restrictedFile.json")){
    console.log("No file restriction JSON provided. Aborting startup.")
    process.exit(-1)
}

const PORT = process.env["PORT"] || 3000
app.listen(PORT, async() =>{
    console.log(`Application is now listening on port ${PORT}`)
    await connectMongoose()
})

setInterval(() => {
    clearTemp()
    clearDatabase()
    return console.log("Cleared cache")
}, 6000000)
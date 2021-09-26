const express = require('express');
const morgan = require('morgan');
require("dotenv").config()
const app = new express();

const router = require("./src/router.js")

app.use(express.json())
app.use(morgan("dev"))
app.use("/", router)


app.all('/', (req, res) => {
    return res.json({
        Status: 200,
        Message: "Welcome to the the Makeshift CDN. A homemade CDN to provide content hosting for your private needs"
    })
})
const connectMongoose = require("./utils/mongooseconnect.js")

const PORT = process.env.PORT || 3000
app.listen(PORT, async() =>{
    console.log(`Application is now listening on port ${PORT}`)
    await connectMongoose()
})
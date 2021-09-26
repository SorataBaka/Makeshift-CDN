const mongoose = require('mongoose')
const userData = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    }
},{
    timestamp: true
})


module.exports = mongoose.model("userdata", userData)

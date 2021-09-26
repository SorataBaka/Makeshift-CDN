const mongoose = require('mongoose');
module.exports = async() => {
    const URI = process.env['URI']
    mongoose.connect(URI).then((data, error) => {
        if(error){
            console.log("Failed to connect to MongoDB Database")
            console.log(error)
            return process.exit(1)
        }
        console.log("Successfully establised connection with MongoDB Database")
        return data
    }) 
}
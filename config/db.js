const mongoose = require("mongoose")

async function connectDB() {
    try {
        await mongoose.connect("mongodb://localhost:27017/task")
        console.log("DataBase succesfully connected")
    } catch (error) {
        console.log(`DataBase connection error: ${error}`)
        process.exit(1)
    }
}

module.exports = connectDB
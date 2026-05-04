const mongoose = require("mongoose")

const authSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    },
    quantity: Number,
    totalPrice: Number,
})

module.exports = mongoose.model("Order", authSchema)
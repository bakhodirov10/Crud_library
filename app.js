const mongoose = require("mongoose")
const connectDB = require("./config/db")
const express = require("express")
const orderRouter = require("./routes/order.routes")
const bookRouter = require("./routes/book.routes")
const userRouter = require("./routes/auth.routes")

const Port = 5555

const app = express()

app.use(express.json())

connectDB()

app.use("/api", orderRouter)
app.use("/api", bookRouter)
app.use("/api/auth", userRouter)

app.listen(Port, () =>{
    console.log(`Server is listen on ${Port}`)
})
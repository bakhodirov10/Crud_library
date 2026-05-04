const Order = require("../models/order.model")
const orderSchema = require("../validators/order.validator")

exports.getOrder = async (_req ,res) =>{
    try {
        const orders = await Order.find()
        .populate("User")
        .populate("Book")
        res.json(orders)
    } catch (error) {
        res.status(500).json({
            message: `Error is on getOrder: ${error.message}`
        })
    }
}

exports.createOrder = async (req, res)=>{
    try {
        const {userId, bookId, quantity, totalPrice} = req.body

        const validation = orderSchema.safeParse(req.body)

        if(!validation.success){
            return res.status(400).json({
                message: validation.error.errors
            })
        }

        if(!userId || !bookId || !quantity || !totalPrice){
            res.status(400).json({
                message: `All fiels are required : ${error.message}`
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `Error is on createOrder: ${error.message}`
        })
    }
}
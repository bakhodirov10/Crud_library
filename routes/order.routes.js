const express = require("express")
const router = express.Router()
const orderController = require("../controllers/order.controller")

router.get(
    "/order",
    orderController.getOrder
)

router.post(
    "/order",
    orderController.createOrder
)

module.exports = router
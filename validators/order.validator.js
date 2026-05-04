const { z } = require("zod")

const orderSchema = z.object({
    userId: z.string().min(4),
    bookId: z.string().min(4),
    quantity: z.number().positive(),
    totalPlice: z.number().positive()
})

module.exports = orderSchema
const { z } = require("zod")

const bookSchema = z.object({
    title: z.string().min(3),
    author: z.string().min(4),
    description: z.string().trim(),
    price: z.number().positive(),
    stock: z.number().positive(),
    category: z.string().min(3).max(15)
})

module.exports = bookSchema
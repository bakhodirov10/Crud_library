const { z } = require("zod")

const authSchema = z.object({
    fullname: z.string().min(3),
    email: z.string().trim().lowercase(),
    password: z.string().trim().min(8),
})

module.exports = authSchema
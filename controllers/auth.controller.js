const User = require("../models/user.model")
const authSchema = require("../validators/auth.validator")
const bcrypt = require("bcrypt")

exports.loginUser = async (req,res) =>{
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({
                message: "User not found with this email"
            })
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash)

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid password"
            })
        }

        res.status(200).json({
            message: "Successfully Logined"
        })
    } catch (error) {
        res.status(500).json({
            message: `Error is on loginUser: ${error.message}`
        })
    }
}

exports.registerUser = async (req, res) =>{
    try {
        const validation = authSchema.safeParse(req.body)

        if(!validation.success){
            return res.status(400).json({
                message: validation.error.errors
            })
        }
        const { fullname , email , password } = req.body
        
        const exitingEmail = await User.findOne({email})

        if(exitingEmail){
            return res.status(409).json({
                message: "This email is Busy"
            })
        }

        hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            fullname,
            email,
            password: hashedPassword
        })

        await newUser.save()

        res.status(201).json({
            message: "User is successfully created",
            user: {fullname, email, hashedPassword}
        })
    } catch (error) {
        res.status(500).json({
            message: `Error is on registerUser ${error.message}`
        })
    }
}
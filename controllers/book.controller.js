const Book = require("../models/book.model")
const bookSchema = require("../validators/book.validator")

exports.getBook = async (_req, res) =>{
    try {
        const books = await Book.find()
        res.json(books)
    } catch (error) {
        res.status(500).json({
            message: `Error is on getBook: ${error.message}`
        })
    }
}

exports.createBook = async (req, res) =>{
    try {
        
        const validation = bookSchema.safeParse(req.body);

        if(!validation.success) {
            return res.status(400).json({
                message: validation.error.errors
            })
        }

        const { title , author , description , price , stock , category} = req.body

        const newBook = new Book({
            title,
            author,
            description,
            price,
            stock,
            category
        })

        await newBook.save()

        res.status(201).json(newBook)
    } catch (error) {
        res.status(500).json({
            message: `Error is on createBook: ${error.message}`
        })
    }
}

exports.getBookById = async (req, res) =>{
    try {
        const book = await Book.findById(req.params.id)
        if(!book){
            req.status(404).json({
                message: "Book is no found"
            })
        }
        res.status(200).json(book)
    } catch (error) {
        res.status(500).json({
            message: `Error is on getBookById: ${error.message} `
        })
    }
}

exports.updateBook = async (req, res) =>{
    try {
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        )
        if(!book){
            req.status(404).json({
                message: "Book is no found"
            })
        }
        res.status(200).json(book)
    } catch (error) {
        res.status(500).json({
            message: `Error is on updateBook: ${error.message}`
        })
    }
}

exports.deleteBook = async (req, res) =>{
    try {
        const book = await Book.findByIdAndDelete(req.params.id)
        if(!book){
            req.status(404).json({
                message: "Book is no found"
            })
        }
        res.status(200).json({
            message: "Book is deleted"
        })
    } catch (error) {
        res.status(500).json({
            message: `Error is on deleteBook: ${error.message}`
        })
    }
}
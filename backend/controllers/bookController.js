const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const Book = require("../models/bookModel");
const { addDTO, updateDTO } = require("../dto/book");

const requestValidator = require("../utils/request-validator");

// Add book 

exports.addBook = catchAsyncErrors(async (req, res, next) => {
    const errors = requestValidator(addDTO, req.body);

    if (errors) {
        return next(new ErrorHandler(errors, 403));
    };

    req.body.balance = req.body.stock

    const book = await Book.create({ ...req.body });

    res.status(201).json({
        success: true,
        book
    })

})

// get Single Order
exports.getSingleBook = catchAsyncErrors(async (req, res, next) => {

    const book = await Book.findById(req.params.id)

    if (!book) {
        return next(new ErrorHandler("Book not found with this Id", 404));
    }

    res.status(200).json({
        success: true,
        book,
    });
});

// update Book
exports.updateBook = catchAsyncErrors(async (req, res, next) => {
    const errors = requestValidator(updateDTO, req.body);

    if (errors) {
        return next(new ErrorHandler(errors, 403));
    };

    const book = await Book.findByIdAndUpdate(req.params.id, { ...req.body }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        book
    })
})
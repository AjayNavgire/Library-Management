const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const Book = require("../models/bookModel");
const { addDTO, updateDTO } = require("../dto/book");
const ApiFeatures = require("../utils/apifeatures");
// const redisClient = require('../config/redisClient');
const requestValidator = require("../utils/request-validator");

// Add book 
exports.addBook = catchAsyncErrors(async (req, res, next) => {
    const errors = requestValidator(addDTO, req.body);

    if (errors) {
        return next(new ErrorHandler(errors, 403));
    };

    req.body.balance = req.body.stock

    const duplicateBook = await Book.find({ title: req.body.title });

    if (duplicateBook.length > 0) {
        return next(new ErrorHandler("Book is already available in Library. Please update stock", 404));
    }

    const book = await Book.create({ ...req.body });

    res.status(201).json({
        success: true,
        book
    })

})

// get Single Book
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

// get All Book
exports.getAllBook = catchAsyncErrors(async (req, res, next) => {

    const resultPerPage = req.query.limit || 5;
    const bookCount = await Book.countDocuments();

    const apifeatures = new ApiFeatures(Book.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);

    const book = await apifeatures.query;

    res.status(200).json({
        success: true,
        book,
        bookCount
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

// delete Book
exports.deleteBook = catchAsyncErrors(async (req, res, next) => {
    const book = await Book.findById(req.params.id)

    if (!book) {
        return next(new ErrorHandler("Book not found", 404));
    }

    await book.remove();

    res.status(200).json({
        success: true,
        messesage: "Book Deleted Successfully"

    });
})
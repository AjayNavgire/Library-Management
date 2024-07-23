const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const Issue = require("../models/issue");
const Book = require("../models/bookModel");
const { addDTO } = require("../dto/issue");
const requestValidator = require("../utils/request-validator");

// Issue Book
exports.issueBook = catchAsyncErrors(async (req, res, next) => {

    const errors = requestValidator(addDTO, req.body);

    if (errors) {
        return next(new ErrorHandler(errors, 403));
    };

    const book = await Book.findById(req.body.book_info.id);

    if(!book || (book && book.stock <= 0) ){
        return next(new ErrorHandler("Book is not found", 200));
    }
    book.stock = book.stock -1;
    book.save()
    console.log(book)

    // const issue = await Issue.create({ ...req.body });

    res.status(201).json({
        success: true,
        message: "Book Issued Successfully",
        issue
    })

})

// Renew Issue Book
exports.renewBook = catchAsyncErrors(async (req, res, next) => {

    const errors = requestValidator(addDTO, req.body);

    if (errors) {
        return next(new ErrorHandler(errors, 403));
    };

    
    const issue = await Issue.create({ ...req.body });

    res.status(201).json({
        success: true,
        message: "Book Issued Successfully",
        issue
    })

})

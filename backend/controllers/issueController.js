const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const Issue = require("../models/issue");
const Book = require("../models/bookModel");
const { addDTO, renewDTO, returnDTO, fineDTO } = require("../dto/issue");
const requestValidator = require("../utils/request-validator");
const ApiFeatures = require("../utils/apifeatures");
const moment = require('moment');

// Issue Book
exports.issueBook = catchAsyncErrors(async (req, res, next) => {

    const errors = requestValidator(addDTO, req.body);

    if (errors) {
        return next(new ErrorHandler(errors, 403));
    };

    const book = await Book.findById(req.body.book_info.id);

    if (!book || (book && book.balance <= 0)) {
        return next(new ErrorHandler("Book is not available", 200));
    }
    book.balance = book.balance - 1;
    book.save();

    const issue = await Issue.create({ ...req.body });

    res.status(201).json({
        success: true,
        message: "Book Issued Successfully",
        issue
    })

})

// Get All Issued Book
exports.getAllIssuedBook = catchAsyncErrors(async (req, res, next) => {
    const resultPerPage = req.query.limit || 5;
    const IssedBookCount = await Issue.countDocuments();

    const apifeatures = new ApiFeatures(Issue.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);

    const IssedBook = await apifeatures.query;

    res.status(200).json({
        success: true,
        IssedBook,
        IssedBookCount
    });
})


// Take a fine 
exports.bookFine = catchAsyncErrors(async (req, res, next)=>{

    const errors = requestValidator(fineDTO, req.body);

    if (errors) {
        return next(new ErrorHandler(errors, 403));
    };

    const bookFine = await Issue.findById(req.params.id);
   
    if(req.body && req.body.book_info.isRenewed)
    bookFine.book_info.isRenewed = req.body.book_info.isRenewed;

    if(req.body && req.body.book_info.isReturned)
        bookFine.book_info.isReturned = req.body.book_info.isReturned;

    bookFine.book_info.returnDate = Date.now() + 1 * 24 * 60 * 60 * 1000;
    bookFine.save();

    res.status(201).json({
        success: true,
        message: "Book Fine submitted Successfully",
        bookFine
    })
})
// Renew Issue Book
exports.renewBook = catchAsyncErrors(async (req, res, next) => {

    const errors = requestValidator(renewDTO, req.body);

    if (errors) {
        return next(new ErrorHandler(errors, 403));
    };

    const renewBook = await Issue.findById(req.params.id);

    const parsedDate = moment(renewBook.book_info.returnDate, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    const date = moment()
    const returnDate = parsedDate.format('ddd MMM DD YYYY');
    const todayDate = date.format('ddd MMM DD YYYY');

    if (renewBook && returnDate < todayDate) {
        return next(new ErrorHandler(`Book is overdued from date : ${returnDate}`, 200));
    }

    renewBook.book_info.isRenewed = req.body.book_info.isRenewed;
    renewBook.book_info.returnDate = Date.now() + 7 * 24 * 60 * 60 * 1000;
    renewBook.save();

    res.status(201).json({
        success: true,
        message: "Book Renewed Successfully",
        renewBook
    })

});

// return book
exports.returnwBook = catchAsyncErrors(async (req, res, next) => {

    const errors = requestValidator(returnDTO, req.body);

    if (errors) {
        return next(new ErrorHandler(errors, 403));
    };

    const returnBook = await Issue.findById(req.params.id);

    const parsedDate = moment(returnBook.book_info.returnDate, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    const date = moment()
    const returnDate = parsedDate.format('ddd MMM DD YYYY');
    const todayDate = date.format('ddd MMM DD YYYY');

    if (returnBook && returnDate < todayDate) {
        return next(new ErrorHandler(`Book is overdued from date : ${returnDate}`, 200));
    };
    returnBook.book_info.isReturned = req.body.book_info.isReturned;
    returnBook.save();

    const book = await Book.findById(returnBook.book_info.id);
    if (book.balance < book.stock) {
        book.balance = book.balance + 1;
        book.save();
    }

    res.status(201).json({
        success: true,
        message: "Book Returned Successfully",
        returnBook
    })

});
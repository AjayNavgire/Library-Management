const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const { userRegisterDTO, userUpdateDTO, emailLoginDTO } = require("../dto/user");
const requestValidator = require("../utils/request-validator");
const mongoose = require('mongoose');

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const errors = requestValidator(userRegisterDTO, req.body);

    if (errors) {
        return next(new ErrorHandler(errors, 403));
    };

    const user = await User.create({ ...req.body });

    res.status(201).json({
        success: true,
        message: "User Registered Successfully",
        user
    })

})

// Login User With Email
exports.login = catchAsyncErrors(async (req, res, next) => {
    const errors = requestValidator(emailLoginDTO, req.body);

    if (errors) {
        return next(new ErrorHandler(errors, 403));
    };

    const { email, password } = req.body;

    // Checking if user has given password and email both
    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401))
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401))
    }
    sendToken(user, 200, res)
})



// Get single user
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user
    })
});

// Get all user
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {

    const userRole = req.user.role;
    const _id = req.user.id;
    let { role } = req.query;
    let query = {}

   
    const user = await User.find(query);

    if (!user) {
        return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user
    })
})

// Update User
exports.updateUser = catchAsyncErrors(async (req, res, next) => {

    const errors = requestValidator(userUpdateDTO, req.body);

    if (errors) {
        return next(new ErrorHandler(errors, 403));
    };

    const user = await User.findByIdAndUpdate(req.params.id, { ...req.body }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        user
    })
})

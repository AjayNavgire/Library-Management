const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please Enter Book Title"],
        maxLength: [30, "Title cannot exceed 30 characters"],
        minLength: [4, "Title should have more than 4 characters"]
    },
    stock: { type: Number },
    balance: { type: Number},
    author: {
        type: String,
        required: [true, "Please Enter Book Author"],
        maxLength: [30, "Author cannot exceed 30 characters"],
        minLength: [4, "Author should have more than 4 characters"]
    },
    genres: {
        type: String,
        required: [true, "Please Enter Book Genres"],
        maxLength: [30, "Genres cannot exceed 30 characters"],
        minLength: [4, "Genres should have more than 4 characters"]
    },
    publishedDate: {
        type: Date,
        required: [true, "Please Enter Book Published Date"],
    }
});

module.exports = mongoose.model('Book', bookSchema);
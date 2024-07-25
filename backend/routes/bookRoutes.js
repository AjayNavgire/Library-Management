const express = require("express");
const { addBook, getSingleBook, updateBook, getAllBook } = require("../controllers/bookController");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");
const roles = ["Admin"]

const router = express.Router();

router.route("/addBook").post(isAuthenticatedUser, authorizedRoles(...roles), addBook);
router.route("/getAllBooks").get(isAuthenticatedUser, authorizedRoles(...roles),getAllBook)
router.route("/book/:id")
    .get(isAuthenticatedUser, getSingleBook)
    .put(isAuthenticatedUser, authorizedRoles(...roles), updateBook);

module.exports = router;
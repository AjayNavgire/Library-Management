const express = require("express");
const { addBook, getSingleBook, updateBook } = require("../controllers/bookController");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");
const roles = ["Admin"]

const router = express.Router();

router.route("/addBook").post(isAuthenticatedUser, authorizedRoles(...roles), addBook);
router.route("/book/:id")
    .get(isAuthenticatedUser, getSingleBook)
    .put(isAuthenticatedUser, authorizedRoles(...roles), updateBook);

module.exports = router;
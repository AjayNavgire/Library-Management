const express = require("express");
const { 
    issueBook,
    renewBook,
    getAllIssuedBook,
    bookFine,
    returnBook
} = require("../controllers/issueController");
const {isAuthenticatedUser, authorizedRoles} = require("../middleware/auth");
const roles = ["Admin"];

const router = express.Router();

router.route("/issueBook").post(isAuthenticatedUser, authorizedRoles(...roles), issueBook);
router.route("/renewBook/:id").put(isAuthenticatedUser, authorizedRoles(...roles), renewBook);
router.route("/returnBook/:id").put(isAuthenticatedUser, authorizedRoles(...roles), returnBook);
router.route("/bookFine/:id").put(isAuthenticatedUser, authorizedRoles(...roles), bookFine);
router.route("/getAllIssuedBooks").get(isAuthenticatedUser, authorizedRoles(...roles),getAllIssuedBook)

module.exports = router;
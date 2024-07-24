const express = require("express");
const { 
    issueBook,
    renewBook,
    returnwBook
} = require("../controllers/issueController");
const {isAuthenticatedUser, authorizedRoles} = require("../middleware/auth");
const roles = ["Admin"];

const router = express.Router();

router.route("/issueBook").post(isAuthenticatedUser, authorizedRoles(...roles), issueBook);
router.route("/renewBook/:id")
.put(isAuthenticatedUser, authorizedRoles(...roles), renewBook);

router.route("/returnBook/:id")
.put(isAuthenticatedUser, authorizedRoles(...roles), returnwBook);


module.exports = router;
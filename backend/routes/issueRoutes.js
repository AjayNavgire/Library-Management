const express = require("express");
const { 
    issueBook
} = require("../controllers/issueController");
const {isAuthenticatedUser, authorizedRoles} = require("../middleware/auth");
const roles = ["Admin"];

const router = express.Router();


router.route("/issueBook").post(isAuthenticatedUser, authorizedRoles(...roles), issueBook);

module.exports = router;
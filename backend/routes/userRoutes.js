const express = require("express");
const { 
    registerUser,
    login,
    getSingleUser,
    updateUser,
    getAllUser
} = require("../controllers/userController");
const {isAuthenticatedUser, authorizedRoles} = require("../middleware/auth");
const roles = ["admin"]

const router = express.Router();

// router.route("/register").post(isAuthenticatedUser, authorizedRoles(...roles),registerUser);
router.route("/register").post(registerUser);

router.route("/login").post(login);

router.route("/users").get(isAuthenticatedUser, authorizedRoles(...roles), getAllUser);

router
.route("/user/:id")
.get(isAuthenticatedUser, getSingleUser)
.put(isAuthenticatedUser, authorizedRoles(...roles), updateUser)

module.exports = router;
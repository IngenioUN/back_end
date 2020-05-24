const { Router } = require("express");
const passport = require('passport');
const router = Router();

const {
    signup,
    signin,
    signout
} = require("../controllers/user.controller");

router
    .route("/signin")
    .post(signin);

router
    .route("/signup")
    .post(signup);

const { isAuthenticated } = require("../helpers/authenticated");

router
    .route("/signout")
    .get(isAuthenticated, signout);

module.exports = router;
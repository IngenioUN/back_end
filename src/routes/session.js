const { Router } = require("express");
const passport = require('passport');
const router = Router();
<<<<<<< HEAD
=======
const User = require('../models/User');
>>>>>>> d0cfdc701346ced124a737ec1c46b42892caee71

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

router
    .route("/signout")
    .get(signout);

module.exports = router;
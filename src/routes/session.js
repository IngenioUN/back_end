const { Router } = require("express");
const passport = require('passport');
const router = Router();
const {
    signup,
    signin,
    signout
} = require("../controllers/users.controller");

router
    .route("/signin")
    .post(signin,function(req, res){
        const temp = res.req.authInfo;
        return res.status(temp.status).json({message: temp.message});
    });

router
    .route("/signup")
    .post(signup, function(req, res){
        const temp = res.req.authInfo;
        return res.status(temp.status).json({message: temp.message});
    });

router
    .route("/signout")
    .get(signout);
module.exports = router;
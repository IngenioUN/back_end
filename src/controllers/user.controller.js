const User = require('../models/User');
const passport = require('passport');

const usersCtrl = {};

usersCtrl.signup = function(req, res, next) {
    passport.authenticate("local-signup", function(err, user, info) {
        if(user) {
            req.logIn(user, function(err) {
                if(err) return next(err);
            })
        }
        return res.status(info.status).json({ message: info.message });
    })(req, res, next);
}

usersCtrl.signin = function(req, res, next) {
    passport.authenticate("local-signin", function(err, user, info) {
        if(user) {
            req.logIn(user, function(err) {
                if(err) return next(err);
            })
        }
        return res.status(info.status).json({ message: info.message });
    })(req, res, next);
}

usersCtrl.signout = (req, res) => {
    req.logout();
    return res.status(200).json({message: "Bye"});
}

// Valeria

// Carlos

// Juan

// Tatiana

// Any type of user can access this information
usersCtrl.getPersonalData = async (req, res) => {
    try{
        var user;
        if(req.body.id)
            user = await User.findById(req.body.id);
        else
            user = await User.findById(req.user.id);
        const { firstName, lastName, email1, description, role } = user;
        return res.status(200).json({
            firstName, lastName, email1, description, role
        });
    }catch(err){
        return res.status(400).json({
            message: "The user is not registered on the platform"
        });
    }
}

module.exports = usersCtrl;
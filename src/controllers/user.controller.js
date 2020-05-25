const User = require('../models/User');
const AuthorRequest = require('../models/AuthorRequest');
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

usersCtrl.addAuthor = async (req, res) => {
    try {
        if (req.user.role != 2)
            return res.status(401).json({
                message: "You do not have the required permissions"
            });
        const { userId } = req.body;
        if (!userId)
            throw "Incomplete data";
        const request = await AuthorRequest.findOne({ userId: userId });
        if (!request)
            throw "No exist request";
        // Opción 1  
        //await User.findByIdAndUpdate(userId, request); // req.body.id doesn't work
        // Opción 2
        var user = await User.findById(userId) ;
        if (!user)
            throw "no exits";
        //console.log(user);
        user.role = 1;
        user.email2 = request.email2;
        user.professionalCard = request.professionalCard;
        user.employementHistory = request.employementHistory;
        user.academicHistory = request.academicHistory;
        await User.findByIdAndUpdate(userId, user); // req.body.id
        
        return res.status(200).json({
            message: "The operation was successful"
        });
    } catch (err) {
        if (!err.message)
            return res.status(400).json({ message: err });
        else
            return res.status(400).json({
                message: err.message
            });
    }  
};
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
const express = require('express');
const User = require('../models/User');
const passport = require('passport');
const localStrategy = require('passport-local');
const router = express.Router();    // router - object to define routes

const usersCtrl = {};

passport.use(new localStrategy({
    usernameField: 'email1'
}, async (email1, password, done) => {
    const user = User.findOne({ email1: email1 });
    if(!user){
        return done(null, false, { message: "Not user found." });
    }else{
        var match = true;
        //const match = await User.matchPassword(password);
        if(match){
            return done(nul, user);
        }else{
            return done(null, false, "Incorrect password");
        }
    }
}));

passport.serializeUser((user, dode) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
})

usersCtrl.createUser = async (req, res) => {
    try{
        const {email1, email2, password, confirmPassword} = req.body;
        const emailUser = await User.findOne({ email1: email1 });

        if(emailUser) throw "The email is already in use";
        if(password.toString().length < 3) throw "The password must be at least 3 characters";
        if(password != confirmPassword) throw "Password do not match";

        const user = new User(req.body);
        //user.password =  user.encryptPassword(password);
        await user.save();

        return res.status(201).json({ message: "Registered user"});
    }catch(err){
        console.log(err);
        if(err.name == 'ValidationError') {err = "Incomplete data";}
        return res.status(400).json({message: err});
    }
};

usersCtrl.updateUser = async (req, res) => {
    try{
        await User.findByIdAndUpdate(req.params.id, req.body);
        return res.status(200).json({
            message: "Updated User"
        })
    }catch(err){
        return res.status(400).json({
            message: "Incomplete or poorly structured data",
            err
        })
    }
};

usersCtrl.deleteUser = async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message: "User Deleted"
        })
    }catch(err){
        return res.status(400).json({
            message: "User not found",
            err
        })
    }
};

usersCtrl.getUser = async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        console.log(user);
        return res.status(200).json(user)
    }catch(err){
        return res.status().json({
            message: "User not found",
            err
        })
    }
};

usersCtrl.getUsers = async (req, res) => {
    try{
        const users = await User.find();
        return res.status(200).json(users);
    }catch(err){
        return res.status(400).json({
            message: "Bad request"
        })
    }
};

module.exports = usersCtrl;
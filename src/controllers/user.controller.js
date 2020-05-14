const express = require('express');
const User = require('../models/User');
const passport = require('passport');

const usersCtrl = {};

usersCtrl.signin = passport.authenticate("local-signin");

usersCtrl.signout = (req, res) => {
    req.logout();
    return res.status(200).json({message: "Bye"});
}

usersCtrl.signup = function(req, res) {
    passport.authenticate("local-signup", function(req, aux, done) {
        return res.status(done.status).json({ message: done.message });
    })(req, res);
}


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

/*
usersCtrl.signinUser
*/

module.exports = usersCtrl;
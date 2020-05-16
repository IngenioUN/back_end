const express = require('express');
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

usersCtrl.updateUser = async (req, res) => {
    try{
        console.log(req.params.id);
        console.log(req.body);
        console.log(req.user);
        await User.findByIdAndUpdate(req.params.id, req.body); // req.body.id
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
        // req.body -> JSON
        // req.params.id -> URL
        // req.user -> Usuario logueado
        // if(req.user.type != 2) throw "No autorizado";

        const type = 2;
        if(type != 2) throw "No tiene permisos";
        var user;
        if(req.params.id) // req.body.id
            user = await User.findById(req.params.id);
        else
            user = await User.findById(req.user.id);
        const { firstName, lastName } = user;
        return res.status(200).json({
            firstName, lastName
        })
    }catch(err){
        if(!err.message) return res.status(400).json({ message: err });
        else return res.status(400).json({ message: "User not found" });
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
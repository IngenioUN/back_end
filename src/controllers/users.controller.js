const express = require('express');
const User = require('../models/User');
const router = express.Router();    // router - object to define routes

const usersCtrl = {};

usersCtrl.createUser = async (req, res) => {
    try{
        const user = new User(req.body);
        await user.save();
        return res.status(201).json({
            message: "Registered User"
        })
    }catch(err){
        return res.status(400).json({
            message: "Incomplete or poorly structured data",
            err
        })
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
const express = require('express');
const User = require('../models/User');
const router = express.Router();    // router - object to define routes

const usersCtrl = {};

usersCtrl.createUser = async (req, res) => {
    const user = new User(req.body);
    await user.save();
    console.log(user);
    res.json({message: "User saved"});
};

usersCtrl.updateUser = async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.json({message: "User Updated"});
};

usersCtrl.deleteUser = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    res.json({message: "User deleted", user});
};

usersCtrl.getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    console.log(user);
    res.json({user});
};

usersCtrl.getUsers = async (req, res) => {
    const users = await User.find();
    console.log('continue');
    res.json(users);
};

module.exports = usersCtrl;
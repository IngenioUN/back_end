const express = require('express');
const User = require('../models/User');
const router = express.Router();    // router - object to define routes

const usersCtrl = {};

usersCtrl.createUser = async (req, res) => {
    const {
        title,
        description
    } = req.body;
    console.log('Entra');
    const newUser = new User({
        title,
        description
    });
    await newUser.save();
    console.log(newUser);
    res.json({message: "User saved"});
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
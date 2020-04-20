const express = require('express');
const Admin = require('../models/Admin');
const router = express.Router();    // router - object to define routes

const adminsCtrl = {};

adminsCtrl.createAdmin = async (req, res) => {
    const admin = new Admin(req.body);
    await admin.save();
    console.log(admin);
    res.json({message: "Admin saved"});
};

adminsCtrl.updateAdmin = async (req, res) => {
    await Admin.findByIdAndUpdate(req.params.id, req.body);
    res.json({message: "Admin Updated"});
};

adminsCtrl.deleteAdmin = async (req, res) => {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    res.json({message: "Admin deleted", admin});
};

adminsCtrl.getAdmin = async (req, res) => {
    const admin = await Admin.findById(req.params.id);
    console.log(admin);
    res.json({admin});
};

adminsCtrl.getAdmins = async (req, res) => {
    const admins = await Admin.find();
    console.log('continue');
    res.json(admins);
};

module.exports = adminsCtrl;
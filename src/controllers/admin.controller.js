const express = require('express');
const Admin = require('../models/Admin');
const router = express.Router();    // router - object to define routes

const adminsCtrl = {};

adminsCtrl.createAdmin = async (req, res) => {
    try{
        const admin = new Admin(req.body);
        await admin.save();
        console.log(admin);
        return res.status(201).json({
            message: "Registered Administrator"
        })
    }catch(err){
        return res.status(400).json({
            message: "Incomplete or poorly structured data",
            err
        })
    }
};

adminsCtrl.updateAdmin = async (req, res) => {
    try{
        await Admin.findByIdAndUpdate(req.params.id, req.body);
        return res.status(200).json({
            message: "Administrator Updated"
        })
    }catch(err){
        return res.status(400).json({
            message: "Incomplete or poorly structured data",
            err
        })
    }
};

adminsCtrl.deleteAdmin = async (req, res) => {
    try{
        const admin = await Admin.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message: "Administrator Deleted"
        })
    }catch(err){
        return res.status(400).json({
            message: "Administrator not found",
            err
        })
    }
};

adminsCtrl.getAdmin = async (req, res) => {
    try{
        const admin = await Admin.findById(req.params.id);
        return res.status(200).json(admin)
    }catch(err){
        return res.status(400).json({
            message: "Administrator not found",
            err
        })
    }
};

adminsCtrl.getAdmins = async (req, res) => {
    try{
        const admins = await Admin.find();
        return res.status(200).json(admins)
    }catch(err){
        return res.status(400).json({
            message: "Bad request"
        })
    }
};

module.exports = adminsCtrl;
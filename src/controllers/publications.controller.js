const express = require('express');
const Publication = require('../models/Publication');
const router = express.Router();    // router - object to define routes

const publicationsCtrl = {};

publicationsCtrl.createPublication = async (req, res) => {
    try{
        const publication = new Publication(req.body);
        await publication.save();
        return res.status(201).json({
            message: "Registered Publication"
        })
    }catch(err){
        return res.status(400).json({
            message: "Incomplete or poorly structured data",
            err
        })
    }
};

publicationsCtrl.updatePublication = async (req, res) => {
    try{
        await Publication.findByIdAndUpdate(req.params.id, req.body);
        return res.status(200).json({
            message: "Updated Publication"
        })
    }catch(err){
        return res.status(400).json({
            message: "Incomplete or poorly structured data",
            err
        })
    }
};

publicationsCtrl.deletePublication = async (req, res) => {
    try{
        const publication = await Publication.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message: "Publication Deleted"
        })
    }catch(err){
        return res.status(400).json({
            message: "User not found"            
        })
    }
};

publicationsCtrl.getPublication = async (req, res) => {
    try{
        const publication = await Publication.findById(req.params.id);
        return res.status().json(publication)
    }catch(err){
        return res.status().json({
            message: "User not found",
            err
        })
    }
};

publicationsCtrl.getPublications = async (req, res) => {
    try{
        const publications = await Publication.find();
        return res.status(200).json(publications)
    }catch(err){
        return res.status().json({
            message: "Bad request"
        })
    }
};

module.exports = publicationsCtrl;
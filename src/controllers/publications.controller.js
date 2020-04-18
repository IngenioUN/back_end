const express = require('express');
const Publication = require('../models/Publication');
const router = express.Router();    // router - object to define routes

const publicationsCtrl = {};

publicationsCtrl.createPublication = async (req, res) => {
    const publication = new Publication(req.body);
    await publication.save();
    console.log(publication);
    res.json({message: "Publication saved"});
};

publicationsCtrl.updatePublication = async (req, res) => {
    await Publication.findByIdAndUpdate(req.params.id, req.body);
    res.json({message: "Publication Updated"});
};

publicationsCtrl.deletePublication = async (req, res) => {
    const publication = await Publication.findByIdAndDelete(req.params.id);
    res.json({message: "Publication deleted", publication});
};

publicationsCtrl.getPublication = async (req, res) => {
    const publication = await Publication.findById(req.params.id);
    console.log(publication);
    res.json({publication});
};

publicationsCtrl.getPublications = async (req, res) => {
    const publications = await Publication.find();
    console.log('continue');
    res.json(publications);
};

module.exports = publicationsCtrl;
const { Router } = require("express");
const router = Router();

const {
    createPublication,
    updatePublication,
    deletePublication,
    getPublications,
    getPublication
} = require("../controllers/publications.controller");

//routes

module.exports = router;
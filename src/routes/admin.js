const { Router } = require("express");
const router = Router();

const {
    createAdmin,
    updateAdmin,
    deleteAdmin,
    getAdmins,
    getAdmin
} = require("../controllers/admin.controller");

//routes

module.exports = router;
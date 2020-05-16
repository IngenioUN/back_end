const { Router } = require("express");
const router = Router();

const {
    updateUser,
    deleteUser,
    getUsers,
    getUser
} = require("../controllers/user.controller");

router
    .route("/todos")
    .get(getUsers);


const { isAuthenticated } = require("../helpers/authenticated");

router
    .route("/profile")
    .get(isAuthenticated, getUser);

router
    .route("/:id")
    .get(isAuthenticated ,getUser)
    .put(isAuthenticated, updateUser)
    .delete(isAuthenticated, deleteUser);
module.exports = router;
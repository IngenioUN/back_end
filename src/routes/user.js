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


<<<<<<< HEAD
=======
const { isAuthenticated } = require("../helpers/authenticated");

router
    .route("/profile")
    .get(isAuthenticated, getUser);

router
    .route("/:id")
    .get(isAuthenticated ,getUser)
    .put(isAuthenticated, updateUser)
    .delete(isAuthenticated, deleteUser);
>>>>>>> d0cfdc701346ced124a737ec1c46b42892caee71
module.exports = router;
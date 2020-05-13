const { Router } = require("express");
const router = Router();

const {
    updateUser,
    deleteUser,
    getUsers,
    getUser
} = require("../controllers/user.controller");

const { isAuthenticated } = require("../helpers/authenticated");

router
    .route("/profile")
    .get(isAuthenticated, getUsers)
  // .post(createUser);

router
    .route("/:id")
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;
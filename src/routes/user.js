const { Router } = require("express");
const router = Router();
const {
    createUser,
    updateUser,
    deleteUser,
    getUsers,
    getUser
} = require("../controllers/users.controller");
const passport = require('passport');

router
    .route("/signin")
    .post(passport.authenticate('local'));

router
    .route("/")
    .get(getUsers)
    .post(createUser);

router
    .route("/:id")
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

router
    .route("/signup")
    .post(createUser);

module.exports = router;
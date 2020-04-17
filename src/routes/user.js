const { Router } = require("express");
const router = Router();

const {
    createUser,
    deleteUser,
    getUsers,
    getUser
} = require("../controllers/users.controller");

router
    .route("/")
    .get(getUsers)
    .post(createUser);

router
    .route("/:id")
    .get(getUser)
    .delete(deleteUser);

module.exports = router;
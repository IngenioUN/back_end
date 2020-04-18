const { Router } = require("express");
const router = Router();

const {
    createUser,
    updateUser,
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
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;
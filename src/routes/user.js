const { Router } = require("express");
const router = Router();

const {
    updateUser,
    deleteUser,
    getUsers,
    getUser
} = require("../controllers/user.controller");


router
    .route("/")
    .get(getUsers)
  // .post(createUser);

router
    .route("/:id")
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;
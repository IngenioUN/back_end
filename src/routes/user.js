const { Router } = require("express");
const router = Router();

<<<<<<< HEAD
const {
    createUser,
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

router
    .route("/signup")
    .post(createUser);

router
    .route("/signin")
    .post(  )// Entrar y permanecer autentificado

=======
>>>>>>> feature/multiple_session
module.exports = router;
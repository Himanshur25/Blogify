const { Router } = require("express");
const user = require("../models/user");
const {
  handleGetNewUser,
  handleCreateNewUser,
  handleGetUserLogin,
  handleCreateUserLogin,
  handleLogout,
} = require("../controllers/user/userController");
const router = Router();

router.route("/signup").get(handleGetNewUser).post(handleCreateNewUser);
router.route("/login").get(handleGetUserLogin).post(handleCreateUserLogin);
router.get("/logout", handleLogout);

module.exports = router;

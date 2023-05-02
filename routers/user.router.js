const express = require("express");
const router = express.Router();

const {
  userRegisterValidator,
  userRegisterValidatorFn,
  userLoginValidator,
  userLoginValidatorFn,
} = require("../validator/user.validator");
const {
  registerController,
  loginController,
  getAllUserController,
  getUserController,
} = require("../controllers/user.controller");
const { checkHeaders } = require("../validator/middleware");

//Home page
router.get("/", (req, res) => {
  res.send("Server is working fine");
});

//Create User

router.post(
  "/register",
  userRegisterValidator,
  userRegisterValidatorFn,
  registerController
);

//Login User
router.post(
  "/login",
  userLoginValidator,
  userLoginValidatorFn,
  loginController
);

//Get All User
router.get("/all-users", checkHeaders, getAllUserController);

// Get User Detail
router.get("/user", checkHeaders, getUserController);

module.exports = router;

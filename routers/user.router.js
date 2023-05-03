const express = require("express");
const router = express.Router();

const { checkHeaders, ValidatorFn } = require("../validator/middleware");
const {
  userRegisterValidator,
  userLoginValidator,
} = require("../validator/user.validator");
const {
  registerController,
  loginController,
  getAllUserController,
  getUserController,
} = require("../controllers/user.controller");
const {
  createProductController,
  getAllProductController,
  getSingleProductController,
  updateProductController,
  deleteProductController,
  deleteAllProductController,
} = require("../controllers/product.controller");
const { createProductValidator } = require("../validator/product.validator");

//Home page
router.get("/", (req, res) => {
  res.send("Server is working fine");
});

//Create User

router.post(
  "/register",
  userRegisterValidator,
  ValidatorFn,
  registerController
);

//Login User
router.post("/login", userLoginValidator, ValidatorFn, loginController);

//Get All User
router.get("/all-users", checkHeaders, getAllUserController);

// Get User Detail
router.get("/user", checkHeaders, getUserController);

// Create product
router.post(
  "/product",
  checkHeaders,
  createProductValidator,
  ValidatorFn,
  createProductController
);

//Get App product
router.get("/all-product", checkHeaders, getAllProductController);

// Get single Product
router.get("/product/:id", checkHeaders, getSingleProductController);

//Update Product
router.put("/product/:id", checkHeaders, updateProductController);

//Delete Product
router.delete("/product/:id", checkHeaders, deleteProductController);

// Delete All Product
router.delete("/all-product", checkHeaders, deleteAllProductController);

module.exports = router;

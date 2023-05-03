const { body } = require("express-validator");

const createProductValidator = [
  body("name").notEmpty().withMessage("Product Name is required"),
  body("description").notEmpty().withMessage("Product Description is required"),
  body("price")
    .notEmpty()
    .withMessage("Product Price is required")
    .isNumeric()
    .withMessage("Must be a number"),
];

module.exports = { createProductValidator };

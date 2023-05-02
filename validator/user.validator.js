const { body, validationResult } = require("express-validator");
const userModel = require("../models/user.model");

const userRegisterValidator = [
  body("name").notEmpty().withMessage("Name is Required"),
  body("email")
    .notEmpty()
    .withMessage("Email is Required")
    .isEmail()
    .withMessage("Invalid Email")
    .normalizeEmail()
    .custom(async (value) => {
      await userModel.find({ email: value }).then((user) => {
        if (user.length > 0) {
          throw "Username already in use";
        }
      });
    }),
  body("phone")
    .notEmpty()
    .withMessage("Phone Number is required")
    .isLength({
      min: 5,
    })
    .isNumeric()
    .withMessage("Phone Number not valid"),
  body("password")
    .notEmpty()
    .withMessage("Password is Required")
    .isLength({
      min: 6,
    })
    .withMessage("Password Must be more that 6"),
];
const userLoginValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email Is Required")
    .isEmail()
    .withMessage("Enter a valid Email")
    .custom(async (value) => {
      await userModel.findOne({ email: value }).then((data) => {
        if (!data) {
          throw "User not register";
        }
      });
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is Required")
    .isLength({
      min: 6,
    })
    .withMessage("Password must be more than 6"),
];

const userRegisterValidatorFn = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};
const userLoginValidatorFn = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};
module.exports = {
  userRegisterValidator,
  userRegisterValidatorFn,
  userLoginValidator,
  userLoginValidatorFn,
};

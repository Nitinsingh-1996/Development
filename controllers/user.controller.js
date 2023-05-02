const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;

var jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  let password = await bcrypt.hash(req.body.password, saltRounds);
  let dataNew = {
    name: req.body?.name,
    email: req.body?.email,
    phone: req.body?.phone,
    password: password,
  };
  let registerData = await userModel(dataNew);
  await registerData
    .save()
    .then((data) => {
      res.status(200).json({
        error: false,
        status: 200,
        message: "Registration successful",
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          _id: data._id,
        },
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: true,
        status: 401,
        errors: err,
      });
    });
};

const loginController = async (req, res) => {
  await userModel
    .findOne({ email: req.body.email })
    .then(async (data) => {
      let comparePassword = await bcrypt.compare(
        req.body.password,
        data.password
      );
      let token = jwt.sign({ id: data._id }, "developer1234567890developer");
      if (comparePassword) {
        res.status(200).json({
          error: false,
          status: 200,
          message: "Login successful",
          data: {
            name: data.name,
            email: data.email,
            phone: data.phone,
            _id: data._id,
          },
          token,
        });
      } else {
        res.status(400).json({
          error: true,
          status: 401,
          message: "User Not Register",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        error: true,
        status: 401,
        errors: err,
      });
    });
};

const getAllUserController = async (req, res) => {
  await userModel
    .find()
    .select("-password")
    .then((data) => {
      res.status(200).json({ success: true, data });
    })
    .catch((err) => {
      res.status(401).json({
        error: true,
        message: "User Not register yet",
      });
    });
};
const getUserController = async (req, res) => {
  let decoded = jwt.verify(
    req.headers.authorization,
    "developer1234567890developer"
  );
  await userModel
    .findOne({ _id: decoded.id })
    .select("-password")
    .then((data) => {
      res.status(200).json({ success: true, data });
    })
    .catch((err) => {
      res.status(401).json({
        error: true,
        message: "User Not register yet",
      });
    });
};
module.exports = {
  registerController,
  loginController,
  getAllUserController,
  getUserController,
};

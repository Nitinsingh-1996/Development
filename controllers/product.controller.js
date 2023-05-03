const productModel = require("../models/product.model");
const userModel = require("../models/user.model");

const createProductController = async (req, res) => {
  let createProduct = await productModel(req.body);
  await createProduct
    .save()
    .then((data) => {
      res
        .status(200)
        .json({ success: true, message: "Product created successful", data });
    })
    .catch((err) => {
      res
        .status(401)
        .json({ error: true, message: "Something went wrong!!", data: err });
    });
};

const getAllProductController = async (req, res) => {
  await productModel
    .find()
    .then((data) => {
      res
        .status(200)
        .json({ success: true, message: "All product data", data });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ error: true, message: "Something went wrong", data: err });
    });
};

const getSingleProductController = async (req, res) => {
  await productModel
    .findOne({ _id: req.params.id })
    .then((data) => {
      res.status(200).json({ success: true, message: "Product data", data });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ error: true, message: "Product Not Found", data: err });
    });
};

const updateProductController = async (req, res) => {
  await productModel
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((data) => {
      res
        .status(200)
        .json({ success: true, message: "Product Update Success", data });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ error: false, message: "Product Not Found", data: err });
    });
};

const deleteProductController = async (req, res) => {
  await userModel
    .findByIdAndDelete(req.params.id)
    .then((data) => {
      return res
        .status(200)
        .json({ success: true, message: "Product deleted sucessfull" });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ error: true, message: "Product not Found", data: err });
    });
};

const deleteAllProductController = async (req, res) => {
  await productModel
    .deleteMany()
    .then((data) => {
      return res.status(200).json({
        success: true,
        message: "All product deleted success",
        data,
      });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ error: true, message: "Something went wrong", data: err });
    });
};
module.exports = {
  createProductController,
  getAllProductController,
  getSingleProductController,
  updateProductController,
  deleteProductController,
  deleteAllProductController,
};

const productModel = require("../models/product.model");

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

const getSingleProduct = async (req, res) => {
  console.log("req.body", req.params.id);
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
module.exports = { createProductController, getAllProductController,getSingleProduct };

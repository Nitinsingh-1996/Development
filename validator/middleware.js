var jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const checkHeaders = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res
        .status(403)
        .json({ error: true, message: "No credentials sent!" });
    } 
    jwt.verify(
      req.headers.authorization,
      "developer1234567890developer",
      (err, valid) => {
        if (err) {
          return res.status(403).json({ error: true, data: err, message: "Token expires" });
        }
        userModel
        .findOne({ _id: valid.id })
        .then((data) => {
            if (!data) {
            return res.status(403).json({ error: true, message: "Token expires" });
            }
        })
        .catch((err) => {
            res.status(403).json({ error: true, message: "Token expires", data: err });
        });
        next()
        }
    );
};

module.exports = { checkHeaders };

// const express = require("express")
const mongoose = require("mongoose");

// mongoose.connect("mongodb://127.0.0.1:27017/e-com", (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("DB connected");
//   }
// });
mongoose
  .connect("mongodb://127.0.0.1:27017/e-com")
  .then(console.log("DB connected"))
  .catch((err) => {
    console.log(err);
  });

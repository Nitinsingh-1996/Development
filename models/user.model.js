const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
    // select: false
  },
},{
  timestamps:true
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;

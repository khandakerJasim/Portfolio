const mongoose = require("mongoose");
const validator = require("email-validator");

//create userSchema

const userschema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: function () {
      return validator.validate(this.email);
    },
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  datacreated: {
    type: String,
  },
  dateupdated: {
    type: String,
  },
  status: {
    type: String,
    enums: ["active", "inactive"],
    default: "active",
  },
});

//create model

const User = new mongoose.model("portfoliouser", userschema);

module.exports = User;

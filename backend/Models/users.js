const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define MongoDB Register Schema
const userSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    roles: {
        Mentee: {
        type: Number,
        default: 2001
        },
        Mentor: Number,
        Admin: Number
      },
    password: {
      type: String,
      required: true
    },
    refreshToken: String
  });

  module.exports = mongoose.model('Users', userSchema)
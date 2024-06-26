const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    firstname: {
      required: true,
      type: String,
    },
    lastname: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
    role: {
      required: true,
      type: String,
      enum: ['Admin', 'Editor', 'Viewer'],
      default: 'Viewer' 
    }
  });

  module.exports = mongoose.model("Users", usersSchema);
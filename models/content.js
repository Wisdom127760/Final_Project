const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference the User model
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // Reference the Category model (optional)
  },
  tags: {
    type: [String], // Array of strings for tags
  },
  publishDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('myContent', contentSchema);
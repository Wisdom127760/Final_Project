const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    type: Schema.Types.ObjectId, // Reference to User model
    ref: 'Users',
  },
  category: {
    type: String,
    required: true,
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
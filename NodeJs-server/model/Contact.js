const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  number: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  status: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  lat: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  long: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
});

module.exports = mongoose.model('Contact', contactSchema);
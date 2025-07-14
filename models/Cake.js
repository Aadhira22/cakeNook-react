const mongoose = require('mongoose');

const cakeSchema = new mongoose.Schema({
  index: Number,
  price_id: String,
  cakeName: String,
  slug: String,
  category: String,
  images: [String],
  details: {
    price: Number,
    description: [String]
  }
});

module.exports = mongoose.model('Cake', cakeSchema);

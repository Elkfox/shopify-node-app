const mongoose = require('mongoose');
const Counter = require('./Counter');


const Shop = mongoose.Schema({
  shopId: Number,
  shopify_domain: String, // Shopify domain without the .myshopify.com on the end.
  name: String,
  domain: String,
  supportEmail: String,
  nonce: String,
  accessToken: String,
  isActive: { type: Boolean, default: false },
});

module.exports = mongoose.model('Shop', Shop);

const mongoose = require('mongoose');
const Counter = require('./Counter');


const Store = mongoose.Schema({
  shopId: Number,
  shopify_domain: String, // Shopify domain without the .myshopify.com on the end.
  name: String,
  domain: String,
  supportEmail: String,
  nonce: String,
  accessToken: String,
  isActive: { type: Boolean, default: false },
});

// This is the pre-save method which increments the Counter for storeId. This allows us to give a
// unqiue numerical ID to each shop.
Store.pre('save', (next) => {
  const store = this;
  Counter.findByIdAndUpdate({ _id: 'storeId' }, { $inc: { seq: 1 } }, (err, counter) => {
    if (err) {
      return next(err);
    }
    store.shopId = counter.seq;
    return next();
  });
});

module.exports = mongoose.model('Store', Store);

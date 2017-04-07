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
  hideInstructions: { type: Boolean, default: false },
});


Store.pre('save', (next) => {
  const store = this;
  Counter.findByIdAndUpdate({ _id: 'storeCount' }, { $inc: { seq: 1 } }, (err, counter) => {
    if (err) {
      return next(err);
    }
    store.shopId = counter.seq;
    return next();
  });
});

module.exports = mongoose.model('Store', Store);

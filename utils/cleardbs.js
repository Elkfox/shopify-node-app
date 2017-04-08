const mongoose = require('mongoose');
const Shop = require('../models/Shop');
const Counter = require('../models/Counter');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/node-shopify-app');

Shop.remove({}, (error) => {
  if (error) {
    console.error('Could not remove Shop database entries: ', error);
  } else {
    console.log('Successfully cleared Shop');
  }
});

Counter.remove({}, (error) => {
  if (error) {
    console.error('Could not remove Counter database entries: ', error);
  } else {
    console.log('Successfully cleared Counter');
  }
})



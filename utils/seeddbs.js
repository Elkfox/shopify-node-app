// This is the file where you should seed the databases if you want to have any data in them.
// By default it's just set up to seed the "Counter" model which is how we count stores.
// But the same function runs when the app is first started as well.
const mongoose = require('mongoose');
const Counter = require('../models/Counter');
const config = require('../config');

mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost/${config.DATABASE_NAME}`);

// Initialise the counter if it hasn't been initialised yet.
Counter.remove({}, (error) => {
  if (error) {
    console.error('Could not clear Counter database: ', error);
  } else {
    new Counter({ _id: 'storeId' }).save((err) => {
      if (err) {
        console.error('Could not seed Counter Database: ', err);
      }
    });
  }
});

Counter.findById({ _id: 'storeCount' }, (err, id) => {
  if (id === null) {
    const storeCount = new Counter({ _id: 'storeIds' });
    storeCount.save((error) => {
      if (err) {
        console.log('Error populating counter database: ', error);
      }
    });
  } else if (err) {
    console.log('Cannot find ID? ', err);
  } else {
    console.log('Database already populated');
  }
});
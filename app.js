const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// Routes
const index = require('./routes/index');
const install = require('./routes/install');
const webhook = require('./routes/webhook');
const proxy = require('./routes/proxy');
const api = require('./routes/api');
require('dotenv').config();
// Models
const Counter = require('./models/Counter');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/node-shopify-app');

const app = express();

// Initialise the counter if it hasn't been initialised yet.
Counter.findById({ _id: 'storeId' }, (err, id) => {
  if (id === null) {
    const storeCount = new Counter({ _id: 'storeId' });
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

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', index);
app.use('/install', install);
app.use('/webhook', webhook);
app.use('/proxy', proxy);
app.use('/api', api);
// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

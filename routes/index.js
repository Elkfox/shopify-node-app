const express = require('express');
const verifyOAuth = require('../helpers').verifyOAuth;
const mongoose = require('mongoose');
const config = require('../config');

const Shop = mongoose.model('Shop');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  const query = Object.keys(req.query).map((key) => `${key}=${req.query[key]}`).join('&');
  if (req.query.shop) {
    Shop.findOne({ shopify_domain: req.query.shop, isActive: true }, (err, shop) => {
      if (!shop) {
        return res.redirect(`/install/?${query}`);
      }
      if (verifyOAuth(req.query)) {
        return res.render('app/app', { apiKey: config.SHOPIFY_API_KEY, appName: config.APP_NAME, shop });
      }
      return res.render('index', { title: req.query.shop });
    });
  } else {
    return res.render('index', { title: 'Welcome to your example app' });
  }
});

router.get('/error', (req, res) => res.render('error', { message: 'Something went wrong!' }));

module.exports = router;

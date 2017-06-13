const express = require('express');
const Shop = require('../models/Shop');
const verifyOAuth = require('../helpers').verifyOAuth;
const config = require('../config');

const router = express.Router();

/* GET home page. */
router.get('/', async (req, res) => {
  const query = Object.keys(req.query).map(key => `${key}=${req.query[key]}`).join('&');

  if (req.query.shop) {
    Shop.findOne({ where: { shopify_domain: req.query.shop, isActive: true } }).then((shop) => {
      if (!shop) {
        return res.redirect(`/install/?${query}`);
      } else if (verifyOAuth(req.query)) {
        return res.render('app/app', { apiKey: config.SHOPIFY_API_KEY, appName: config.APP_NAME, shop });
      }
      return res.render('index', { title: `Welcome to ${config.APP_NAME}` });
    });
  }
});

router.get('/error', (req, res) => res.render('error', { message: 'Something went wrong!' }));

module.exports = router;

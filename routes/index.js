const express = require('express');
const Shop = require('../models/Shop');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  const shopUrl = req.query.shop;
  console.log(req.query);
  if (!shopUrl) {
    return res.render('index', { title: 'Hello' });
  }
  const query = Shop.findOne({ shopify_domain: shopUrl }).exec();

  query.then((err, shop) => {
    if (err) {
      return next(err);
    } else if (shop === '' || shop === undefined) {
      res.redirect('/install/');
    }
  });
});

module.exports = router;

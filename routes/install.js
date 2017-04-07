const express = require('express');
const verifyHmac = require('../middleware/verifyHmac');
const Shopify = require('shopify-node-api');
const config = require('../config');
const generate_nonce = require('../helpers').generate_nonce;
const router = express.Router;

router.get('/install/', (req, res) => {
  const shop = req.params.shop;
  const nonce = generate_nonce();

  const shopAPI = new Shopify({
    shop,
    shopify_api_key: config.SHOPIFY_API_KEY,
    shopify_shared_secret: config.SHOPIFY_SHARED_SECRET,
    shopify_scope: config.APP_SCOPE,
    nonce,
  });
});
module.exports = router;

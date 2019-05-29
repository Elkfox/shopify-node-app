const express = require('express');
const Shop = require('../models/Shop');
const Shopify = require('shopify-node-api');
const config = require('../config');
const generateNonce = require('../helpers').generateNonce;
const buildWebhook = require('../helpers').buildWebhook;

const router = express.Router();

router.get('/', (req, res) => {
  const shopName = req.query.shop;
  const nonce = generateNonce();
  const query = Shop.findOne({ shopify_domain: shopName }).exec();
  const shopAPI = new Shopify({
    shop: shopName,
    shopify_api_key: config.SHOPIFY_API_KEY,
    shopify_shared_secret: config.SHOPIFY_SHARED_SECRET,
    shopify_scope: config.APP_SCOPE,
    nonce,
    redirect_uri: `${config.APP_URI}/install/callback`,
  });
  const redirectURI = shopAPI.buildAuthURL();

  query.then((response) => {
    let save;
    const shop = response;
    if (!shop) {
      save = new Shop({ shopify_domain: shopName, nonce }).save();
    } else {
      shop.shopify_domain = shopName;
      shop.nonce = nonce;
      save = shop.save();
    }
    return save.then(() => res.redirect(redirectURI));
  });
});

router.get('/callback', (req, res) => {
  const params = req.query;
  const query = Shop.findOne({ shopify_domain: params.shop }).exec();
  query.then((result) => {
    const shop = result;
    const shopAPI = new Shopify({
      shop: params.shop,
      shopify_api_key: config.SHOPIFY_API_KEY,
      shopify_shared_secret: config.SHOPIFY_SHARED_SECRET,
      nonce: shop.nonce,
    });
    shopAPI.exchange_temporary_token(params, (error, data) => {
      if (error) {
        console.log(error);
        res.redirect('/error');
      }
      console.log(data);
      shop.accessToken = data.access_token;
      shop.isActive = true;
      shop.save((saveError) => {
        if (saveError) {
          console.log('Cannot save shop: ', saveError);
          res.redirect('/error');
        }
        if (config.APP_STORE_NAME) {
          res.redirect(`https://${shop.shopify_domain}/admin/apps/${config.APP_STORE_NAME}`);
        } else {
          res.redirect(`https://${shop.shopify_domain}/admin/apps`);
        }
      });
    });
  });
});

module.exports = router;

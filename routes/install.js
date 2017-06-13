const express = require('express');
const Shop = require('../models').Store;
const Shopify = require('shopify-node-api');
const config = require('../config');
const generateNonce = require('../helpers').generateNonce;
const buildWebhook = require('../helpers').buildWebhook;

const router = express.Router();

router.get('/', (req, res) => {
  const shopName = `${req.query.shop}.myshopify.com`;
  const nonce = generateNonce();

  const shopAPI = new Shopify({
    shop: shopName,
    shopify_api_key: config.SHOPIFY_API_KEY,
    shopify_shared_secret: config.SHOPIFY_SHARED_SECRET,
    shopify_scope: config.APP_SCOPE,
    nonce,
    redirect_uri: `${config.APP_URI}/install/callback`,
  });
  const redirectURI = shopAPI.buildAuthURL();

  const query = Shop.findOne({ where: { shopify_domain: shopName } });

  query.then((shop) => {
    if (!shop) {
      Shop.create({
        shopify_domain: shopName,
        nonce,
      })
      .then(() => res.redirect(redirectURI))
      .catch((err) => { res.status(400).send('Something went wrong!'); console.log(err); });
    }
  });
});

router.get('/callback', (req, res) => {
  const params = req.query;
  const query = Shop.findOne({ where: { shopify_domain: params.shop } });
  query.then((shop) => {
    if (!shop) {
      return res.redirect('/error');
    }

    const shopAPI = new Shopify({
      shop: params.shop,
      shopify_api_key: config.SHOPIFY_API_KEY,
      shopify_shared_secret: config.SHOPIFY_SHARED_SECRET,
      nonce: shop.nonce,
    });

    return shopAPI.exchange_temporary_token(params, (error, data) => {
      if (error) {
        res.redirect('/error');
      }
      shop.update({
        accessToken: data.access_token,
        isActive: true,
      })
      .then(() => {
        if (config.APP_STORE_NAME) {
          return res.redirect(`http://${shop.shopify_domain}/admin/apps/${config.APP_STORE_NAME}`);
        }
        return res.redirect(`https://${shop.shopify_domain}/admin/apps`);
      });
    });
  });
});

module.exports = router;

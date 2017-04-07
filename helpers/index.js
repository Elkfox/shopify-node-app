const Shopify = require('shopify-node-api');
const Shop = require('../models/Shop');
const config = require('../config.js');

/**
 * A file full of helper functions that I found useful for building shopify apps.
 */

module.exports = {
  /**
   *
   * @param {string} shop - The name of the shop object you want to open a new session for.
   * @returns {object} An active shopify session with access to the API and such.
   */
  openSession(shop) {
    return new Shopify({
      shop: shop.shopify_domain,
      shopify_api_key: config.SHOPIFY_API_KEY,
      shopify_shared_secret: config.SHOPIFY_SHARED_SECRET,
      access_token: shop.access_token,
    });
  },

  generateNonce(bits = 64) {
    let text = '';
    const possible = "ABCDEFGHIJKLMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";

    for (let i = 0; i < bits; i += 1) {
      text += possible.charAt(Math.floor(Math.random() * bits));
    }
    return text;
  },
};



const Shopify = require('shopify-node-api');
const config = require('../config');
const crypto = require('crypto');
/**
 * A file full of helper functions that I found useful for building shopify apps.
 */
module.exports = {
  /**
   * openSession - Opens a Shopify Session which allows Shopify API calls.
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

  verifyOAuth(query) {
    if (!query.hmac) {
      return false;
    }
    const hmac = query.hmac;
    const sharedSecret = config.SHOPIFY_SHARED_SECRET;
    delete query.hmac;
    const sortedQuery = Object.keys(query).map(key => `${key}=${Array(query[key]).join(',')}`).sort().join('&');
    const calculatedSignature = crypto.createHmac('sha256', sharedSecret).update(sortedQuery).digest('hex');
    if (calculatedSignature === hmac) {
      return true;
    }

    return false;
  },
};



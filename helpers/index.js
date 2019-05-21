const ShopifyAPI = require('shopify-node-api');
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
    return new ShopifyAPI({
      shop: shop.shopify_domain,
      shopify_api_key: config.SHOPIFY_API_KEY,
      shopify_shared_secret: config.SHOPIFY_SHARED_SECRET,
      access_token: shop.accessToken,
    });
  },

  /**
   * buildWebhook()
   * @param {String} topic - The topic of the webhook you wish to create
   * @param {String} address - The URL you want the webhook data sent to
   * @param {ShopifyAPI} shop - ShopifyAPI instance for the Shop you're creating the webhook for
   * @param {function} callback - A callback url for when the request is complete
   * @returns function or false if unsuccesful.
   */
  buildWebhook(topic = '', address = `${config.APP_URI}/webhook/`, shop = {}, callback) {
    if (topic.length === 0) {
      return false;
    } else if (address.length === 0) {
      return false;
    } else if (typeof shop !== 'object') {
      return false;
    } else if (typeof callback !== 'function') {
      return false;
    }
    const data = {
      webhook: {
        topic,
        address,
        format: 'json',
      },
    };
    shop.post('/admin/webhooks.json', data, (err, response, headers) => {
      if (err) {
        if (typeof callback === 'function') {
          return callback(err, response, headers);
        }
        return false;
      }
      return typeof callback === 'function' ? callback(null, response, headers) : true;
    });
    return typeof callback === 'function' ? callback('Could not create webhook', null, null) : false;
  },

  generateNonce(bits = 64) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';

    for (let i = 0; i < bits; i += 1) {
      text += possible.charAt(Math.floor(Math.random() * bits));
    }
    return text;
  },

  verifyHmac(data, hmac) {
    if (!hmac) {
      return false;
    } else if (!data || typeof data !== 'object') {
      return false;
    }

    const sharedSecret = config.SHOPIFY_SHARED_SECRET;
    const calculatedSignature = crypto.createHmac('sha256', sharedSecret)
      .update(Buffer.from(data), 'utf8')
      .digest('base64');
    return calculatedSignature === hmac;
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



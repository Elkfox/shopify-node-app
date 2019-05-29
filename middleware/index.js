const crypto = require('crypto');
const config = require('../config');
const verifyHmac = require('../helpers').verifyHmac;
/**
 * Express middleware to verify hmac and requests from shopify.
 * This middleware adds two items to the req object:
 * req.topic - A string containing the topic of the middlware
 * req.shop - The shop url of the store posting to the webhook url
 * @param {object} req - Express/Node request object
 * @param {object} res - Expres/Node response object
 * @param {function} next - Function that represents the next piece of middleware.
 */
function verifyWebhook(req, res, next) {
  let hmac;
  let data;
  try {
    hmac = req.get('X-Shopify-Hmac-SHA256');
    data = req.rawbody;
  } catch (e) {
    console.log(`Webhook request failed from: ${req.get('X-Shopify-Shop-Domain')}`);
    res.sendStatus(200);
  }

  if (verifyHmac(JSON.stringify(data), hmac)) {
    req.topic = req.get('X-Shopify-Topic');
    req.shop = req.get('X-Shopify-Shop-Domain');
    return next();
  }

  return res.sendStatus(200);
}

module.exports = {
  verifyWebhook,
};

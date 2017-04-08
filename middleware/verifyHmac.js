const crypto = require('crypto');
const config = require('../config');

/**
 * Express middleware to verify hmac and requests from shopify.
 * @param {object} req - Express/Node request object
 * @param {object} res - Expres/Node response object
 * @param {function} next - Function that represents the next piece of middleware.
 */
function verifyWebhook(req, res, next) {
  const query = req.query;
  const hmac = req.get('HTTP_X_SHOPIFY_HMAC_SHA256');
  const sharedSecret = config.SHOPIFY_SHARED_SECRET;
  if (!hmac) {
    return res.sendStatus(403);
  }
  const sortedQuery = Object.keys(query).map(key => `${key}=${Array(query[key]).join(',')}`).sort().join('');

  const calculatedSignature = crypto.createHmac('sha256', sharedSecret).update(sortedQuery).digest('hex');

  if (calculatedSignature === hmac) {
    return next();
  }

  return res.sendStatus(403);
}

function verifyOAuth(req, res, next) {
  const query = req.query;
  if (!query.hmac) {
    return res.sendStatus(403);
  }
  const hmac = query.hmac;
  const sharedSecret = config.SHOPIFY_SHARED_SECRET;
  if (!hmac) {
    return res.sendStatus(403);
  }
  delete query.hmac;
  delete query.state;
  const sortedQuery = Object.keys(query).map(key => `${key}=${Array(query[key]).join(',')}`).sort().join('&');
  const calculatedSignature = crypto.createHmac('sha256', sharedSecret).update(sortedQuery).digest('hex');
  if (calculatedSignature === hmac) {
    return next();
  }

  return res.sendStatus(403);
}

module.exports = {
  verifyWebhook,
  verifyOAuth,
};

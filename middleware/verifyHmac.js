const crypto = require('crypto');

/**
 * Express middleware to verify hmac and requests from shopify.
 * @param {object} req - Express/Node request object
 * @param {object} res - Expres/Node response object
 * @param {function} next - Function that represents the next piece of middleware.
 */
function hmacVerify(req, res, next) {
  const query = req.query;
  const hmac = query.signature || '';
  const sharedSecret = '20b8675eeda4de1a4e7b73d276fd2022';
  if (!hmac) {
    return res.sendStatus(403);
  }
  delete query.signature;

  const sortedQuery = Object.keys(query).map(key => `${key}=${Array(query[key]).join(',')}`).sort().join('');

  const calculatedSignature = crypto.createHmac('sha256', sharedSecret).update(sortedQuery).digest('hex');

  if (calculatedSignature === hmac) {
    return next();
  }

  return res.sendStatus(403);
}

module.exports = hmacVerify;

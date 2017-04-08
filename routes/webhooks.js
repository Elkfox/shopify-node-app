/**
 * ./routes/webhooks.js
 * This is where you'll set up any webhook endpoints you plan on using. This includes the middleware
 * to check if a request from a webhook is legitemate.
 */
const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.sendStatus(200);
});

module.exports = router;

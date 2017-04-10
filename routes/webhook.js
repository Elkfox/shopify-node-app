/**
 * ./routes/webhooks.js
 * This is where you'll set up any webhook endpoints you plan on using. This includes the middleware
 * to check if a request from a webhook is legitemate.
 */
const express = require('express');
const verifyWebhook = require('../middleware').verifyWebhook;

const router = express.Router();

router.post('/', verifyWebhook, (req, res) => {
  // This is where you should do something with your webhooks. Filter by Topic etc.
  return res.sendStatus(200);
});

module.exports = router;

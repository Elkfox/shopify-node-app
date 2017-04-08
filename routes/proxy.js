/**
 * ./routes/proxy.js
 * This is where you'll set up anything to do with your app proxy if you have one set up.
 */
const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.sendStatus(200);
});

module.exports = router;

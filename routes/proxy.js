/**
 * ./routes/proxy.js
 * This is where you'll set up anything to do with your app proxy if you have one set up.
 */
const express = require('express');

const router = express.Router();

// Send everything from this route back as liquid.
router.use((req, res, next) => {
  res.set('Content-Type', 'application/liquid');
  return next();
});

router.get('/', (req, res, next) => {
  res.sendStatus(200);
  next();
});

module.exports = router;

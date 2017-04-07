const env = process.env.NODE_ENV;
const production = require('./production');
const development = require('./development');
// You should put any 'global' variables in here.
const config = {
  SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY || '',
  SHOPIFY_SHARED_SECRET: process.env.SHOPIFY_SHARED_SECRET || '',
  APP_SCOPE: '',
};

if (env !== 'PRODUCTION') {
  module.exports = Object.extend({}, config, development);
} else {
  module.exports = Object.extend({}, config, production);
}

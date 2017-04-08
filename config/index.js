const env = process.env.NODE_ENV;
const production = require('./production');
const development = require('./development');

// You should put any global variables in here.
const config = {
  SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY || '',
  SHOPIFY_SHARED_SECRET: process.env.SHOPIFY_SHARED_SECRET || '',
  APP_NAME: 'Example App',
  APP_SCOPE: 'read_products,write_products,write_script_tags,read_themes,write_themes',
};

if (env !== 'PRODUCTION') {
  module.exports = Object.assign({}, config, development);
} else {
  module.exports = Object.assign({}, config, production);
}

---
title:  "Configuration"
handle: "configuration"
category: "configuration"
---

Inside the `config/` directory there are three files
- development.js - Development only configuration variables
- index.js - Global configuration variables
- production.js - Production only configuration variables

This is where you'll place any configuration variables you'll need or any references you'll need to environment variables later on.
When the app is initalised it checks where `process.env.NODE_ENV` is set to production or not and will load the relevant configurations.

Default configuration located in `config/index.js` variables are:
- SHOPIFY\_API\_KEY - Your apps API Key. Generated when you set up the app and required to run and install the app
- SHOPIFY\_SHARED\_SECRET - Your apps secret key. Generated when you set up the app and required to run and install the app.
- APP_NAME - The name of your app. Can be left blank if you'd prefer to hardcode it in.
- APP_SCOPE - The parts of the Shopify API your app will want access to. See [below](#scopes) for a list of possible scopes. This is required to install the app. You must have at least one scope permission.

# Node Shopify App
Dummy Public App for Shopify built with Node
Includes Embedded App SDK


## Install
1. Fork and clone this repository.
2. run `npm install`
3. Edit `config/development.js` and `config/production.js` and add any API keys as needed.
4. Start developing!

## Setting up your app in the Partner Settings.
Expose your application to the internet using something like [ngrok](https://www.ngrok.io) then in your `config/development.js` file set your `APP_URI` variable to be whatever ngrok defines for you.


Then you'll need to set up the app in partner settings. If you don't know how to do this yet follow this part of the shopify tutorial: [https://help.shopify.com/api/tutorials/building-public-app#step-2-configuring-your-application](https://help.shopify.com/api/tutorials/building-public-app#step-2-configuring-your-application)  
 **Don't forget to enable Embedded APP SDK**

1. Set the Application URL to be `https://<config.APP_URI>`.
2. Set the redirecteion URL to be `https://<config.APP_URI>/install/callback`
3. If you plan on having an app proxy set up then configure the app proxy url to be `https://<config.APP_URI>/proxy`. This will serve any files over it as liquid.
3. Once you have created your application copy the API Key and Shared Secret and either set them locally on your system or use a .env file as `SHOPIFY_API_KEY` and `SHOPIFY_SHARED_SECRET` respectively. (If you're using a .env file don't forget to check it's added to your .gitignore file).
4. Make sure you can install the app.  
You can check this by visiting `https://<config.APP_URI>/?shop=<myshopname>`. Alternatively you could make your app active but invisible on the app store by going through the partner dash and then installing via the app dashboard.  
5. When the app is installed it will redirect to `<myshopname>.myshopify.com/admin/apps/<config.APP_STORE_NAME>`.If `APP_STORE_NAME` isn't set then it will redirect to just `/admin/apps`.

---

## Configuration

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

---

## Running

### Debug mode
To start the app in debug mode simply run `npm run debug`. This will start the app on port 3000 with debugging turned on.
You can access the app by visiting `localhost:3000`

Also available is `npm run debugwatch` which will start nodemon and allow you live-restart your server whenever you make changes.

### Production mode
You can start the app in production mode by running `npm start` or `npm watch`.

**Note**: You must set the environment variable `PORT` to whatever port you wish to run your production server on. (80, 8000, 8080, etc) If this is not defined app will run on port 3000 like in development mode.


## Utils
There are two util commands available: 

`npm run cleardbs` - Which runs `./utils/cleardbs.js` and removes any entries in the databases you specify. By default it's set up to remove entries from `Shop` and `Counter`.

`npm run seeddbs` - Seeds databases using your settings inside `./utils/seeddbs.js`. Currently the only database it seeds is Counter.

---

## Routes
Routes can be found in the `routes/` folder in the root directory of the app.

| File | Route | Description |
| ---- | ----- | ----------- |
| `index.js` | `/` | Front page end points |
| `install.js` | `/install/` | install and postinstall methods go here. |
| `webhooks.js` | `/webhooks/` | Webhook endpoints |
| `api.js` | `/api/` | General API endpoints. |
| `proxy.js` | `/proxy/` | App Proxy end point. Serves responses as liquid.|

---

## Views
Node Shopify App uses handlebars as it's template engine.

Views are located in the `views/` folder and while some use a shared `layout.hbs` file you are under no obligation to use this file and your `.hbs` files can contain it's own html head and body. At the moment views are split into their current folders. The embedded app markup is located inside `apps/app.hbs`. Anything located in the root `views/` folder is for general use while `index.hbs` is what a non-shop should see if they visit `https://<config.APP_URI>`

---

## Application Scope
When you develop an app you must tell Shopify and the store owner what parts of the store you want to access and modify.

To declare application scope you can edit the APP_SCOPE variable in `config/index.js` by listing your scopes seperated by commas. 

---

## Helper Functions
There are a number of helper functions available in `helpers/index.js` these make tasks that might need to be repeated multiple times simple and quick to save time.

| Function | Arguments | Returns | Description |  
| -------- | --------- | ------- | ----------- |
| openWebhook | shop(Shop) | Accepts a Shop object from mongoose and returns a new ShopifyAPI session. |
| buildWebhook | topic (String)<br /> address(String, default: APP_URI/webhook)<br /> shop(ShopifyAPI)<br />callback(err, data, headers) | callback \|\| Boolean | Creates a new webhook on the Shop you're currently working on. Once complete it fires the callback passed to it. |
| generateNonce | length(Int, default: 8) | String |Generates a random string of characters to represent a nonce that meets Shopify's requirements for app installation |
| verifyHmac | data (String)<br /> hmac (String) | Boolean |Generates a hash from the passed data and compares it to the hash sent by Shopify. Returns true or false |
| verifyOAuth | query (Object) | Boolean | Takes a request query and checks to see if it's a request from Shopify. Returns true or false |

---

### <a name="scopes"></a>Available scopes
These are the available scopes for your application
- read_content, write_content  
Access to Article, Blog, Comment, Page, and Redirect.
- read_themes, write_themes  
Access to Asset and Theme.
- read_products, write_products  
Access to Product, product variant, Product Image, Collect, Custom Collection, and Smart Collection.
- read_customers, write_customers  
Access to Customer and Saved Search.
- read_orders, write_orders  
Access to Order, Transaction and Fulfillment.
- read_draft_orders, write_draft_orders  
Access to Draft Order.
- read_script_tags, write_script_tags  
Access to Script Tag.
- read_fulfillments, write_fulfillments  
Access to Fulfillment Service.
- read_shipping, write_shipping  
Access to Carrier Service.
- read_analytics  
Access to Analytics API.
- read_users, write_users  
Access to User **SHOPIFY PLUS**.
- read_checkouts, write_checkouts  
Access to Checkouts. 
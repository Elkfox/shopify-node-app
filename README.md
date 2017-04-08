# Node Shopify App
Dummy Public App for Shopify built with Node
Includes Embedded App SDK


## Install
1. Fork and clone this repository.
2. run `npm install`
3. Edit `config/development.js` and `config/production.js` and add any API keys as needed.
4. Start developing!


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
- APP_SCOPE - The parts of the Shopify API your app will want access to. See below for a list of possible scopes. This is required to install the app. You must have at least one scope permission.
---
## Running
### Debug mode
To start the app in debug mode simply run `npm run debug`. This will start the app on port 3000 with debugging turned on.
You can access the app by visiting `localhost:3000`

Also available is `npm run debugwatch` which will start nodemon and allow you live-restart your server whenever you make changes.

### Production mode
You can start the app in production mode by running `npm start` or `npm watch`.

**Note**: You must set the environment variable `PORT` to whatever port you wish to run your production server on(80, 8000, 8080, etc)


## Utils
There are two util commands available: 

`npm run cleardbs` - Which runs `./utils/cleardbs.js` and removes any entries in the databases you specify. By default it's set up to remove entries from `Shop` and `Counter`.

`npm run seeddbs` - Seeds databases using your settings inside `./utils/seeddbs.js`. Currently the only database it seeds is Counter.


## Routes
Routes can be found in the `routes/` folder in the root directory of the app.

### index.js
  `index.js` is where you'll find any non-app related endpoints. At the moment it only includes a root level route which checks to see if there is a shop parameter in the url and if there is redirects it to /install/ or the embedded app backend.

  `install.js` -> `/install/` is where all the methods relevant to the install go. This is where you should set up any 'post install' methods such as setting up webhooks or adding files to themes.

  `webhooks.js` -> `/webhooks/` is where you should place any requests to webhooks. This includes a middleware that checks to see if a webhook has made a legitemate request from Shopify. (TODO: That middlware.)

  `api.js` -> `/api/` is where you should place any api endpoints you wish to use for your app if you plan on having front end components. 

  `proxy.js` -> `/proxy/` is where you should place any proxy related routes. This is handy if you set up an app proxy when setting up your app. This will serve any files sent from it as liquid which allows Shopify to pass liquid objects to the files and allows you to use liquid inside your templates. (TODO: Serve files as liquid)




## Views
Node Shopify App uses handlebars as it's template engine and any views can be located in `views/`




---
title:  "Routes"
handle: "routes"
category: "routes"
---

Routes can be found in the `routes/` folder in the root directory of the app.  

| File | Route | Description |
| ---- | ----- | ----------- |
| `index.js` | `/` | Any non-app related endpoints should go here (General website endpoints such as /about, /contact, etc). |
| `install.js` | `/install/` | Where you should place any methods relevant to the installation of you app. This is also where you should set up any 'post install' methods such as setting up webhooks or adding files to themes.|
| `webhooks.js` | `/webhooks/` | Where you should place any requests to webhooks. This includes a middleware that checks to see if a webhook has made a legitemate request from Shopify.|
| `api.js` | `/api/` | Where you should place any api endpoints you wish to use for your app if you plan on having front end components.|
| `proxy.js` | `/proxy/` | Where you should place any proxy related routes. This is handy if you set up an app proxy when setting up your app. This will serve any files sent from it as liquid which allows Shopify to pass liquid objects to the files and allows you to use liquid inside your templates. |

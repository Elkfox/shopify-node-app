---
title:  "Views"
handle: "views"
category: "views"
---

Node Shopify App uses handlebars as it's template engine.

Views are located in the `views/` folder and while some use a shared `layout.hbs` file you are under no obligation to use this file and your `.hbs` files can contain it's own html head and body. At the moment views are split into their current folders. The embedded app markup is located inside `apps/app.hbs`. Anything located in the root `views/` folder is for general use while `index.hbs` is what a non-shop should see if they visit `https://<config.APP_URI>`

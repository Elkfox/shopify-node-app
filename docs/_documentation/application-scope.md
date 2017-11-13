---
title:  "Application Scope"
handle: "application-scope"
category: "application-scope"
---

When you develop an app you must tell Shopify and the store owner what parts of the store you want to access and modify.

To declare application scope you can edit the APP_SCOPE variable in `config/index.js` by listing your scopes seperated by commas.

### <a name="scopes"></a>Available scopes
These are the available scopes for your application

Scope  |  Description
-------|-------------
read_content, write_content | Access to Article, Blog, Comment, Page, and Redirect.
read_themes, write_themes | Access to Asset and Theme.
read_products, write_products | Access to Product, product variant, Product Image, Collect, Custom Collection, and Smart Collection.
read_customers, write_customers | Access to Customer and Saved Search.
read_orders, write_orders | Access to Order, Transaction and Fulfillment.
read_draft_orders, write_draft_orders | Access to Draft Order.
read_script_tags, write_script_tags | Access to Script Tag.
read_fulfillments, write_fulfillments | Access to Fulfillment Service.
read_shipping, write_shipping | Access to Carrier Service.
read_analytics | Access to Analytics API.
read_users, write_users | Access to User **SHOPIFY PLUS**.
read_checkouts, write_checkouts | Access to Checkouts.

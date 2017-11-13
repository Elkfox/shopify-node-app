---
title:  "Helper Functions"
handle: "helper-functions"
category: "helper-functions"
---

There are a number of helper functions available in `helpers/index.js` these make tasks that might need to be repeated multiple times simple and quick to save time.

| Function | Arguments | Returns | Description |  
| -------- | --------- | ------- | ----------- |
| openWebhook | shop(Shop) | Accepts a Shop object from mongoose and returns a new ShopifyAPI session. |
| buildWebhook | topic (String)<br /> address(String, default: APP_URI/webhook)<br /> shop(ShopifyAPI)<br />callback(err, data, headers) | callback \|\| Boolean | Creates a new webhook on the Shop you're currently working on. Once complete it fires the callback passed to it. |
| generateNonce | length(Int, default: 8) | String |Generates a random string of characters to represent a nonce that meets Shopify's requirements for app installation |
| verifyHmac | data (String)<br /> hmac (String) | Boolean |Generates a hash from the passed data and compares it to the hash sent by Shopify. Returns true or false |
| verifyOAuth | query (Object) | Boolean | Takes a request query and checks to see if it's a request from Shopify. Returns true or false |

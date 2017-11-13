---
title:  "Shopify Partner Dashboard"
handle: "shopify-partner-dashboard"
category: "shopify-partner-dashboard"
---

Create a new app in your [Partner Dashboard](https://partners.shopify.com/login) using the forwarding address that ngrok creates for you.

Go to the App info tab and add https://32c49948.ngrok.io/install/callback to the Whitelisted redirection URL(s) **be sure to use the HTTPS url**.

Add any other relevant whitelisted urls such as https://32c49948.ngrok.io/proxy if you wish to use an app proxy.

<img src="{{ site.github.url }}/assets/partner-dash-settings.png">

**As noted above, unless you have a paid ngrok plan you will need to change this each to you start ngrok to the new url.**

Below you will see the App credentials section, take note of your API key and and API secret key. You'll use these as environment variables in your app.

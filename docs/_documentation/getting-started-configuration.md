---
title:  "Configuration"
handle: "getting-started-configuration"
category: "getting-started-configuration"
---

If you haven't done so already fork and clone [the repository](https://github.com/Elkfox/shopify-node-app)

And install all the required Node packages

{% highlight bash %}
npm install
{% endhighlight %}


In the config directory we store the variables for the different environments. Production refers to the live environment and development is the local. index.js is the global variables with the current environment.

Go into config/development.js and change the APP_URI to the your ngrok forwarding address. In my case it's https://32c49948.ngrok.io

Now ensure that you have .env in your .gitignore because we will be storing sensitive information in this file such as our API secret. if it isn't add it now.

Now create a new file in your app root called .env
and add the API credentials we created earlier in the Shopify Partner Dashboard. It should look like this:

{% highlight conf %}
SHOPIFY_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SHOPIFY_SHARED_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
{% endhighlight %}

If you want to use port other than 7777 you can add that now too.

{% highlight conf %}
PORT=3000
{% endhighlight %}

Okay now lets get our app running!

{% highlight bash %}
npm start
{% endhighlight %}

You should now be able to install your app if you visit the installation url.

My Shopify store url is `hello-world.myshopify.com`
and my ngrok forwarding address is `https://32c49948.ngrok.io/``
therefore my installation url is
`https://32c49948.ngrok.io/?shop=hello-world`

Congratulations 🙌

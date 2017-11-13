---
title:  "Ngrok"
handle: "ngrok"
category: "ngrok"
---

Your app will be receiving requests from Shopify, but you want to be able to develop your app locally. This is where Ngrok comes in. Ngrok is a tunneling service which will allow you to safely expose your local app to the internet so that it can now communicate with Shopify.

<a href="https://ngrok.com/" rel="nofollow" target="_blank">Download Ngrok</a>

Assuming you downloaded it to your downloads folder unzip ngrok

{% highlight bash %}
unzip Downloads/ngrok.zip
{% endhighlight %}

{% highlight bash %}
cd Downloads
unzip ./ngrok.zip
{% endhighlight %}

Then run ngrok on port 7777

{% highlight bash %}
ngrok http 7777
{% endhighlight %}

If all went well you will see a response like this
<img src="{{ site.github.url }}/assets/ngrok-init.png">

but the localhost port will be 7777 instead.

In this case the Ngrok forwarding address is: https://32c49948.ngrok.io

This is the url that will be used for reference in the rest of this tutorial. If the app were running you could now visit this url in your browser to view the app.

##### Note
Your ngrok forwarding address changes every time that you restart ngrok (unless you have a paid plan). To avoid OAuth failures, update your app settings in the Partner Dashboard whenever you restart ngrok.

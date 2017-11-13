---
title:  "Mongo Setup"
handle: "mongo-setup"
category: "mongo-setup"
---

First lets start by opening your terminal and checking to see if we have an installation of by typing in

{% highlight bash %}
mongod
{% endhighlight %}

If you do not have Mongo installed the command will not be found. If you do you can go ahead to the <a href="#ngrok">Ngrok</a> section.

Getting started with Mongo is simple click [here to find the instructions for your operating system](https://docs.mongodb.com/manual/administration/install-community/)

#### Quick guide to install Mongo for Mac users
I recommend using Brew to get started quickly.

First update Brew.

{% highlight bash %}
brew update
{% endhighlight %}

Then install MongoDB
{% highlight bash %}
brew install mongodb
{% endhighlight %}

Then create the directory where your database will be stored.
{% highlight bash %}
mkdir -p /data/db
{% endhighlight %}

##### Important
Before running mongod for the first time, ensure that the user account running mongod has read and write permissions for the data directory. It is not advised to run mongod as root user i.e don't use sudo, setup the permissions correctly using the following command.

{% highlight bash %}
sudo chown -R `id -un` /data/db
{% endhighlight %}

Now you should be able to run the Mongo Daemon.

{% highlight bash %}
mongod
{% endhighlight %}

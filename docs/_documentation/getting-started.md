---
title:  "Getting Started"
handle: "getting-started"
category: "getting started"
---

Grab `focus.js` or `focus.min.js` from [the repository](https://github.com/Elkfox/Focus).

Include the script in your html file.
{% highlight html %}
<script src="<path_to_javascript_files>/focus.min.js"></script>
{% endhighlight %}

Or if you're using Shopify include the following in your `theme.liquid`

{% highlight liquid %}
{% raw %}
{{ 'focus.min.js' | asset_url | script_tag }}
{% endraw %}
{% endhighlight %}

Optionally include the styles located in the css directory of the repository.

Include add a popup with this basic structure.

{% highlight html %}
  <button data-trigger="popup" data-target="#examplePopup">Click Me</button>

    <div class="popup overlay" id="examplePopup">
      <div class="popup-inner">
        <div class="popup-content left">

          <h2>Hello world!</h2>

          <a class="popup-close" data-close aria-label="{{ 'common.close' | t }}">Close popup</a>
        </div>
      </div>
    </div>

{% endhighlight %}

  <button data-trigger="popup" data-target="#examplePopup">Click Me</button>

  <div class="popup overlay" id="examplePopup">
    <div class="popup-inner">
      <div class="popup-content left">

        <h2>Hello world!</h2>

        <a class="popup-close" data-close aria-label="{{ 'common.close' | t }}">Close popup</a>
      </div>
    </div>
  </div>

  Now whenever someone clicks the "Click Me" button it will open the `#examplePopup` popup which
  contains a button to close the modal. Pretty easy!

  Note that the data-close doesn't have a data-target attribute. When this is the case data close will close the popup that it is contained within.

  Here we also use `.popup-inner` to close the popup when a user clicks outside of the popup.

  The user can also use the escape key to close popups.

  Here we are using the simple data api to get started which consists of the following:
  * `data-trigger="popup"`
  * `data-target="#examplePopup"`
  * `data-close`

  

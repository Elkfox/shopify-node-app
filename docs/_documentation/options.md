---
title:  "Options"
handle: "options"
category: "options"
---

You may wish to configure your popup with some settings that are different to the defaults used above. You can control these on a per popup basis using the `Focus` constructor.

{% highlight javascript %}
  var scrollPopup = new Focus('#scrollPopup', {
    visibleClass: 'active',
    innerSelector: '.outer-popup',
    autoFocusSelector: '[name="search"]'
  });
{% endhighlight %}

| Option | Default | Description |
| :----- | :------- | ----------- |
| visibleClass | `visible` | Set the visible class that gets added to show the popup. |
| innerSelector | `.popup-inner` | Set the selector for the area outside of the popup, when clicked the popup will close. |
| autoFocusSelector | `[data-auto-focus]` | Set the selector of an input field that you would like to be focused when the popup opens |

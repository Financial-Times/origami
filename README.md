# Origami Tracking component

This module should be included on your product to make sending tracking requests to the Spoor API easy.

## The Spoor ecosystem
![ScreenShot](https://rawgit.com/Financial-Times/o-tracking/master/resources/images/ngda-system-design.svg)

## Usage

### Requirement: Polyfills & Doesn't cut the mustard
_Applies to both quickstart examples below_


Add the [polyfill](https://cdn.polyfill.io/) service to your site to make sure o-tracking runs in as many browsers as possible.

Require the noscript version of o-tracking incase the browser doesn't cut the mustard.

Checkout the [Origami spec](http://origami.ft.com/docs/developer-guide/using-modules/#core-vs-enhanced-experience) for the correct CTM logic, [html and css changes](http://origami.ft.com/docs/developer-guide/using-modules/#styles-for-fallbacks-and-enhancements) needed.



o-tracking should have the following piece of html added, with the correct server and data filled in.
```html
<div class="o-tracking o--if-nojs" data-o-component="o-tracking" style="height:0;line-height:0;overflow:hidden;">
	<div style="background:url('http://server?data={}');"></div>
</div>
```

### Recommended implementation using the build service

Use an onload handler to check when o-tracking has loaded and then init.

```js
// CTM
if (cutsTheMustard) {
    var o = document.createElement('script');
    o.async = o.defer = true;
    o.src = 'https://build.origami.ft.com/bundles/js?modules=o-tracking';
    var s = document.getElementsByTagName('script')[0];
    if (o.hasOwnProperty('onreadystatechange')) {
        o.onreadystatechange = function() {
            if (o.readyState === "loaded") {
                otrackinginit();
            }
        };
    } else {
        o.onload = otrackinginit;
    }
    s.parentNode.insertBefore(o, s);
}
```

The `otrackinginit` function, used above, would have function calls to setup o-tracking and likely send a page view event. e.g.

```js
function otrackinginit() {
    var oTracking = Origami['o-tracking'];
    // Setup
    oTracking.init({...config...});
    // Page
    oTracking.page({...config...});
}
```

### Alternative implementation using require

Use the build service or require locally to load o-tracking and init manually.
```js
var oTracking = require('o-tracking');
```

```js
if (cutsTheMustard) {
    // Setup
    oTracking.init({...config...});
    // Page
    oTracking.page({...config...});
}
```

### Example implementations

- [ft.com](docs/ftcom_example.md)
- [membership](docs/membership_example.md) 

## Events

o-tracking will listen for 2 events as well as the funcations available above.

- `oTracking.page`
    
    Send a page view event

    ```js
    var event = new CustomEvent('oTracking.page', { content: { uuid: 'abc-123', barrier: 'PREMIUM' }});
    window.dispatchEvent(event);
    ```
- `oTracking.event`
    
    Send a normal event  

    ```js
    var event = new CustomEvent('oTracking.event', { category: 'video', action: 'play', id: '512346789', pos: '10' });
    window.dispatchEvent(event);
    ```

## Parameters

o-tracking will
* Automatically pickup ftsession from cookies for you.
* Page events automatically pick up the url and the referrer.

### Init
```js
{
    server: "...",
    context: {
        product: "..."
    },
    user: {
        ft_session: "..."
    }
}
```

### Page
```js
{
    url: "...",
    referrer: "..."
    content: {
        uuid: "...",
        hurdle: "..."
    }
    ... any other key-values ...
}
```

### Event

__Important__: To decide how to name the category and action fields, consider this sentance (square brackets denote that part is optional):

#### A user can {action} a {category}[ with/having a {context}[ to {destination}]]

For example:
* A user can view a page having a uuid.
* A user can play a video having a video ID.
* A user can share a comment having a comment ID to Facebook.
* A user can share an article having a uuid to email.
* A user can scroll a page with a asset type.
* A user can open an email.
* A user can click an element.

```js
{
    category: 'video',
    action: 'play',
    ... any other key-values ...  
    id: '512346789',
    pos: '10'
}
```

[Look at all the properties](docs/event.md) available for an event.

[Code Doc](http://codedocs.webservices.ft.com/v1/jsdoc/o-tracking/Tracking.html)

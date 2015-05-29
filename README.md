# Tracking module

Origami module for the FT tracking.

![ScreenShot](https://rawgit.com/Financial-Times/o-tracking/master/docs/tracking_forwarder.svg)

**NOTE: This module is not yet functional. Please continue to use legacy tracking code (iJento in most cases)**


# Usage

Tracking at the FT relies on the following concept:
```
A user uses one of our products (Website, WebApp, ePaper etc.)
|- A user has many visits
   |- A visit has many pages
      |- A page has many events
      |- A page has many links
```

Therefore, when you're thinking about when to use the below functions - and which one to use - think about these rules.
For example:
- Does the thing you want to track happen many times on a page (or could it) - such as moving to the next slide of a slideshow - use an `event`.
- Is it describing the page or the user, include it in the `init` or `page` function.




# Developers

## Installation

Add this to your dependencies in bower.json:
```
"dependencies": {
    "tracking-module": "http://git.svc.ft.com:8080/scm/track/o-tracking.git#>=0.0.20 < 1"
}
```

It's strongly advised to specify at least the major and minor version as a tag.


## Including in a product

### Template
**The template also relies on a Cut the Mustard check which MUST be adhered to if you are using both JS and non-JS versions.**
**Please avoid sending duplicate requests per page.**

`o-tracking.mustache` expects a `o-tracking` object, containing the following properties:
* o-tracking.domain - the domain of the tracking server
* o-tracking.queryString - the parameters and values below compiled into a query string format.

### JavaScript
```
var oTracking = require('o-tracking');
```
Then call the init function with the parameters below.
```
oTracking.init({ ...params... });
```
## Methods
### `init`
Setup the component with some setup values.
```
oTracking.init({ ...params... });
```
See the parameters list below.

### `page`
Track a page
```
oTracking.page({ ...params... }, callback);
```
See the parameters list below.
Optional callback, called when request has completed.


### `link`
For tracking links.
```
oTracking.link.init(params);
```
The params object can take a couple of configuration options:
- `root` - The root element the module will listen for clicks, defaults to `window.document`. Useful if you have some iFrames.
- `selector` - The elements to watch for clicks - can only be a tag name at the moment, defaults to 'a'.
- `event` - The event to listen on, defaults to 'click'.
- `links` - Array of Elements to track, which have been manually chosen, if this is provided, root and selector options are ignored. Defaults to null.
- `callback` - Optional callback, called on every tracking event.

```
oTracking.link.onClick(callback);
```
- `callback` - Set the callback to be called on every tracking event.

### `event`
For tracking events on a page.
```
oTracking.event(model, type, value, callback)
```
- model - The model, for example: comment, video, slideshow
- type - The type of event, for example: play, share
- value - Optional, the value, defaults to true. Examples include the video play amount - 50%, or slideshow slide number.
- callback - Callback function. Called when request completed.

### `log`
For arbitrary logging to Splunk.

## Events
oTracking listens to the following events on `window`. This is so other components can trigger tracking requests.
### oTracking.Data
For tracking data (additional page or user attributes).
Look at the parameters below.
Example: ```var event = new CustomEvent('oTracking.Data', { 'hurdle': 'h8' });```

### oTracking.Event
For tracking events (meaning tracking events) (such as gallery pane views or video play/pause events).
Example: ```var event = new CustomEvent('oTracking.Event', { 'model': 'video', 'type': 'play', 'value': '50%',  });```

### oTracking.Link - for tracking a link (all links will be listened to automatically if using `track.link.init()`)
Example: ```var event = new CustomEvent('oTracking.Link', DOMElement);```

## Example
```
var oTracking = require('o-tracking');
oTracking.init({
    server: 'http://spoor-api.ft.com',
    page: {
        product: 'desktop'
    },
    user: {
        ...
    }
});

oTracking.page({
    url: FT.config.tracking.params.url,
    uuid: FT.config.tracking.params.uuid
});

oTracking.link.init();
```

## Parameters
Both JS and non-JS versions take the same parameters.

### Config
* `developer`: `true` / `false` Turn on developer mode - which logs to console more.
* `server`: `http://test.tracking.ft.com/` - Location of tracking server.

### Site
* `channel` : `desktop` / `html5` / `epaper` / `flipboard` - The product or channel

### Page
* `url`: `http://www.ft.com/home/uk` - The URL of the page, defaults to document.location
* `referrer`: `http://www.ft.com/home/uk` - The referrer, defaults to document.referrer
* `uuid`: `` - The UUID for the page.

### Session
* `session`: `` - Name to use to store the tracking session.

    Alternatively, pass an object to force use of a cookie or change the expiry. e.g.

        {
            storage: 'cookie',
            name: 'mysession',
            expires: (10 * 60 * 1000) // 10 minutes
        }
### User
* `userID`: `` - A unique, persistent identifier for the user.
    Value can be a string or object.

    Use a string to carry on a previous value - then oTracking can store it it's own way.

    Use an object to set the name of the storage.
    Example - if passing an object:

        {
            storage: 'cookie',
            name: 'SIVISITOR',
            value: getValueFromCookie(/SIVISITOR=([\w\*]+);?/)
        }

### Marketing
* `ftcamp`: `` - FT Camp parameter.
* `segid`: `` - Segment parameter used for attribution.
* `campaign`: `` - Campaign parameter.
* `segmentid`: `` - Segment parameter used for attribution.




# Contributing

The following will get you setup:
* Check out the code
* `npm install`
* `bower install`
* `grunt`

The following grunt tasks are available:
* `grunt version` - bump a version number in all the files that need a version number changing.
* `grunt test` - Test the code against the test suite.

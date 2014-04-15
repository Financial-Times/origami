# Tracking module

Origami module for the FT tracking.

![ScreenShot](docs/tracking_forwarder.svg)




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
    "tracking-module": "http://git.svc.ft.com:8080/scm/track/o-tracking.git#>=0.0.18 < 1"
}
```

It's strongly advised to specify at least the major and minor version as a tag.


## Including in a product

### Template
**The template also relies on a Cut the Mustard check which MUST be adhered to if you are using both JS and non-JS versions.**
**Please avoid sending duplicate requests per page.**

`tracking.mustache` expects a `tracking` object, containing the following properties:
* tracking.domain - the domain of the tracking server
* tracking.queryString - the parameters and values below compiled into a query string format.

### JavaScript
```
var track = require('o-tracking');
```
Then call the init function with the parameters below.
```
track.init({ ...params... });
```
## Methods
### `init`
Setup the component with some setup values.
```
track.init({ ...params... });
```
See the parameters list below.

### `page`
Track a page
```
track.page({ ...params... }, callback);
```
See the parameters list below.
Optional callback, called when request has completed.


### `link`
For tracking links.
```
track.link.init(params);
```
The params object can take a couple of configuration options:
- `root` - The root element the module will listen for clicks, defaults to `window.document`. Useful if you have some iFrames.
- `selector` - The elements to watch for clicks - can only be a tag name at the moment, defaults to 'a'.
- `event` - The event to listen on, defaults to 'click'.
- `links` - Array of Elements to track, which have been manually chosen, if this is provided, root and selector options are ignored. Defaults to null.
- `callback` - Optional callback, called on every tracking event.

```
track.link.onClick(callback);
```
- `callback` - Set the callback to be called on every tracking event.

### `event`
For tracking events on a page.
```
track.event(model, type, value, callback)
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
var track = require('o-tracking');
track.init({
    // Setup
    server: FT.config.tracking.domain,
    channel: FT.config.tracking.params.channel,
    // User
    userID: getValueFromCookie(/SIVISITOR=([\w\*]+);?/),
    cohort: findSubType(getValueFromCookie(/FT_P=[A-Za-z0-9=&|]*prod=([A-Za-z0-9=|]*);?/)),
    passportID: getValueFromCookie(/USERID=([0-9]*):/),
    country: getValueFromCookie(/AYSC=[^;]*_14([a-zA-Z0-9%]+)/),
    region: getValueFromCookie(/AYSC=[^;]*_17([a-zA-Z0-9%]+)/),
    metroArea: getValueFromCookie(/AYSC=[^;]*_18([a-zA-Z0-9%]+)/)
});

track.page({
    // Page
    //url: FT.config.tracking.params.url,
    //referrer: document.referrer,
    uuid: FT.config.tracking.params.uuid,
    pageSubsLevel: FT.config.tracking.params.pageSubsLevel,
    siteMap: FT.config.tracking.params.siteMap,
    title: FT.config.tracking.params.title,
    assetType: FT.config.tracking.params.assetType,
    edition: FT.config.tracking.params.edition,
    brand: FT.config.tracking.params.brand,
    theme: FT.config.tracking.params.theme,
    searchQuery: '',
    campaign: ''
});

track.link.init();
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
* `pageSubsLevel`: `0` / `1` / `2` / `3`] - Subscription level of the page
* `siteMap`: `Sections.Front page` / `Sections.World` - The falcon sitemap term.
* `title`: `World business, finance, and political news from the Financial Times - FT.com` - Page title.
* `assetType`: `front` / `story` / `blog` / `video` / `section` / `page` - Asset type of the page.
* `edition`: `UK` / `USA` - Edition being looked at.
* `brand`: `` - The FT brand.
* `theme`: `` - The FT Theme
* `hurdle`: `hx` / `h1` / `h2` - The Barrier served.
* `error`: `4xx` / `5xx` / `5nn` - Is this an error page? What type?
* `searchQuery`: `` Internal (meaning onsite) search query.

### User
* `userID`: `` - A unique, persistent identifier for the user.  VERY OPTIONAL.
        Values can be a string or object. A good strategy is to pass the product's old value - used before oTracking. Then oTracking can store it as necessary.
        If passing an object - example:
        ```{
              storage: 'cookie',
              name: 'SIVISITOR',
              value: getValueFromCookie(/SIVISITOR=([\w\*]+);?/)
          }```
* `cohort`: `3` / `1` / `2` - The user's subscription level.
* `passportID`: `4009049153` - The user's passport ID.
* `country`: `GBR` - The user's country.
* `region`: `london` - The user's region.
* `metroArea`: `islington` - The user's area.

### Marketing
* `ftcamp`: `` - FT Camp parameter.
* `campaign`: `` - Campaign parameter.




# Contributing

The following will get you setup:
* Check out the code
* `npm install`
* `grunt`

The following grunt tasks are available:
* `grunt version` - bump a version number in all the files that need a version number changing.
* `grunt test` - Test the code against the test suite.


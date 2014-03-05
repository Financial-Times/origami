# Tracking module

Origami module for the FT tracking.

## Installation

Add this to your dependencies in bower.json:

     "dependencies": {
          "tracking-module": "http://git.svc.ft.com:8080/scm/track/o-tracking.git#>=0.0.4 < 1"
     }

It's strongly advised to specify at least the major and minor version as a tag.

## Module contents

## Template
*The template also relies on a Cut the Mustard check which MUST be adhered to if you are using both JS and non-JS versions.*

`tracking.mustache` expects a `tracking` object, containing the following properties:
- tracking.domain - the domain of the tracking server
- tracking.queryString - the parameters and values below compiled into a query string format.

## JavaScript
Use browserify to require main.js into your app. e.g.
```
var track = require('o-tracking');
```
Then call the init function with the parameters below.
```
track.init({ ...params... });
```

## Parameters
Both JS and non-JS versions take the same parameters.

### Config
* `developer`: `true` / `false` Turn on developer mode - which logs to console more.
* `server`: `http://trace.ft.com/` - Location of tracking server.

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
* `cohort`: `3` / `1` / `2` - The user's subscription level.
* `passportID`: `4009049153` - The user's passport ID.
* `country`: `GBR` - The user's country.
* `region`: `london` - The user's region.
* `metroArea`: `islington` - The user's area.

### Marketing
* `ftcamp`: `` - FT Camp parameter.
* `campaign`: `` - Campaign parameter.

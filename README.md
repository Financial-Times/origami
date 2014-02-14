# Tracking module

Origami module for the FT tracking.

## Installation

Add this to your depdendencies in bower.json:

     "dependencies": {
          "tracking-module": "https://github.com/Financial-Times/o-tracking.git#0.0.2"
     }

It's strongly advised to specify at least the major and minor version as a tag.

## Module contents

This module contains one asset:

* **tracking.mustache** - The template that renders the tracking HTML.

## Dependencies

This module doesn't depend on anything. Yet.

## Template

`tracking.mustache` expects a `tracking` object, containing the following properties:

### Config
* environment: `test` OR `prod` (Choose environment)
* developer: `true` (Turn on developer mode)
* server: `http://ftweb03299-lvpr-uk-d/` (Location of tracking server)

### Site
* channel : [`desktop`, `html5`, `epaper`, `flipboard`] (The product or channel)

### Page
* `url`: [`http://www.ft.com/home/uk`, document.location]
* `referrer`: ``
* `uuid`: ``
* `pageSubLevel`: [``, `0`, `1`, `2`, `3`] (Subscription level of the page)
* `siteMap`: [`Sections.Front page`, `Sections.World`]
* `title`: `World business, finance, and political news from the Financial Times - FT.com`
* `assetType`: [`front`, `story`, `blog`, `video`, `section`, `page`]
* `edition`: [`UK`, `USA`]
* `brand`: ``
* `theme`: ``
* `hurdle`: [``, `hx`, `h1`, `h2`] (Barrier)
* `error`: `` (Is this an error page?)
* `searchQuery`: `` (Internal search query)

### User
* `cohort`: [`3`, `1`, `2`]
* `passportID`: `4009049153`
* `country`: `GBR`
* `region`: `london`
* `metroArea`: `islington`

### Marketing
* `ftcamp`: ``
* `campaign`: ``

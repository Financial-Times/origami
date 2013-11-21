# Tracking module

Origami module for the FT tracking.

## Installation

Add this to your depdendencies in bower.json:

     "dependencies": {
          "tracking-module": "http://git.svc.ft.com:9080/git/origami/tracking.git#0.0.1"
     }

It's strongly advised to specify at least the major and minor version as a tag.

## Module contents

This module contains one asset:

* **tracking.mustache** - The template that renders the tracking HTML.

## Dependencies

This module doesn't depend on anything. Yet.

## Template

`tracking.mustache` expects a `environment` object, containing one property:

* `production` - Is the site in a production environment. Boolean.
# Tracking module

Origami module for the FT tracking.

## Installation

Add this to your depdendencies in bower.json:

     "dependencies": {
          "tracking-module": "https://github.com/Financial-Times/o-tracking.git#0.0.1"
     }

It's strongly advised to specify at least the major and minor version as a tag.

## Module contents

This module contains one asset:

* **tracking.mustache** - The template that renders the tracking HTML.

## Dependencies

This module doesn't depend on anything. Yet.

## Template

`tracking.mustache` expects a `tracking` object, containing the following properties:

* `domain` - The domain of the tag collector, either statstest.ft.com or stats.ft.com.
# o-overlay [![Build Status](https://travis-ci.org/Financial-Times/o-overlay.png?branch=master)](https://travis-ci.org/Financial-Times/o-overlay)

Configurable custom overlay box that can be used to show overlay windows. The overlays can also be switched to display differently on small screens.

## Installation

Run the following in your project's root directory
   
    bower install o-overlay

Then add `@import "o-overlay/main"` to your sass stylesheets and use `require('o-overlay')` in your javascript.

## Usage
The constructor function accepts two parameters: 
    * options: Documented below
    * trigger element: HTMLElement to which the overlay will be associated

You can get an array of all open overlays with the method `o-overlay#getOverlays`.

o-overlay can be instantiated in two main ways:

### Declaratively
Setting the different options as `data-attributes` on the trigger. When the trigger is clicked, you would then need to create a new Overlay object setting the options parameter as `null` and the trigger to be the target of the event.

You can also set the class `o-overlay-trigger` on the trigger and run `o-overlay#init(el)` so that all triggers that are children of the specified element (the default is `document.body`) are instantiated automatically.

Instead of running `o-overlay#init(el)`, you can also instantiate all triggers together with other Origami modules by dispatching the `o.DOMContentLoaded` event.

If at some point you want to deactivate the triggers, just run `o-overlay#destroy`.

### Imperatively
Creating a new Overlay object passing the options as a JSON object, and optionally, associating it with a trigger element.

Additionally, the overlay can be closed by

* Calling `close()` on a overlay instance

## Options

These are the options you can set for your overlay:

* heading: It's a JSON object with two options. 
    * title: Your overlay's title
    * shaded: true/false. You can choose between a shaded style or not
* modal: true/false. Choose if you want your overlay to have modal behaviour or not. Setting this as true will also add a translucent shadow between your page and the overlay
* src: It can be either a _url_ where your raw HTML is, or a _CSS selector_ to where your content is in the page. 
* html: Raw HTML string

The only option that must be set is either the *src* or the *html* one. Please keep in mind that the *html* option can't be set as a data-attribute, and if you set both, the *html* one will be used.

Data-attributes have the same name as in the JSON format, but with dashes. So for *src* it will be `data-o-overlay-src` and for the *heading.title* it will be `data-o-overlay-heading-title`.

## Styling
To use the styling provided by the module, you can either extend the sass placeholder classes, or set silent mode to false:

`$o-overlay-is-silent: false;`

## UI Notes

* Having a heading is optional, though you won't have a close button if a heading hasn't been set. If you don't need to have an overlay with a close button, please check with the design team first.
* Heading titles should be as short as possible, and must not be empty.
* Overlays should not appear on hover, and if they do there must be a 200ms dwell on the element before the overlay appears, AND it must be possible to also launch the overlay by clicking, to ensure the overlay still works on devices that lack a hoverable pointer.
* Overlays won't appear in core experience, so should not be used for any critical functionality unless you have a fallback set for it.
# o-overlay [![Build Status](https://travis-ci.org/Financial-Times/o-overlay.png?branch=master)](https://travis-ci.org/Financial-Times/o-overlay)

Configurable custom overlay box that can be used to show overlay windows. The overlays can also be switched to display differently on small screens.

## Installation

For installation info please refer to this [module's page](http://registry.origami.ft.com/components/o-overlay#section-usage) in the Origami registry.

## Usage
The constructor function accepts two parameters: 
    * id: Unique id an overlay has and that is shared by all triggers that interact with the overlay.
    * options: JSON object that configures the overlay or HTMLElement that will act as trigger and has the different options set declaratively. The different options are explained below.

### Static methods
    * `o-overlay#getOverlays`: Returns an array of all overlays
    * `o-overlay#init`: Instantiates all triggers and populates the list with the different overlays set by those triggers
    * `o-overlay#destroy`: Removes the listeners on the different triggers and empties the array of overlays

### Instantiation
o-overlay can be instantiated in two main ways:

#### Declaratively
Setting the different options as `data-attributes` on the trigger. You can then add a click event to it that creates an overlay on all triggers together with instantiating other Origami modules by setting the class `o-overlay-trigger` on your different triggers and dispatching the `o.DOMContentLoaded` event.

If you don't want to instantiate all modules at the same time, you can run `o-overlay#init(el)` so that all triggers that are children of the specified element (which will be its o-layers context and the default is `document.body`) are instantiated automatically.

If you'd rather do everything manually, when the trigger is clicked, you would then need to create a new Overlay object passing the id and the trigger as an instance of HTMLElement.

If at some point you want to deactivate the triggers, just run `o-overlay#destroy`.

#### Imperatively
Pass in an id and a configuration object to the constructor, and then run `open()` like this:

```js
var myOverlay = new Overlay('myOverlay', {
   html: "Hello world",
   trigger: document.querySelector('.blah')
});
myOverlay.open();
```

Additionally, the overlay can be closed by calling `close()` on a overlay instance

## Options

These are the options you can set for your overlay:

* heading: It's a JSON object with two options. 
    * title: Your overlay's title
    * shaded: true/false. You can choose between a shaded style or not
* modal: true/false. Choose if you want your overlay to have modal behaviour or not. Setting this as true will also add a translucent shadow between your page and the overlay
* src: It can be either a _url_ where your raw HTML is, or a _CSS selector_ to where your content is in the page. 
* html: Raw HTML string. You can't set this option declaratively
* trigger: HTMLElement or valid CSS selector. `o-overlay#init` will pass the trigger to the overlay, so this is not needed in declarative mode

The only option that must be set is either the *src* or the *html* one. Please keep in mind that the *html* option can't be set as a data-attribute, and if you set both, the *html* one will be used.

Data-attributes have the same name as in the JSON format, but with dashes. So for *src* it will be `data-o-overlay-src` and for the *heading.title* it will be `data-o-overlay-heading-title`.

_o-overlays will throw an error if the options aren't set correctly._

## Styling
To use the styling provided by the module, you can either extend the sass placeholder classes, or set silent mode to false:

`$o-overlay-is-silent: false;`

## UI Notes

* Having a heading is optional, though you won't have a close button if a heading hasn't been set. If you don't need to have an overlay with a close button, please check with the design team first.
* Heading titles should be as short as possible, and must not be empty.
* Overlays should not appear on hover, and if they do there must be a 200ms dwell on the element before the overlay appears, AND it must be possible to also launch the overlay by clicking, to ensure the overlay still works on devices that lack a hoverable pointer.
* Overlays won't appear in core experience, so should not be used for any critical functionality unless you have a fallback set for it.
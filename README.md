# o-overlay [![Build Status](https://travis-ci.org/Financial-Times/o-overlay.png?branch=master)](https://travis-ci.org/Financial-Times/o-overlay)

Configurable custom overlay box that can be used to show overlay windows. The overlays can also be switched to display differently on small screens.

## Installation

For installation info please refer to this [module's page](http://registry.origami.ft.com/components/o-overlay#section-usage) in the Origami registry.

## Usage

o-overlay can be instantiated in two ways:

### Declaratively

Set options as `data-` attributes on any element that has a `o-overlay-trigger` class, to create an overlay and open it when that element is clicked.

```html
<button class='o-overlay-trigger' data-o-overlay-src='#overlay1-content' data-o-overlay-id='overlay1'>Open!</button>
<script type='text/template' id='overlay1-content'>
   <p>Content of overlay</p>
</script>
```

To activate overlays declared in markup, you can:

* Dispatch the `o.DOMContentLoaded` event (which will also initialise all other compatible Origami modules on the page); or
* Run `o-overlay#init([el])` (optionally pass a parent element to search for trigger elements, which will form its o-layers context.  The default is `document.body`)


### Imperatively

The constructor function accepts two arguments:

* id: Unique identifer string for the overlay within the page
* options: JSON object that configures the overlayr.

```js
var myOverlay = new Overlay('myOverlay', {
   html: 'Hello world',
   trigger: '.blah'
});
```

### Option reference

* `heading`: Object. Options for the Overlay header
    * `.title`: String. Your overlay's title
    * `.shaded`: Boolean. Whether to shade the background of the header
* `arrow`: Object. Options for the arrow
    * `.position`: String. From which side of the overlay should the arrow protrude. It has to be 'top', 'bottom', 'left' or 'right'. _Default_: 'left'
    * `.target`: String or HTMLElement. What should the arrow point at. It may be different from the trigger, and if the target isn't set, the trigger will be used by default. May be either an element or a querySelector string.
* `modal`: Boolean. Whether the overlay should have modal behaviour or not. Setting this as true will add a translucent shadow between the page and the overlay
* `src`: String. Either a _url_ from which HTML to populate the overlay can be loaded, or a querySelector string identifying an element from which the textContent should be extracted. 
* `html`: String.  Raw HTML (cannot be set declaratively)
* `trigger`: String. querySelector expression (cannot be set declaratively)

The only option that must be set is either `src` or `html`. The `html` option can't be set as a `data-` attribute, and if you set both, the `html` one will override `src`.

For overlays with arrows, having a shaded heading is incompatible with positions 'top' and 'bottom', because an arrow pointing out of a shaded header looks weird.

Data- attributes have the same name as in the JSON format, but with dashes. So for `src` it will be `data-o-overlay-src` and for the `heading.title` it will be `data-o-overlay-heading-title`.

_o-overlays will throw an error if the options aren't set correctly._


## API

### Static methods

* `getOverlays()`: Returns an array of all overlays on the page
* `init([el])`: Instantiates Overlays for all `o-overlay-trigger` elements within `el` (or `document.body` if not specified)
* `destroy()`: Destroys all Overlay objects and unbinds event handlers from trigger elements.

### Object methods

* `open`: Display the overlay.  Content is loaded every time the overlay is opened.
* `close`: Close (hide) the overlay.

## Arrows

Optionally, an overlay can be displayed to be pointing at a target element. The arrow can come out of any of the overlay's four sides and the preferred position is set as a config option. However, if the overlay doesn't fit next to the trigger in the default position, the module will check if it fits in the opposite position and change it if that is the case. This is not a permanent change, it's only until there is space again in the default position.

Overlays with arrows can't be modal.


## Styling

To use the styling provided by the module, you can either extend the sass placeholder classes, or set silent mode to false:

`$o-overlay-is-silent: false;`

Please keep in mind that, currently, setting your own prefix for class names in Javascript isn't supported, but it will be in a future update.

## UI Notes

* Having a heading is optional, though you won't have a close button if a heading hasn't been set. If you don't need to have an overlay with a close button, please check with the design team first.
* Heading titles should be as short as possible, and must not be empty.
* Overlays should not appear on hover, and if they do there must be a 200ms dwell on the element before the overlay appears, AND it must be possible to also launch the overlay by clicking, to ensure the overlay still works on devices that lack a hoverable pointer.
* Overlays won't appear in core experience, so should not be used for any critical functionality unless you have a fallback set for it.

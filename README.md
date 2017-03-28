# o-overlay [![Build Status](https://circleci.com/gh/Financial-Times/o-overlay.png?style=shield&circle-token=c4f56f04215e38c04bec85cd382cd41c863dd8e8)](https://circleci.com/gh/Financial-Times/o-overlay)

Configurable custom overlay box that can be used to show overlay windows. The overlays can also be switched to display differently on small screens.

## Installation

For installation info please refer to this [module's page](http://registry.origami.ft.com/components/o-overlay#section-usage) in the Origami registry.

## Browser support

Tested and working on:

|  Browsers  | Primary Experience |
|:----------:|:------------------:|
|   Chrome   |        35+         |
|   Firefox  |        30+         |
|   Safari   |        7+          |
|     IE     |        8+          |
|    iOS     |        7+          |

Known issues:

* IE11-IE8 require the [polyfill service](polyfill.webservices.ft.com).
* IE8 throws an error when closing the Overlay starting on the second time. It works like expected in spite of the error.
* Safari and Chrome mobile [don't support](http://caniuse.com/#feat=autofocus) the autofocus attribute. In Chrome mobile, you can use the `.focus()` function on an element when `oOverlay.ready` is dispatched to simulate the behaviour.
* In Safari mobile on iOS8, autofocus is [buggy](http://stackoverflow.com/questions/26146252/in-ios8-using-focus-will-show-virtual-keyboard-and-scroll-page-after-touch) and is triggered after the overlay has loaded and a _touchdown_ event is dispatched after that. That means that if you click anywhere on the page after the page loads, the keyboard will come up which will most likely produce unexpected behaviours. We recommend not using autofocus in iOS 8. These unexpected behaviours only occur the first time an overlay is rendered, after that, autofocus won't be activated.

## Usage

o-overlay can be instantiated in two ways:

### Declaratively

Set options as `data-` attributes on any element that has a `o-overlay-trigger` class, to create an overlay and open it when that element is clicked.

```html
<button class="o-overlay-trigger" data-o-overlay-src="#overlay1-content" data-o-overlay-id="overlay1">Open!</button>
<script type="text/template" id="overlay1-content">
	<p>Content of overlay</p>
</script>
```

To activate overlays declared in markup, you can:

* Dispatch the `o.DOMContentLoaded` event (which will also initialise all other compatible Origami modules on the page); or
* Run `o-overlay#init([el])` (optionally pass a parent element to search for trigger elements, which will form its o-layers context.  The default is `document.body`)

### Imperatively

The constructor function accepts two arguments:

* id: Unique identifer string for the overlay within the page
* options: JSON object that configures the overlay.

```js
var myOverlay = new Overlay('myOverlay', {
	html: 'Hello world',
	trigger: '.blah'
});
```

### Option reference

* `heading`: Object. Options for the Overlay header
	* `.title`: String. Your overlay's title
	* `.visuallyHideTitle`: Boolean. If you want to provide a different title style, this option will prevent the title span from being added to the overlay. (In this case the title is only used for `aria` labelling)
	* `.shaded`: Boolean. Whether to shade the background of the header
* `arrow`: Object. Options for the arrow
	* `.position`: String. From which side of the overlay should the arrow protrude. It has to be 'top', 'bottom', 'left' or 'right'. _Default_: 'left'
	* `.target`: String or HTMLElement. What should the arrow point at. It may be different from the trigger, and if the target isn't set, the trigger will be used by default. May be either an element or a querySelector string.
* `modal`: Boolean. Whether the overlay should have modal behaviour or not. Setting this as true will add a translucent shadow between the page and the overlay
* `compact`: Boolean. If true, the `.o-overlay--compact` class will be added to the overlay that reduces heading font-size and paddings in the content.
* `src`: String. Either a _url_ from which HTML to populate the overlay can be loaded, or a querySelector string identifying an element from which the textContent should be extracted.
* `html`: String or HTMLElement.  Raw HTML (cannot be set declaratively)
* `trigger`: String or HTMLElement. querySelector expression or HTMLElement. When there's a trigger set, a click event handler will be added to it that will open or close the overlay accordingly. (cannot be set declaratively)
* `zindex`: String. Value of the CSS z-index property of the overlay. _Default set via CSS_: '10'
* `preventclosing`: Boolean. Prevents closure of overlay via standard x button or escape key. For use when you are directing the user to somewhere else. Only valid with modal set to true.
* `customclose`: Boolean. If you do not use the header, but want to provide a close button in your html / src (with a class of `o-overlay__close`), setting customclose to true will attach o-overlay's close handler function to that button.
* `parentNode`: String. Should be a query selector for a DOM element. If set, the overlay will be appended as a child of this rather than the document body or target. If multiple nodes are matched, it will use the first. If nothing matches this selector, the `body` will be used.
* `nested`: Boolean. If set to true, the resize listeners will not be set up. This boolean should be used in conjunction with the `parentNode` setting to allow an overlay to be positioned within a DOM element rather than overlaid on top of everything. Defaults to false.

The only option that must be set is either `src` or `html`. The `html` option can't be set as a `data-` attribute, and if you set both, the `html` one will override `src`.

For overlays with arrows, having a shaded heading is incompatible with positions 'top' and 'bottom', because an arrow pointing out of a shaded header looks weird.

For compact overlays, headings can't be shaded as this looks weird too.

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

## Events

We implement [o-layers](https://github.com/Financial-Times/o-layers) events:

* `oLayers.new`: It's dispatched right before the layer appears
* `oLayers.close`: It's dispatched right after the layer is removed

We also dispatch custom events:

* `oOverlay.ready`: Dispatched when the overlay is loaded in the DOM
* `oOverlay.destroy`: Dispatched when the overlay is removed from the DOM

## Sass

`o-overlay` supports silent mode, so there are mixins for the different elements. If you want to get all the classes styled by default, you'll need to turn of silent mode:

```scss
$o-overlay-is-silent: false;
```

## UI Notes

* Having a heading is optional, though you won't have a close button if a heading hasn't been set. If you don't need to have an overlay with a close button, please check with the design team first.
* Heading titles should be as short as possible, and must not be empty.
* Overlays should not appear on hover, and if they do there must be a 200ms dwell on the element before the overlay appears, AND it must be possible to also launch the overlay by clicking, to ensure the overlay still works on devices that lack a hoverable pointer.
* Overlays won't appear in core experience, so should not be used for any critical functionality unless you have a fallback set for it.

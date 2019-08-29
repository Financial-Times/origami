# o-overlay [![Build Status](https://circleci.com/gh/Financial-Times/o-overlay.png?style=shield&circle-token=c4f56f04215e38c04bec85cd382cd41c863dd8e8)](https://circleci.com/gh/Financial-Times/o-overlay) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

Configurable custom overlay box that can be used to show overlay windows. The overlays can also be switched to display differently on small screens.

- [Usage](#usage)
	- [Declarative](#declarative)
	- [Imperative](#imperative)
	- [Option reference](#option-reference)
	- [Sass](#sass)
- [API](#api)
- [Troubleshooting](#troubleshooting)
- [Migration Guide](#migration-guide)
- [Contact](#contact)
- [Licence](#licence)

## Usage

o-overlay can be instantiated in two ways:

### Declarative

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

### Imperative

The constructor function accepts two arguments:

* id: Unique identifier string for the overlay within the page
* options: JSON object that configures the overlay

```js
var myOverlay = new Overlay('myOverlay', {
	html: 'Hello world',
	trigger: '.blah'
});
```

### Option reference

* `heading`: Object. Options for the Overlay header
	* `.title`: String. Your overlay's title
	* `.visuallyhidetitle`: Boolean. If you want to provide a different title style, this option will prevent the title span from being added to the overlay. (In this case the title is only used for `aria` labelling) _Default_: false.
	* `.shaded`: Boolean. Whether to shade the background of the header
* `modal`: Boolean. Whether the overlay should have modal behaviour or not. This will add a translucent shadow between the page and the overlay. Modal overlays also disable scroll on the underlying document. _Default_: true.
* `fullscreen`: Boolean. If set to true, the overlay will display full screen. This overlay disables scroll on the underlying document and is dismissible with the back button.
* `compact`: Boolean. If true, the `.o-overlay--compact` class will be added to the overlay that reduces heading font-size and paddings in the content.
* `src`: String. Either a _url_ from which HTML to populate the overlay can be loaded, or a querySelector string identifying an element from which the textContent should be extracted.
* `html`: String or HTMLElement.  Raw HTML (cannot be set declaratively)
* `class`: String. The custom classes to apply to to the overlay e.g. `o-overlay--my-modifier`.
* `trigger`: String or HTMLElement. querySelector expression or HTMLElement. When there's a trigger set, a click event handler will be added to it that will open or close the overlay accordingly. (cannot be set declaratively)
* `zindex`: String. Value of the CSS z-index property of the overlay. _Default set via CSS_: '10'
* `preventclosing`: Boolean. Prevents closure of overlay via standard x button or escape key. For use when you are directing the user to somewhere else. Only valid with modal set to true.
* `customclose`: Boolean. If you do not use the header, but want to provide a close button in your html / src (with a class of `o-overlay__close`), setting customclose to true will attach o-overlay's close handler function to that button.
* `parentnode`: String. Should be a query selector for a DOM element. If set, the overlay will be appended as a child of this rather than the document body or target. If multiple nodes are matched, it will use the first. If nothing matches this selector, the `body` will be used.
* `nested`: Boolean. If set to true, the resize and escape key listeners will not be set up. This boolean should be used in conjunction with the `parentnode` setting to allow an overlay to be positioned within a DOM element rather than overlaid on top of everything. _Default_: false.
* `nofocus`: Boolean. If set to true, the tabindex will not be set on the wrapper element. Useful in conjunction with the `nested` and `parentnode` options. _Default_: false.
* `layer`: Boolean. If set to true, the overlay will be treated as an o-layer, firing oLayers.new and oLayers.close events when created and destroyed, and closing itself when another oLayers.new event fires. You may want to set this to false if using a `nested` overlay. _Default_: true.

The only option that must be set is either `src` or `html`. The `html` option can't be set as a `data-` attribute, and if you set both, the `html` one will override `src`.

For compact overlays, headings can't be shaded as this looks weird too.

Data- attributes have the same name as in the JSON format, but with dashes. So for `src` it will be `data-o-overlay-src` and for the `heading.title` it will be `data-o-overlay-heading-title`.

_o-overlays will throw an error if the options aren't set correctly._

### Sass

O-overlay contains styles for the container (eg border and shadow) and layout styles (to place the overlay above the page content). It does not come with typographic styles, background colours, or buttons. Implementing projects should add these.

`o-overlay` supports silent mode, so there are mixins for the different elements. If you want to get all the classes styled by default, you'll need to turn of silent mode:

```scss
$o-overlay-is-silent: false;
```

## API

### Static methods

* `getOverlays()`: Returns an array of all overlays on the page
* `init([el])`: Instantiates Overlays for all `o-overlay-trigger` elements within `el` (or `document.body` if not specified)
* `destroy()`: Destroys all Overlay objects and unbinds event handlers from trigger elements.

### Object methods

* `open`: Display the overlay.  Content is loaded every time the overlay is opened.
* `close`: Close (hide) the overlay.
* `realign`: Realign the overlay. Useful when overlay content changes whilst the overlay is open.

## Events

We implement [o-layers](https://github.com/Financial-Times/o-layers) events:

* `oLayers.new`: It's dispatched right before the layer appears
* `oLayers.close`: It's dispatched right after the layer is removed

We also dispatch custom events:

* `oOverlay.ready`: Dispatched when the overlay is loaded in the DOM
* `oOverlay.destroy`: Dispatched when the overlay is removed from the DOM

# Troubleshooting

* IE11-IE8 require the [polyfill service](polyfill.webservices.ft.com).
* IE8 throws an error when closing the Overlay starting on the second time. It works like expected in spite of the error.
* Safari and Chrome mobile [don't support](http://caniuse.com/#feat=autofocus) the autofocus attribute. In Chrome mobile, you can use the `.focus()` function on an element when `oOverlay.ready` is dispatched to simulate the behaviour.
* In Safari mobile on iOS8, autofocus is [buggy](http://stackoverflow.com/questions/26146252/in-ios8-using-focus-will-show-virtual-keyboard-and-scroll-page-after-touch) and is triggered after the overlay has loaded and a _touchdown_ event is dispatched after that. That means that if you click anywhere on the page after the page loads, the keyboard will come up which will most likely produce unexpected behaviours. We recommend not using autofocus in iOS 8. These unexpected behaviours only occur the first time an overlay is rendered, after that, autofocus won't be activated.

## Migration Guide

## Migrating from 1.X.X to 2.X.X
- Arrows functionality has now been removed. __Resolution__ If you need an overlay with an arrow, please use [o-tooltip](http://github.com/financial-times/o-tooltip).
- A dependency on [o-icons](http://github.com/financial-times/o-icons) v4 or v5 has been introduced. This will break any builds that use o-icons <v3. __Resolution__: Ideally you should upgrade to o-icons v5, but if you still need to use the old icon set (in v4) then upgrading to o-icons v4 will also work.
- A dependency on [o-visual-effects](http://github.com/financial-times/o-visual-effects) v1 has been introduced. This will break any builds that use o-visual-effects <v1. __Resolution__: Update to v1 of o-visual-effects.
- A dependency on [o-normalise](http://github.com/financial-times/o-normalise) v1 has been introduced. This is not likely to introduce any conflicts as it is only v1.
- The mixin oOverlayCompactCloseIcon (deprecated in v1.3.0) has been removed. __Resolution__ Use the `@oOverlayCloseIcon` mixin.
- All extends (deprecated in v1.2.0) have been removed. __Resolution__: Use the mixins instead.
- The o-colors and o-visual-effects dependencies have been bumped to the latest major. These will create bower conflicts which should be resolved by updating to the newest release of o-colors and o-visual-effects.
---

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-overlay/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

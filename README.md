# o-overlay [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

Configurable custom overlay box that can be used to show overlay windows. The overlays can also be switched to display differently on small screens.

- [Usage](#usage)
- [Markup](#markup)
- [Sass](#sass)
- [JavaScript](#javascript)
	- [Declarative](#declarative)
	- [Imperative](#imperative)
	- [Option reference](#option-reference)
	- [API Overview](#api-overview)
- [Events](#events)
- [Troubleshooting](#troubleshooting)
- [Migration Guide](#migration-guide)
- [Contact](#contact)
- [Licence](#licence)

## Usage

Check out [how to include Origami components in your project](https://origami.ft.com/docs/components/#including-origami-components-in-your-project) to get started with `o-overlay`.

## Markup

A new overlay may be created [imperatively](#imperative) with JavaScript, without any markup. Alternatively, define an overlay declaratively by adding a template of overlay content and a button to open the overlay.

To define a template add the following `script` tag with the content of your overlay. Ensure you specify a unique `id` for your template:

```html
<script type="text/template" id="overlay1-content">
	<p>Content of overlay</p>
</script>
```

Then add a trigger `button` with the class `o-overlay-trigger`, which will open the overlay on click. Connect the trigger to your overlay by specifying the template `id` in `data-o-overlay-src` with a `#` (in the format of an [id selector](https://developer.mozilla.org/en-US/docs/Web/CSS/ID_selectors)). Then name your overlay with a unique id using the `data-o-overlay-id` attribute.

```html
<button class="o-overlay-trigger" data-o-overlay-src="#overlay1-content" data-o-overlay-id="overlay1">Open!</button>
```

Configure [overlay options](#option-reference) by adding them as data attributes to the trigger element, `data-o-overlay-[OPTION]`. For instance add `data-o-overlay-compact="true"` for a compact overlay:

```html
<button class="o-overlay-trigger" data-o-overlay-src="#overlay1-content" data-o-overlay-id="overlay1" data-o-overlay-compact="true">Open!</button>
```

## Sass

Include the `oOverlay` mixin to output style for all `o-overlay` features:

```scss
@include oOverlay();
```

```css
.o-overlay {
	/* styles */
}
.o-overlay--compact {
	/* styles */
}
.o-overlay--full-screen {
	/* styles */
}
/* etc. */
```

To specify specific variants to output styles for pass options (see [variants](#variants) for available options).

For example, to output only the base styles and the `compact` variant, ignoring other variants:

```scss
@include oOverlay($opts: (
	'variants': ('compact')
));
```

```css
.o-overlay {
	/* styles */
}
.o-overlay--compact {
	/* styles */
}
```

### Variants

This table outlines all of the possible variants you can request in the [`oOverlay` mixin](#mixin-ooverlay):

| Size          | Notes               | Brand support                |
|---------------|---------------------|------------------------------|
| compact       | Included by default | master, internal, whitelabel |
| full-screen   | Included by default | master, internal, whitelabel |
| header-shaded | Included by default | master, internal, whitelabel |

## JavaScript

### Declarative

JavaScript is initialised on `o-overlay` elements automatically for [Origami Build Service](https://www.ft.com/__origami/service/build/v2/) users. If your project is using a manual build process, [initialise `o-overlay` manually](https://origami.ft.com/docs/components/initialising/).

For example call the `init` method to initialise all `o-overlay` instances in the document:
```js
import oOverlay from 'o-overlay';
oOverlay.init();
```

Or pass an element to initialise a specific `o-overlay` instance:
```js
import oOverlay from 'o-overlay';
const oOverlayElement = document.getElementById('#my-o-overlay-element');
oOverlay.init(oOverlayElement);
```

### Imperative

You may also construct a new overlay without existing `o-overlay` elements. The constructor accepts two arguments:

* id: Unique identifier string for the overlay within the page
* options: JSON object that configures the overlay

```js
var myOverlay = new Overlay('myOverlay', {
	html: 'Hello world',
	trigger: '.blah'
});
```

### Option reference

- `heading`: Object. Options for the Overlay header
	- `.title`: String. Your overlay's title
	- `.visuallyhidetitle`: Boolean. If you want to provide a different title style, this option will prevent the title span from being added to the overlay. (In this case the title is only used for `aria` labelling) _Default_: false.
	- `.shaded`: Boolean. Whether to shade the background of the header. Note: for this to work properly, the `heading-shaded` variant must be included with the CSS (it is by default)
- `modal`: Boolean. Whether the overlay should have modal behaviour or not. This will add a translucent shadow between the page and the overlay. Modal overlays also disable scroll on the underlying document. _Default_: true.
- `fullscreen`: Boolean. If set to true, the overlay will display full screen. This overlay disables scroll on the underlying document and is dismissible with the back button. Note: for this to work properly, the `full-screen` variant must be included with the CSS (it is by default)
- `compact`: Boolean. If true, the `.o-overlay--compact` class will be added to the overlay that reduces heading font-size and paddings in the content. Note: for this to work properly, the `compact` variant must be included with the CSS (it is by default)
- `src`: String. Either a _url_ from which HTML to populate the overlay can be loaded, or a querySelector string identifying an element from which the textContent should be extracted.
- `html`: String or HTMLElement.  Raw HTML (cannot be set declaratively)
- `class`: String. The custom classes to apply to to the overlay e.g. `o-overlay--my-modifier`.
- `trigger`: String or HTMLElement. querySelector expression or HTMLElement. When there's a trigger set, a click event handler will be added to it that will open or close the overlay accordingly. (cannot be set declaratively)
- `zindex`: String. Value of the CSS z-index property of the overlay. _Default set via CSS_: '10'
- `preventclosing`: Boolean. Prevents closure of overlay via standard x button or escape key. For use when you are directing the user to somewhere else. Only valid with modal set to true.
- `customclose`: Boolean. If you do not use the header, but want to provide a close button in your html / src (with a class of `o-overlay__close`), setting customclose to true will attach o-overlay's close handler function to that button.
- `parentnode`: String. Should be a query selector for a DOM element. If set, the overlay will be appended as a child of this rather than the document body or target. If multiple nodes are matched, it will use the first. If nothing matches this selector, the `body` will be used.
- `nested`: Boolean. If set to true, the resize and escape key listeners will not be set up. This boolean should be used in conjunction with the `parentnode` setting to allow an overlay to be positioned within a DOM element rather than overlaid on top of everything. _Default_: false.
- `nofocus`: Boolean. If set to true, the tabindex will not be set on the wrapper element. Useful in conjunction with the `nested` and `parentnode` options. _Default_: false.
- `layer`: Boolean. If set to true, the overlay will be treated as an o-layer, firing oLayers.new and oLayers.close events when created and destroyed, and closing itself when another oLayers.new event fires. You may want to set this to false if using a `nested` overlay. _Default_: true.

The only option that must be set is either `src` or `html`. The `html` option can't be set as a `data-` attribute, and if you set both, the `html` one will override `src`.

For compact overlays, headings can't be shaded as this looks weird too.

Data- attributes have the same name as in the JSON format, but with dashes. So for `src` it will be `data-o-overlay-src` and for the `heading.title` it will be `data-o-overlay-heading-title`.

_o-overlays will throw an error if the options aren't set correctly._

### API Overview

#### Static methods

* `getOverlays()`: Returns an array of all overlays on the page
* `init([el])`: Instantiates Overlays for all `o-overlay-trigger` elements within `el` (or `document.body` if not specified)
* `destroy()`: Destroys all Overlay objects and unbinds event handlers from trigger elements.

#### Object methods

* `open`: Display the overlay.  Content is loaded every time the overlay is opened.
* `close`: Close (hide) the overlay.
* `realign`: Realign the overlay. Useful when overlay content changes whilst the overlay is open.

## Events

We implement [o-layers](https://github.com/Financial-Times/o-layers) events:

* `oLayers.new`: It's dispatched right before the layer appears
* `oLayers.close`: It's dispatched right after the layer is removed

We also dispatch custom events:

### oOverlay.ready:
`oOverlay.ready` is dispatched when the overlay is loaded in the DOM. 

The event detail has the following properties:
- `detail.instance` the initialised `o-overlay` instance

### oOverlay.ready

`oOverlay.destroy` is dispatched when the overlay is removed from the DOM

## Troubleshooting

* IE11-IE8 require the [polyfill service](polyfill.webservices.ft.com).
* IE8 throws an error when closing the Overlay starting on the second time. It works like expected in spite of the error.
* Safari and Chrome mobile [don't support](http://caniuse.com/#feat=autofocus) the autofocus attribute. In Chrome mobile, you can use the `.focus()` function on an element when `oOverlay.ready` is dispatched to simulate the behaviour.
* In Safari mobile on iOS8, autofocus is [buggy](http://stackoverflow.com/questions/26146252/in-ios8-using-focus-will-show-virtual-keyboard-and-scroll-page-after-touch) and is triggered after the overlay has loaded and a _touchdown_ event is dispatched after that. That means that if you click anywhere on the page after the page loads, the keyboard will come up which will most likely produce unexpected behaviours. We recommend not using autofocus in iOS 8. These unexpected behaviours only occur the first time an overlay is rendered, after that, autofocus won't be activated.

## Migration Guide

| State | Major Version | Last Minor Release | Migration guide |
| :---: | :---: | :---: | :---: |
| ✨ active | 3 | N/A | [migrate to v3](MIGRATION.md#migrating-from-v2-to-v3) |
| ⚠ maintained | 2 | 2.7 | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
| ╳ deprecated | 1 | 1.17.0 | N/A |

---

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-overlay/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).

---

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

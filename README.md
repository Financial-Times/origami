o-lazy-load [![Circle CI](https://circleci.com/gh/Financial-Times/o-lazy-load/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/o-lazy-load/tree/master)
=================

This component provides flexible lazy loading functionality for images, pictures, iframes and more. It is powered by [lozad.js] which uses the Intersection Observer API to detect when elements enter the viewport.

- [Usage](#usage)
	- [Markup](#markup)
	- [JavaScript](#javascript)
	- [Sass](#sass)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Contact](#contact)
- [Licence](#licence)

[lozad.js]: (https://github.com/ApoorvSaxena/lozad.js)

## Usage

### Markup

The most common use case for lazy loading is for images. To start append each image element with the `o-lazy-target` class name.

```html
<img class="o-lazy-target" data-src="path/to/image.jpg">
```

When content loads it can cause a jarring reflow of the page. If you are implementing a page with a static width you may wish to apply `width` and `height` attributes to your image elements but if you are working on a responsive site you may prefer to use placeholder elements which reserve space for the content to load into.

This component provides classes to create placeholder elements and class names are provided to reserve space for content with 16:9, 16:10, 3:2, 4:3, or 1:1 aspect ratios.

```html
<div class="o-lazy-placeholder o-lazy-placeholder--16:9">
	<img class="o-lazy-target" data-src="path/to/image.jpg" alt="">
</div>
```

Aspect ratio classes may be configured if you are implementing your own Sass build process but if you are using the Build Service, or are calculating aspect ratios dynamically, you can also use a placeholder `<div>` element to apply percentage based padding ([the padding hack](https://css-tricks.com/aspect-ratio-boxes/)):

```html
<div class="o-lazy-placeholder">
	<div style="padding-bottom: 56.25%"></div>
	<img class="o-lazy-target" data-src="path/to/image.jpg" alt="">
</div>
```

This component can also load iframes, background images, and add class names as well as handle images. See the [lozad.js] documentation for more information.

### JavaScript

No code will run automatically unless you are using the Build Service.
You must either construct an `o-lazy-load` object or fire the `o.DOMContentLoaded` event, which oComponent listens for. By default either method will initialise this component and observe all matching elements in the document.

#### Constructing o-lazy-load

```js
import OLazyLoad from 'o-lazy-load';

const lazyLoad = new OLazyLoad();
```

The `OLazyLoad` class constructor accepts a map of options, the options currently available are:

- `selector` A CSS selector to match the elements to lazy load
- `rootMargin` https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin
- `threshold` https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/thresholds
- `loaded` A callback function which receives the element loaded

See the [lozad.js] documentation for full usage information and examples.

#### Firing an oDomContentLoaded event

```js
document.addEventListener('DOMContentLoaded', function () {
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
```

#### Updating observed targets

If you are loading new or extra content into your document, either via AJAX or when building single-page application you may need to update the targets being observed. To do this you can call the `.observe()` method.

```js
import OLazyLoad from 'o-lazy-load';

const lazyLoad = new OLazyLoad();

// ... some logic to update the page ...

lazyload.observe();
```

### Sass

As with all Origami components, o-lazy-load has a [silent mode](http://origami.ft.com/docs/syntax/scss/#silent-styles). To use its compiled CSS (rather than using its mixins with your own Sass) set `$o-lazy-load-is-silent : false;` in your Sass before you import the o-lazy-load Sass.

This component currently provides two mixins for styling image and picture elements:

- `oLazyLoadImage($class)` adds a fade in effect when images are loaded
- `oLazyLoadImagePlaceholder($class)` provides styles for creating placeholder elements

## Troubleshooting
_This is a good place to put problems that come up repeatedly_

### The thing with the thing isn't working
Fix it by turning it off and on again

## Contributing
If your component is particularly complicated (image sets fall into this category) then a contributing section or even a contributing.md might be useful.

---

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-lazy-load/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

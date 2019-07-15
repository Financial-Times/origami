o-share [![Build Status](https://circleci.com/gh/Financial-Times/o-share.png?style=shield&circle-token=38faae5e0f0b4e39810a511b4004f396aff8718a)](https://circleci.com/gh/Financial-Times/o-share) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)
=======

Social media buttons.

* Provides the ability to share a URL provided by the product
* Uses a standard set of social media icons.


---

- [Usage](#usage)
	- [Markup](#markup)
	- [JavaScript](#javascript)
	- [Sass](#sass)
- [Migration guide](#migration-guide)
- [Contact](#contact)
- [Licence](#licence)

## Usage

### Markup

The simplest markup you might need looks like this:

```html
<div data-o-component="o-share"
    class="o-share"
    data-o-share-links="{{links}}"
    data-o-share-url="{{url}}"
    data-o-share-title="{{title}}"
    data-o-share-titleExtra="{{titleExtra}}"
    data-o-share-summary="{{summary}}"
    data-o-share-relatedTwitterAccounts="{{relatedTwitterAccounts}}">
</div>
```

The different options are:

* `links`: List of lower case social networks to be added separated by a space.
* `url`: The URL to be shared.
* `title`: The title of the content to be shared
* `titleExtra`: Any additional text relating to the title, e.g. site _section_.
* `summary`: Summary text to be shared.
* `relatedTwitterAccounts`: Comma-separated list of Twitter accounts to encourage the user to follow. See [Twitter intents](https://dev.twitter.com/docs/intents) for more info.

The different social networks are (in the order suggested by the design team):

* Twitter
* Facebook (note: Facebook doesn't accept meta data attributes in the same way as the other sharing services, instead the [Facebook Crawler](https://developers.facebook.com/docs/sharing/webmasters/crawler) uses internal heuristics to make a best guess about the title, description, and preview image for your content. You can provide specifics for these attributes to facebook by using [Open Graph meta tags](https://developers.facebook.com/docs/sharing/webmasters#markup))
* Linkedin
* Whatsapp (note: this link does nothing if Whatsapp is not installed)
* Pinterest

The following social networks are deprecated, and will be removed in the next major release:
* Google+ (written as 'googleplus' in the `links` config option)

#### Core experience

To support core experience, you need to include the [complete markup](https://github.com/Financial-Times/o-share/blob/master/demos/src/main.mustache) directly.

Social media share buttons will function as plain `<a>` elements (and can be set to `target="_blank"` if the product wishes.

### JavaScript

To instantiate the JavaScript:

```javascript
var oShare = require('o-share');
var oShareInstance = new oShare(document.querySelector('[data-o-component=o-share]'));
```

The markup will be generated for that instance of `o-share`.

You can also instantiate all instances in your page by running `oShare.init` which returns an array with all of them.

Alternatively, an `o.DOMContentLoaded` event can be dispatched on the `document` to run `#init()`:

```js
document.addEventListener("DOMContentLoaded", function() {
    document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
```

Check out the [API docs](https://registry.origami.ft.com/components/o-share@6.4.4/jsdoc)

#### Events

The following events are fired by o-share.

- [oShare.ready](#oshareready)
- [oShare.open](#oshareopen)

##### oShare.ready

`oShare.ready` fires when a o-share instance has been initialised.

The event provides the following properties:
- `detail.share` - The initialised o-share instance.

##### oShare.open

`oShare.open` fires when a social network share action is triggered, to open a new window.

The event provides the following properties:
- `detail.share` - The o-share instance.
- `detail.action` - The kind of share i.e. "social".
- `detail.url` - The social share url opened.

### Sass

```scss
@import 'o-share/main';
```

We also support silent mode. So if you want to use all the default `o-share` classes, you need to set it to false:

```scss
$o-share-is-silent: false;
```

If not, you can just use our mixins to set you custom class.

Check out the [API docs](http://registry.origami.ft.com/components/o-share#docs-css)

## Migration guide

### Migrating from v5.x.x to v6.x.x

o-share v6 introduces a breaking change that you may need to update in your product:

It may help to look at the [changes made to the demo markup](https://github.com/Financial-Times/o-share/pull/100/commits/a7bb5de62d16bd4b4610d80e1c863e32335bf548#diff-bf0fb135efa69a14d71d3a973a919ad5)

- CSS type selectors that were used to apply styles to the `<i>` tag have been removed so an additional class is required.
- We recommended you also use a semantically correct tag instead of the `<i>`.

```diff
<a href="#">
-	<i>
+	<span class="o-share__text">
		Share on Twitter
-	</i>
+	</span>
</a>
```

- CSS type selectors that were used to apply styles to `<a>` and `<button>` tag have been removed so an additional class is required.
- The original class names on `<a>` and `<button>` tags have been removed.

```diff
<a
-class="o-share__action--icon"
+class="o-share__icon o-share__icon--twitter"
href="#">
	<span class="o-share__text">
		Share on Twitter
	</span>
</a>
```

```diff
<button
-class="o-share__action--icon"
+class="o-share__icon o-share__icon--mail"
>
	<span class="o-share__text">
		Share via Email
	</span>
</button>
```
- The BEM modifier used to vary the social platform type has been removed from the element with the `o-share__action` class.

```diff
<li class="o-share__action
-o-share__action--twitter
">
	<a class="o-share__icon o-share__icon--twitter" href="#">
    	<span class="o-share__text">
        	Share on Twitter
    	</span>
	</a>
</li>
```

### Migrating from v4.x.x to v5.x.x

o-share v5 introduces a breaking change that you may need to update in your product:

- buttons and anchor elements require an extra class (`o-share__action--icon`) to avoid specificity issues with other components that use `o-icons`
```diff
<a
+class="o-share__action--icon"
href="#"><i>Icon</i></a>
<button
+class="o-share__action--icon"
><i>Icon</i></button>
```
### Migrating from v3.x.x to v4.x.x

o-share v4 introduces a few breaking changes that you may need to update in your product:

  - V4 introduces the new major version of `o-colors`. Updating to this new version will mean updating any other components that you have which are using `o-colors`
  - the link share option has been removed

### Migrating from v2.x.x to v3.x.x

o-share v3 introduces a few breaking changes that you may need to update in your product:


  - button size has increased from 36px to 40px which might effect the surrounding elements of your design
  - the Reddit share option has been removed
  - the URL share option has been renamed from `o-share__action--url` to `o-share__action--link`


---

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-share/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

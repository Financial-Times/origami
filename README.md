o-share [![Build Status](https://circleci.com/gh/Financial-Times/o-share.png?style=shield&circle-token=38faae5e0f0b4e39810a511b4004f396aff8718a)](https://circleci.com/gh/Financial-Times/o-share) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)
=======

Social media buttons.

* Provides the ability to share a URL provided by the product
* Uses a standard set of social media icons.


---

- [Markup](#markup)
- [Sass](#sass)
- [JavaScript](#javascript)
- [Migration Guide](#migration)
- [Contact](#contact)
- [Licence](#licence)


## Markup

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

### Core experience

To support core experience, you need to include the [complete markup](https://github.com/Financial-Times/o-share/blob/master/demos/src/main.mustache) directly.

Social media share buttons will function as plain `<a>` elements (and can be set to `target="_blank"` if the product wishes.

## Sass

```scss
@import 'o-share/main';
```

The `oShare` mixin is used to output the `o-share` styles.

```scss
@include oShare();
```

We recommend passing the `oShare` mixin an optional argument `$opts`, to specify styles granularly and keep your CSS bundle small.

For example:
```scss
@include oShare($opts: (
    'sizes': ('small'), // output styles for a small variation of o-share i.e. o-share--small
    'vertical': true, // output styles for a vertical o-share i.e. o-share--vertical
    'icons': ('twitter', 'facebook', 'whatsapp') // output styles for select share icons
));
```

All `$opts` options include:
- `icons` (list) a list of social share icons to output. One or more of:
    - `twitter`
    - `facebook`
    - `linkedin`
    - `link`
    - `share`
    - `mail`
    - `pinterest`
    - `whatsapp`
- `sizes` (list, optional) output styles for different size variants of `o-share`
    - `small` - a variant to make o-share smaller than default, i.e. `o-share--small`
- `vertical` (boolean) - Whether to output styles for the vertical variant, i.e `o-share--vertical`
- `inverse` (boolean) - Whether to output the inverse theme for dark backgrounds, i.e `o-share--inverse`

## JavaScript

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

Check out the [API docs](https://registry.origami.ft.com/components/o-share/jsdoc)

### Events

The following events are fired by o-share.

- [oShare.ready](#oshareready)
- [oShare.open](#oshareopen)

#### oShare.ready

`oShare.ready` fires when a o-share instance has been initialised.

The event provides the following properties:
- `detail.share` - The initialised o-share instance.

#### oShare.open

`oShare.open` fires when a social network share action is triggered, to open a new window.

The event provides the following properties:
- `detail.share` - The o-share instance.
- `detail.action` - The kind of share i.e. "social".
- `detail.url` - The social share url opened.

---

## Migration

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 7 | N/A  | [migrate to v7](MIGRATION.md#migrating-from-v6-to-v7) |
⚠ maintained | 6 | 6.5  | [migrate to v6](MIGRATION.md#migrating-from-v5-to-v6) |
╳ deprecated | 5 | 5.0  | [migrate to v5](MIGRATION.md#migrating-from-v4-to-v5) |
╳ deprecated | 4 | 4.0  | [migrate to v4](MIGRATION.md#migrating-from-v3-to-v4) |
╳ deprecated | 3 | 3.0  | [migrate to v3](MIGRATION.md#migrating-from-v2-to-v3) |
╳ deprecated | 2 | 2.1  | - |
╳ deprecated | 1 | 1.7  | - |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-share/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).

---

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

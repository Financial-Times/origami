o-share [![Build Status](https://circleci.com/gh/Financial-Times/o-share.png?style=shield&circle-token=38faae5e0f0b4e39810a511b4004f396aff8718a)](https://circleci.com/gh/Financial-Times/o-share)
=======

Social media and URL sharing buttons.

* Provides the ability to share a URL provided by the product
* Uses a standard set of social media icons.
* Provides a copyable representation of a link


---

- [Usage](#usage)
	- [Markup](#markup)
	- [JavaScript](#javascript)
	- [Sass](#sass)
- [Migration guide](#migration-guide)
- [Contact](#contact)
- [Licence](#licence)

## Usage

### Markup

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
* Facebook (note: if Facebook isn't picking up the meta-data for your article properly [the Facebook debugging tool is very helpful](https://developers.facebook.com/tools/debug/sharing/))
* Linkedin
* Whatsapp (note: this link does nothing if Whatsapp is not installed)
* Google+ (written as 'googleplus' in the `links` config option)
* Pinterest
* Link (when clicked displays the URL that can be copied by the user)

#### Core experience

To support core experience, you need to include the [complete markup](https://github.com/Financial-Times/o-share/blob/master/main.mustache) directly.

Social media share buttons will function as plain `<a>` elements (and can be set to `target="_blank"` if the product wishes.

The link share button will not display at all. User can of course still copy the browser URL.

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

Check out the [API docs](http://registry.origami.ft.com/components/o-share#docs-js)

#### Events

This module will trigger the following events on its root element:

* `oShare.ready` - when a share links behaviour has been initialised
* `oShare.open` - when a share link has been opened (popup/flyout opened as a result of button click)
* `oShare.copy` - when the URL has been copied


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

### Migrating from v2.x.x to v3.x.x

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

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

The following markup is the simplest but requires JavaScript to work and does not support custom share icons or icon labels. If your project requires either of those features see the [full markup](#full-markup) seciton.

```html
<div data-o-component="o-share"
    class="o-share"
    data-o-share-links="{{links}}"
    data-o-share-url="{{url}}"
    data-o-share-title="{{title}}"
    data-o-share-titleExtra="{{titleExtra}}"
    data-o-share-summary="{{summary}}"
    data-o-share-relatedTwitterAccounts="{{relatedTwitterAccounts}}"
    data-o-share-location="{{locationOfShareComponent}}">
</div>
```

* `links`: List of lower case social networks to be added separated by a space.
* `url` (optional): The URL to be shared. Defaults to the current url.
* `title` (optional): The title of the content to be shared
* `titleExtra` (optional): Any additional text relating to the title, e.g. site _section_.
* `summary` (optional): Summary text to be shared.
* `relatedTwitterAccounts` (optional): Comma-separated list of Twitter accounts to encourage the user to follow. See [Twitter intents](https://dev.twitter.com/docs/intents) for more info.
* `locationOfShareComponent` (optional): A unique identifier for the share component which is used to track shares when multiple components exist on the page.

The different social networks are (in the order suggested by the design team):

* Twitter
* Facebook (note: Facebook doesn't accept meta data attributes in the same way as the other sharing services, instead the [Facebook Crawler](https://developers.facebook.com/docs/sharing/webmasters/crawler) uses internal heuristics to make a best guess about the title, description, and preview image for your content. You can provide specifics for these attributes to facebook by using [Open Graph meta tags](https://developers.facebook.com/docs/sharing/webmasters#markup))
* Linkedin
* Whatsapp (note: this link does nothing if Whatsapp is not installed)
* Pinterest

### Small

Add the `o-share--small` class for smaller icons. This is useful when including multiple instances of o-share to share items within a page, rather than to share the current page itself.

```diff
-<div data-o-component="o-share" class="o-share">
+<div data-o-component="o-share" class="o-share o-share--small">
    <!-- more o-share markup -->
</div>
```

### Full Markup

Include the [complete markup, available in the Origami registry](https://registry.origami.ft.com/components/o-share) directly to:
- Support a core experience, where JavaScript is unavailable or has failed.
- Add [custom share actions](#custom-actions) with [text labels](#text-labels).

```html
<!-- see the registry demos for full markup -->
<div data-o-component="o-share" class="o-share">
	<ul>
        <!-- a share to twitter action example -->
        <!-- href tag is not shown, see the registry demos for full markup  -->
		<li class="o-share__action">
            <a class="o-share__icon o-share__icon--twitter"
                href="#twitter-link-here"
                rel="noopener">
                <span class="o-share__text">Twitter</span>
            </a>
        </li>
        <!-- more o-share actions -->
	</ul>
</div>
```

#### Open In A New Tab

Social share actions open in the same frame, but you may add `target="_blank"` to the `<a>` element if your project requires share links are opened in a new tab/window where supported.

#### Text Labels

Add the `o-share__action--labelled` class to any share action to display the action text alongside the icon. This example uses the twitter action, but we recommend this only for [custom actions](#custom-actions) which are less recognisable compared with big social media brands.

```diff
<!-- see the registry demos for a full markup example -->
<div data-o-component="o-share" class="o-share">
	<ul>
-		<li class="o-share__action">
+		<li class="o-share__action o-share__action--labelled">
            <a class="o-share__icon o-share__icon--twitter"
                href="#twitter-link-here"
                rel="noopener">
                <span class="o-share__text">Twitter</span>
            </a>
        </li>
        <!-- more o-share actions -->
	</ul>
</div>
```

#### Custom Actions

Form markup is allowed within the `o-share__action` label to to handle custom share actions.

```html
<!-- see the registry demos for full markup -->
<div data-o-component="o-share" class="o-share">
	<ul>
        <!-- a custom share action example which includes a text label -->
        <li class="o-share__action o-share__action--labelled">
            <!-- form markup is allowed to handle custom share actions -->
			<form method="POST" action="#">
				<button type="submit" class="o-share__icon o-share__icon--share">
					<span class="o-share__text">Save</span>
				</button>
			</form>
        </li>
        <!-- more o-share actions -->
	</ul>
</div>
```

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

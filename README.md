# o-banner [![Circle CI](https://img.shields.io/circleci/project/github/Financial-Times/o-banner/master.svg)](https://circleci.com/gh/Financial-Times/o-banner/tree/master) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

o-banner is a component used for product messaging which could include feature promotion, education, feedback, and legal information.

- [Behaviour](#behaviour)
- [Markup](#markup)
- [JavaScript](#javascript)
- [Sass](#sass)
- [Themes](#themes)
- [Migration guide](#migration)
- [Contact](#contact)
- [Licence](#licence)


o-banner includes Sass and JavaScript to show and hide the banner. Banners can be created declaratively by adding markup to the page, or imperatively using JavaScript (only when not using the Build Service).

## Behaviour

o-banner elements appear fixed to the bottom of the screen. You can dismiss a banner, which will hide it but not remove it from the DOM. By default the last banner to be created will be the one that automatically opens. Opening a new banner will close any that are currently open.

## Markup

This HTML demonstrates the declarative way to instantiate o-banner. If you are using the Build Service or firing your own `o.DOMContentLoaded` event, this is all you need to create a banner:

```html
<div class="o-banner" data-o-component="o-banner">
    <div class="o-banner__outer">
        <div class="o-banner__inner" data-o-banner-inner="">

            <!-- Content to display on larger screens -->
            <div class="o-banner__content o-banner__content--long">
                <p>Try the new compact homepage. A list view of today's homepage with fewer images.</p>
            </div>

            <!-- Content to display on smaller screens -->
            <div class="o-banner__content o-banner__content--short">
                <p>Try the new compact homepage.</p>
            </div>

            <!-- Button and link -->
            <div class="o-banner__actions">
                <div class="o-banner__action">
                    <a href="#" class="o-banner__button">Try it now</a>
                </div>
                <div class="o-banner__action o-banner__action--secondary">
                    <a href="#" class="o-banner__link">Give feedback</a>
                </div>
            </div>

        </div>
    </div>
</div>
```

Variable content based on screen size as well as the link after the button are optional. A minimal banner would look like this (note removal of content modifiers):

```html
<div class="o-banner" data-o-component="o-banner">
    <div class="o-banner__outer">
        <div class="o-banner__inner" data-o-banner-inner="">
            <div class="o-banner__content">
                <p>Try the new compact homepage. A list view of today's homepage with fewer images.</p>
            </div>
            <div class="o-banner__actions">
                <div class="o-banner__action">
                    <a href="#" class="o-banner__button">Try it now</a>
                </div>
            </div>
        </div>
    </div>
</div>
```

The banner's primary action can be a form with a submit button if required. Change the actions markup to the following:

```html
<div class="o-banner__actions">
    <form class="o-banner__action" action="/example">
        <input class="o-banner__button" type="submit" value="Try it now" />
    </form>
    …
</div>
```

If the banner element is empty, then the appropriate structure will be constructed with JavaScript using data attributes to specify [options](#options):

```html
<div
    class="o-banner"
    data-o-component="o-banner"
    data-o-banner-content-long="Do you like o-banner?"
    data-o-banner-button-label="Yes"
></div>
```

If the banner element has content, but does _not_ include an `o-banner__outer` element, then it will assume that the element content should be wrapped in the appropriate markup:

```html
<div class="o-banner" data-o-component="o-banner">
    <p>This is the banner content</p>
</div>
```

## JavaScript

No code will run automatically unless you are using the Build Service. You must either construct an o-banner object or fire an `o.DOMContentLoaded` event, which o-banner listens for.

### Constructing an o-banner

If you have set up your banner declaratively:

```js
import Banner from 'o-banner';
const bannerElement = document.getElementById('my-banner-element');
const myBanner = new Banner(bannerElement);
```

The second argument passed to `oBanner` is an [options object](#options), this can be used to change the behaviour and display of a banner.

If you wish to create a banner from scratch with no existing DOM elements, you can set up your banner like this:

```js
import Banner from 'o-banner';
const myBanner = new Banner(null, {
    contentLong: 'Try the new compact homepage. A list view of today\'s homepage with fewer images.',
    contentShort: 'Try the new compact homepage.',
    buttonLabel: 'Try it now',
    buttonUrl: '#try-button',
    linkLabel: 'Give feedback',
    linkUrl: '#feedback-link'
});
```

The [available options](#options) are documented below.

### Manipulating an o-banner

Once you have an o-banner instance, you can manipulate it using the following methods (assume an instance named `myBanner` exists):

  - `myBanner.open()`: display a closed banner
  - `myBanner.close()`: hide an open banner

### Options

There are several options used to change the appearance or behaviour of o-banner. All of these are optional, but it's recommended to set at least `contentLong`, `buttonLabel`, and `buttonUrl`. Set the following as properties on the second argument to `oBanner`:

  - `autoOpen`: Boolean. Whether to automatically open the banner. Defaults to `true`
  - `appendTo`: String or Node. The element to append the banner to, when created imperatively with JavaScript. Defaults to `document.body`
  - `suppressCloseButton`: Boolean. Whether to hide the close button. Defaults to `false`
  - `closeExistingBanners`: Boolean. Whether to automatically close all other banners when the new banner is instantiated. Defaults to `true`
  - `contentLong`: String. The content to display on larger screens, or all screens if `contentShort` is not specified. Defaults to `&hellip;`
  - `contentShort`: String. The content to display on smaller screens. Defaults to the value of `contentLong`
  - `buttonLabel`: String. The banner button label. Defaults to `OK`
  - `buttonUrl`: String. The URL the button links to. Defaults to `#`
  - `formAction`: String. A form action, if specified then the primary button will be a submit button in a form. Defaults to `null`
  - `formEncoding`: String. The form encoding. Only used if `formAction` is not null. Defaults to `application/x-www-form-urlencoded`
  - `formMethod`: String. The form method. Only used if `formAction` is not null. Defaults to `post`
  - `linkLabel`: String. The banner link label. Set to `null` to hide the link. Defaults to `null`
  - `linkUrl`: String. The URL the link links to. Defaults to `#`
  - `closeButtonLabel`: String. The hidden accessible label for the close button. Defaults to `Close`.
  - `theme`: String. The theme to apply to the banner. [See the themes documentation](#themes) for available values. Defaults to `null`
  - `layout`: String. The layout to apply to the banner. [See the layouts documentation](#layouts) for available values. Defaults to `null`

## Sass

As with all Origami components, o-tooltip has a [silent mode](http://origami.ft.com/docs/syntax/scss/#silent-styles). To use its compiled CSS (rather than using its mixins with your own Sass) set `$o-banner-is-silent: false;` in your Sass before you've imported the o-banner Sass.

o-banner includes a primary mixin that takes an `$opts` parameter. The `themes` key of `$opts` includes styles for [themes](#themes). The `layouts` key includes styles for [layouts](#layouts):

```scss
@include oBanner($opts: (
	'layouts': ('small', 'compact'),
	'themes': ('marketing', 'product')
));
```

If you call the mixin without arguments you will get all the themes:

```scss
@include oBanner();
```

## Layouts

o-banner supports different layouts:

  - `small`: Display the banner in the bottom left of the screen at a smaller size, rather than full width
  - `compact`: Display the banner in the bottom left like the `small` theme, but with tighter spacing and smaller typography

In the markup, these can be applied as classes alongside the `o-banner` class. They are exposed as modifiers:

```html
<div class="o-banner o-banner--small">
    ...
</div>
```

In the JavaScript, use the `layout` [option](#options):

```js
const myBanner = new oBanner({
    layout: 'small'
});
```

## Themes

o-banner is themeable which may be used in combination with a [layout](#layouts):

  - `product`: Use the product colours for the banner
  - `marketing`: Use the marketing colours for the banner

In the markup, these can be applied as classes alongside the `o-banner` class. They are exposed as modifiers:

```html
<div class="o-banner o-banner--marketing">
    ...
</div>
```

In the JavaScript, use the `theme` [option](#options):

```js
const myBanner = new oBanner({
    theme: 'marketing'
});
```

## Migration

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 3 | N/A | [migrate to v3](MIGRATION.md#migrating-from-v2-to-v3) |
⚠ maintained | 2 | 2.3 | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
╳ deprecated | 1 | 1.7 | N/A |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-banner/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

---

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

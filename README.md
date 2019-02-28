# o-header-services [![CircleCI](https://circleci.com/gh/Financial-Times/o-header.png?style=shield&circle-token=41f2b7b7e669f2d4adb55ad97cf755d3ed4b93c3)](https://circleci.com/gh/Financial-Times/o-header-services) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

This header is for tools and services built by the Financial Times.

- [Markup](#markup)
	- [Title Section](#title-section)
	- [Primary navigation](#primary-navigation)
	- [Primary navigation with drop down](#primary-navigation-with-drop-down)
	- [Secondary navigation](#secondary-navigation)
	- [Themes](#themes)
	- [Bleed header](#bleed-header)
- [Sass](#sass)
	- [Customisation](#customisation)
- [JavaScript](#javascript)
- [Migration](#migration)
- [Contact](#contact)
- [License](#license)

## Markup

An `o-header-services` header is divided into three main parts: title section **(required)**, primary navigation **(optional)**, and secondary navigation **(optional)**. Each section is placed within a `header` element:

```html
<header class='o-header-services' data-o-component='o-header-services'>
	<!-- Markup specific to the needs of your product. Options detailed below. -->
</header>
```

### Title Section

A title section is **required** for every header, and every title section _must_ include a logo and a product title.
The logo will default to the FT logo—if you are not using the build service you can customise it with the `oHeaderServices()` [Sass mixin](#sass).

You can choose to include a product tagline to describe your product concisely, and there is space for extra content such as a 'Sign In' link in this section of the header, too.

_Note: If there is a 'Sign in' option, it should be consistent with other FT products by aligning itself to the right and avoiding different wording such as 'Log in' or 'Login'._

For an example and markup, see the [title-only header in the Origami Registry](https://registry.origami.ft.com/components/o-header-services#demo-title-section).

### Primary Navigation

The primary navigation is an **optional** addition to the title section. It's most useful for high-level navigation.

This section of the header has specific behaviour, as it turns into a drawer at smaller viewport sizes (740px down). It requires the addition an extra element in the title section to support the hamburger button.

If you are using extra content (such as a 'Sign in' link), that will be pulled into the drawer, as well.

For an example and markup, see the [primary navigation in the Origami Registry](https://registry.origami.ft.com/components/o-header-services#demo-primary-navigation).

### Primary Navigation with drop down

The primary navigation can also handle dropdown menus. These menus are hidden behind a button that lives beside the navigation item that it is pertinent to.

Drop down menus also get pulled into the drawer on smaller viewports.

For an example and markup, see the [primary navigation with drop downs in the Origami Registry](https://registry.origami.ft.com/components/o-header-services#demo-drop-down-navigation).

### Secondary Navigation

The secondary navigation is also an **optional** addition to the header, but it makes more sense alongside the primary navigation, as it serves more complicated products.

It includes two sections of navigation: 'ancestors' and 'children'.
The 'ancestor' section  works in the form of a breadcrumb, and the children are relative to the ancestor.

At smaller viewports, it does _not_ collapse into the drawer, but becomes scrollable instead.

For an example and markup, see the [secondary navigation in the Origami Registry](https://registry.origami.ft.com/components/o-header-services#demo-secondary-navigation).

### Themes

`o-header-services` offers theming for B2B or B2C products for FT.com products who use the master brand. They are designed to affect the title section and the primary navigation.

To add a theme to the header, add the appropriate class to the header element. For example, for B2B that would be:

```diff
+<header class='o-header-services o-header-services--b2b' data-o-component='o-header'>
-<header class='o-header-services' data-o-component='o-header'>
	<!-- Your header markup -->
</header>
```

For an example and markup, see the [B2B and B2C headers in the Origami Registry](https://registry.origami.ft.com/components/o-header-services#demo-theme-b2c).

### Bleed Header
If your application requires a bleed header, you'll need to add the `o-header-services--bleed` variant to your header.
```diff
+<header class='o-header-services o-header-services--bleed' data-o-component='o-header'>
-<header class='o-header-services' data-o-component='o-header'>
	<!-- Your header markup -->
</header>
```

## Sass

In order to output every type of `o-header-services` style, you'll need to include the following:
```scss
	@import 'o-header-services/main';

	@include oHeaderServices();
```

You can be more selective about which types you would like to output, by using an `$opts` map. It accepts the following options:

**types**
- `'primary-nav'`
- `'secondary-nav'`
- `'bleed'`
- `'b2b'`
- `'b2c'`

**logo**
- The name of a logo from the [logos image set](https://registry.origami.ft.com/components/logo-images@1.8.0). Defaults to the FT logo.

**drawer-breakpoint**
- The breakpoint to move the primary navigation into a drawer. We recommend a `rem` value or a layout size from [o-grid](https://github.com/Financial-Times/o-grid/#layout-sizes) e.g. 'M'. Defaults to the medium grid size 'M'.


To use a logo that is **not** the FT logo, the logo can be modified in one of two ways:
- By using a logo name from the logo image set (e.g. 'origami')
- By passing in a full url or data url that points at the SVG you want to use as a logo (e.g. 'https://www.example.com/logo.svg'). Bear in mind that you can also run your chosen SVG through the [Image Service's URL Builder](https://www.ft.com/__origami/service/image/v2/docs/url-builder), which will optimise the image and provide a URL for it.

In this example we include only the styles for a [primary navigation](#primary-navigation) with the [bleed modifier](#bleed-header). We opt to use the Origami logo from the [logo image set](https://registry.origami.ft.com/components/logo-images@1.8.0).

```scss
	@import 'o-header-services/main';

	@include oHeaderServices($opts: (
		'types': ('primary-nav', 'bleed');
		'logo': 'origami'
	));

	// Will output styles for a bleed header with a primary navigation and the Origami logo
```
### Customisation

`o-header-services` provides the option to customise the `whitelabel` brand. If you are using this brand, you can modify brand-specific variables by overriding them in a map in `oHeaderServicesCustomize`.

```scss
$o-brand: whitelabel;
@import 'o-header-services/main';

@include oHeaderServicesCustomize((
	'nav-hover-background': hotpink // will apply to background colors on hover, where appropriate
))

@include oHeaderServices($opts: (
	'types': ('primary-nav'),
	'features': ('drop-dowm')
));
```

We recommend customising the following brand variables:

- top-text
- top-background
- nav-text
- nav-background
- nav-border
- nav-hover-background
- nav-underline-color
- arrow-icon-color
- arrow-icon-hover-color
- button-hover-color

In addition, the following brand variables may also be customised:

- text-hover-color
- drawer-background
- drawer-button-background
- drawer-text-hover-color
- drawer-nav-hover-background
- primary-nav-item-horizontal-padding

## JavaScript

No code will run automatically unless you are using the Build Service. You must either construct an `o-header-services` object or fire an `o.DOMContentLoaded` event, which `o-header-services` listens for.

You'll need to set up your header declaratively, as the JavaScript for `o-header-services` does _not_ construct it for you.

The JavaScript is responsible for generating the drawer and enabling scrolling on the secondary navigation. You can implement that with the following:

```js
const oHeaderServices = require('o-header-services');

oHeaderServices.init();
```

## Migration

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 3 | N/A | [migrate to v3](MIGRATION.md#migrating-from-v2-to-v3) |
⚠ maintained | 2 | 2.3 | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
╳ deprecated | 1 | 1.2 | N/A |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-header-services/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

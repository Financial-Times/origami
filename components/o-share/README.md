# o-share [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

Social media buttons.

- [o-share ](#o-share-)
  - [Overview](#overview)
  - [Usage](#usage)
  - [Markup](#markup)
    - [Small](#small)
      - [Open In A New Tab](#open-in-a-new-tab)
      - [Text Labels](#text-labels)
      - [Custom Actions](#custom-actions)
  - [Sass](#sass)
    - [Colour Usecases](#colour-usecases)
  - [JavaScript](#javascript)
    - [Events](#events)
      - [oShare.ready](#oshareready)
      - [oShare.open](#oshareopen)
  - [TSX Template](#tsx-template)
  - [Migration guide](#migration-guide)
  - [Contact](#contact)
  - [Licence](#licence)

## Overview

- Provides the ability to share a URL provided by the product
- Uses a standard set of social media icons.

## Usage

Check out [how to include Origami components in your project](https://origami.ft.com/documentation/components/#including-origami-components-in-your-project) to get started with `o-share`.

## Markup

Include the [complete markup, available in the Origami registry](https://registry.origami.ft.com/components/o-share) directly to:

- Support a core experience, where JavaScript is unavailable or has failed.
- Add [custom share actions](#custom-actions) with [text labels](#text-labels).

```html
<!-- see the registry demos for full markup -->
<div data-o-component="o-share" class="o-share">
	<ul>
		<!-- a share to X action example -->
		<!-- href tag is not shown, see the registry demos for full markup  -->
		<li class="o-share__action">
			<a
				class="o-share__icon o-share__icon--x"
				href="#x-link-here"
				rel="noopener"
			>
				<span class="o-share__text">X</span>
			</a>
		</li>
		<!-- more o-share actions -->
	</ul>
</div>
```

The different social networks are (in the order suggested by the design team):

- Twitter
- Facebook (note: Facebook doesn't accept meta data attributes in the same way as the other sharing services, instead the [Facebook Crawler](https://developers.facebook.com/docs/sharing/webmasters/crawler) uses internal heuristics to make a best guess about the title, description, and preview image for your content. You can provide specifics for these attributes to facebook by using [Open Graph meta tags](https://developers.facebook.com/docs/sharing/webmasters#markup))
- Linkedin
- Whatsapp (note: this link does nothing if Whatsapp is not installed)
- Pinterest

### Small

Add the `o-share--small` class for smaller icons. This is useful when including multiple instances of o-share to share items within a page, rather than to share the current page itself.

```diff
-<div data-o-component="o-share" class="o-share">
+<div data-o-component="o-share" class="o-share o-share--small">
 <!-- more o-share markup -->
</div>
```

#### Open In A New Tab

Social share actions open in the same frame, but you may add `target="_blank"` to the `<a>` element if your project requires share links are opened in a new tab/window where supported.

#### Text Labels

Add the `o-share__action--labelled` class to any share action to display the action text alongside the icon. We recommend this for [custom actions](#custom-actions) which are less recognisable compared with big social media brands, as shown below.

```diff
-<li class="o-share__action">
+<li class="o-share__action o-share__action--labelled">
```

#### Custom Actions

Form markup is allowed within the `o-share__action` label to to handle custom share actions.

```html
<!-- see the registry demos for full markup -->
<li class="o-share__action o-share__action--labelled">
	<!-- demo only: forms with a submit button may be used for custom actions -->
	<form method="post" action="#">
		<button
			type="submit"
			class="o-share__icon o-share__icon--share"
			title="[Describe your custom action]"
			aria-label="[Describe your custom action]"
		>
			<span class="o-share__icon__image">
				<!-- custom svg icon -->
			</span>
			<span class="o-share__text" data-variant-label="">Custom Action</span>
		</button>
	</form>
</li>
```

The `share` icon is made available by default for custom share features as shown in the [Origami registry demos](https://registry.origami.ft.com/components/o-share).

## Sass

```scss
@import '@financial-times/o-share/main';
```

The `oShare` mixin is used to output the `o-share` styles.

```scss
@include oShare();
```

We recommend passing the `oShare` mixin an optional argument `$opts`, to specify styles granularly and keep your CSS bundle small.

For example:

```scss
@include oShare(
	$opts: (
		'sizes': (
			'small',
		),
		// output styles for a small variation of o-share i.e. o-share--small
		'vertical': true,
		// output styles for a vertical o-share i.e. o-share--vertical
		'icons':
			(
				'x',
				'facebook',
				'whatsapp',
			)
			// output styles for select share icons,,,,,,,
	)
);
```

All `$opts` options include:

- `icons` (list) a list of social share icons to output. One or more of the following, or any [o-icon name](https://registry.origami.ft.com/components/o-icons):
  - `x`
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

### Colour Usecases

`o-share` sets custom colour usecases for matching the colour of share buttons. These usecases are limited, for example they do not provide colours for the inverse variant, and not recommended for new projects (it is possible to output custom icons using the `oShare` mixin, without matching colours).

| Usecase                           | Property                 | Uses                                                                                             |
| --------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------ |
| `o-share/default-icon`            | background, border, text | Default colours, used by icons without a state (e.g. before hover).                              |
| `o-share/ft-icon`                 | background, border, text | Colours to highlight FT icon social buttons like email (e.g. on hover).                          |
| `o-share/[social-icon-name]-icon` | background, border, text | Colours to highlight social buttons with a brand, like Twitter (e.g. `o-share/x-icon` on hover). |

Use the [oColorsByUsecase mixin from o-colors](https://registry.origami.ft.com/components/o-colors/sassdoc?brand=core#function-ocolorsbyusecase) to retrieve custom colour usecases set by o-share.

```scss
.my-icon:hover {
	background-color: oColorsByUsecase('o-share/ft-icon', 'background');
}
```

## JavaScript

To instantiate the JavaScript:

```javascript
import oShare from '@financial-times/o-share';
var oShareInstance = new oShare(
	document.querySelector('[data-o-component=o-share]')
);
```

The markup will be generated for that instance of `o-share`.

You can also instantiate all instances in your page by running `oShare.init` which returns an array with all of them.

Alternatively, an `o.DOMContentLoaded` event can be dispatched on the `document` to run `#init()`:

```js
document.addEventListener('DOMContentLoaded', function () {
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

## TSX Template

`o-share` component publishes TSX templates to NPM and can be consumed by importing tsx template from our source directory:

```jsx
import {Share} from '@financial-times/o-share/src/tsx/share';
import {ShareIcon} from '@financial-times/o-share/src/tsx/shareIcon';

<Share {...ShareProps}>
	<ShareIcon {...ShareIconProps} />
</Share>;
```

The prop Types for each component:

```ts
interface ShareProps {
	small?: boolean;
	vertical?: boolean;
	inverse?: boolean;
}

interface ShareIconProps {
	icon: 'x' | 'facebook' | 'linkedin' | 'whatsapp';
	urlProps: {
		url: string;
		title: string;
		titleExtra: string;
		summary: string;
		relatedXAccounts: string;
	};
	showLabel?: boolean;
	label?: string;
}
```

TSX template doesn't import styles and doesn't initialise javaScript by itself. For implementation examples we recommend to look at our [storybook code](stories/share.stories.tsx).

## Migration guide

|    State     | Major Version | Last Minor Release |                     Migration guide                     |
| :----------: | :-----------: | :----------------: | :-----------------------------------------------------: |
| ⚠ maintained |      11       |        N/A         | [migrate to 11](MIGRATION.md#migrating-from-v10-to-11)  |
| ╳ deprecated |      10       |        10.0        | [migrate to v10](MIGRATION.md#migrating-from-v9-to-v10) |
| ╳ deprecated |       9       |        9.0         |  [migrate to v9](MIGRATION.md#migrating-from-v8-to-v9)  |
| ╳ deprecated |       8       |        8.3         |  [migrate to v8](MIGRATION.md#migrating-from-v7-to-v8)  |
| ╳ deprecated |       7       |        7.6         |  [migrate to v7](MIGRATION.md#migrating-from-v6-to-v7)  |
| ╳ deprecated |       6       |        6.5         |  [migrate to v6](MIGRATION.md#migrating-from-v5-to-v6)  |
| ╳ deprecated |       5       |        5.0         |  [migrate to v5](MIGRATION.md#migrating-from-v4-to-v5)  |
| ╳ deprecated |       4       |        4.0         |  [migrate to v4](MIGRATION.md#migrating-from-v3-to-v4)  |
| ╳ deprecated |       3       |        3.0         |  [migrate to v3](MIGRATION.md#migrating-from-v2-to-v3)  |
| ╳ deprecated |       2       |        2.1         |                            -                            |
| ╳ deprecated |       1       |        1.7         |                            -                            |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-share/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).

---

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

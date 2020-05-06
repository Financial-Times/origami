# o-icons

Helper Sass for the [fticons](http://registry.origami.ft.com/components/fticons) image set.

- [Summary](#summary)
- [Markup](#markup)
- [Sass](#sass)
- [Contributing](#contributing)
- [Migration guide](#migration)
- [Contact](#contact)
- [Licence](#licence)

## Summary

There are a few ways to get icons from `fticons`:

1. Use [o-icons CSS classes](#markup)
2. Use [o-icons Sass mixins](#sass) with your own CSS.
3. Request the icon directly from the [Image Service](https://www.ft.com/__origami/service/image/v2/docs/url-builder?url=fticon-v1%3Aarrow-down&preview=true) (without using o-icons at all).


## Markup

To add an icon apply the `o-icons-icon` class to a `span`, along with the modifier class for your specific icon e.g. `o-icons-icon--arrow-down`. See the [registry demos](https://registry.origami.ft.com/components/o-icons) for a full list of icons.

```html
<span class="o-icons-icon o-icons-icon--arrow-down"></span>
<span class="o-icons-icon o-icons-icon--audio"></span>
<span class="o-icons-icon o-icons-icon--book"></span>
```

This will include icons with a `128px` width/height by default.

If you would like to use an icon at a different dimension or colour, use `o-icon` [Sass](#sass) mixins or request the icon from the [Image Service](https://www.ft.com/__origami/service/image/v2/docs/url-builder?url=fticon-v1%3Aarrow-down&preview=true) directly (without using o-icons at all).

## Sass

### Includes icons of different sizes and colors

Use `oIconsContent` to output the styles for an icon of a given size and colour.

The `$color` argument should be set using an [o-colors](https://registry.origami.ft.com/components/o-colors) Sass function such as `oColorsByName`, but may be set to any hex value.

```scss
// Use o-colors so you can use colors from the Origami palette.
@import "o-icons/main";
@import "o-colors/main";

// Output a 32px, claret coloured plus icon.
.my-icon-plus {
	@include oIconsContent(
		$icon-name: 'plus',
		$color: oColorsByName('claret'),
		$size: 32
	);
}
```

```html
<span class="my-icon-plus"></span>
```

The `oIconsContent` mixins outputs styles used by each icon. This is inefficient if your project outputs multiple icons. In this case we recommend outputting the base styles separately with `oIconsContentBaseStyles`.

```scss
// Output a 32px, claret coloured plus icon.
.my-icon {
	@include oIconsContentBaseStyles();
}

.my-icon--plus {
	@include oIconsContent(
		$icon-name: 'plus',
		$color: oColorsByName('claret'),
		$size: 32,
		$include-base-styles: false // do not duplicate the base styles
	);
}
```

```html
<span class="my-icon my-icon--plus"></span>
```

`o-icons` includes a media query to restore either a black or white icon in Microsoft's high-contrast mode. If no icon is acceptable for users of Microsoft's high-contrast mode this may be disabled to reduce bundle size:

```scss
.no-high-contrast-window {
	@include oIconsContent(
		$icon-name: 'plus',
		$color: oColorsByName('claret'),
		$high-contrast-fallback: false
	);
}
```

### Using the default CSS helper classes

To output all icon [helper classes](#markup) include the `oIcons` mixin.
```scss
@import "o-icons/main";
@include oIcons(); // include helper classes for all icons
```

To avoid including all icon [helper classes](#markup), `oIcons` mixin also accepts a list of icons to include:
```scss
@include oIcons($opts: (
	'icons': ('arrow-down', 'audio') // include helper classes for the arrow-down and audio icons
));
```

## Contributing

`o-icons` is some Sass mixins and helpers for using the fticons image set. To add a new icon you need to add it to the fticons set. There are instructions in the [fticons README](http://github.com/financial-times/fticon). When the icon is in fticons, run `node ./scripts/build-icon-list.js` to update `o-icons` Sass with the new icon automatically.

## Migration

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 6 | N/A  | [migrate to v6](MIGRATION.md#migrating-from-v5-to-v6) |
⚠ maintained | 5 | 5.9  | [migrate to v5](MIGRATION.md#migrating-from-v4-to-v5) |
╳ deprecated | 4 | 4.5  | [migrate to v4](MIGRATION.md#migrating-from-v3-to-v4) |
╳ deprecated | 3 | 3.3 | - |
╳ deprecated | 2 | 2.4 | - |
╳ deprecated | 1 | 1.2 | - |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-icons/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).


----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

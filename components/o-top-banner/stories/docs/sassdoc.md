# o-top-banner Sass Documentation

- [o-top-banner Sass Documentation](#o-top-banner-sass-documentation)
  - [Mixins](#mixins)
    - [oTopBanner](#otopbanner)
    - [oTopBannerAddTheme](#otopbanneraddtheme)

## Mixins

### oTopBanner

Output all oTopBanner features

| Parameter | Type | Default | Description                              |
| --------- | ---- | ------- | ---------------------------------------- |
| opts      | Map  | ()      | A map of options to configure the output |

#### Examples

##### Example 1

Include styles for all top banners.

```scss
@include oTopBanner();
```

##### Example 2

Include styles for specific top banners only.

```scss
@include oTopBanner(
	$opts: (
		'themes': (
			'new-world',
			'professional-inverse',
		),
	)
);
```

### oTopBannerAddTheme

Add a theme modifier for banners.

The output includes the `.o-top-banner--THEME` modifier class definition, which includes all overrides.
| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| theme-name | String | - |The banner theme to output styles for. See README for available themes, or specify a custom one if providing $opts. |
| opts | Map | null |A brand configuration which can be used to create a custom banner theme. See README for more examples. |

#### Examples

##### Example 1

A fully customised top banner theme

```scss
@include oTopBannerAddTheme(
	'my-theme-name',
	(
		'background-color': oColorsByName('slate'),
		'button-background-color': oColorsByName('ft-pink'),
		'heading-color': oColorsByName('ft-pink'),
		'copy-color': oColorsByName('white'),
	)
);
```

##### Example 2

Existing banner theme

```scss
@include oTopBannerAddTheme('professional');
```

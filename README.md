o-spacing [![Circle CI](https://circleci.com/gh/Financial-Times/o-spacing/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/o-spacing/tree/master)[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)
=================

A styling utility component to aid projects and component with consistent spacing, according to the baseline grid within the design guidelines.

- [Spaces](#spaces)
- [Markup](#markup)
- [CSS Custom Properties](#css-custom-properties)
- [Sass](#sass)
- [Contact](#contact)
- [Licence](#licence)

For [Build Service](https://www.ft.com/__origami/service/build/v2/) users, `o-spacing` provides [CSS classes](#markup) for vertical space and [CSS Custom Properties (CSS Variables)](#css-custom-properties) for other usecases. For Sass users `o-spacing` also provides a number of [Sass functions and mixins](#sass) for applying space to a project.

## Spaces

![Visual representation of spaces defined below.](https://user-images.githubusercontent.com/10405691/57918050-e9381780-788d-11e9-8310-ba5053c0c84a.png)

_The above illustration is taken from the [UXD Sketch Toolkit](https://sites.google.com/ft.com/ft-design-system)._

### Baseline

Our baseline grid defaults to 4px. Any multiple of this default may be applied to a project. We recommend using our [named spaces](#named-spaces) for consistency.

### Named Spaces

Named spaces are the sizes we use to layout a component or page consistently. Each space is based on the 4px baseline. Small sizes such as `s1` or `s2` are ideal for space within a component; use medium sizes `m12` and `m16` for related content on a page; and large sizes `l18`, `l24` for separating distinct areas within a project.

| name | value |
|------|-------|
| s1 | 4px |
| s2 | 8px |
| s3 | 12px |
| s4 | 16px |
| s6 | 24px |
| s8 | 32px |
| m12 | 48px |
| m16 | 64px |
| l18 | 72px |
| l24 | 96px |

To apply named spaces see `o-spacing` [markup](#markup) and [Sass](#sass) documentation.

## Markup

`o-spacing` provides utility classes to help space Origami components vertically within your project.

```html
<!-- Add a 48px vertical margin between elements. -->
<div class='o-spacing-m12'></div>
<div class='o-spacing-m12'></div>
```

To apply spaces to other properties `o-spacing` provides [CSS Custom Properties (CSS Variables)](#css-custom-properties).

## CSS Custom Properties

### Named Space Custom Properties

`o-spacing` outputs a CSS Custom Property (CSS Variable) for each named space. E.g. `--o-spacing-s1`. These may be used to apply spaces in custom CSS if your project [supports](https://caniuse.com/#feat=css-variables) CSS Custom Properties. This is particularly useful for [Build Service](https://www.ft.com/__origami/service/build/v2/) users who do not have access to `o-spacing`'s [Sass](#sass) functions.

```scss
.example {
	margin: var(--o-spacing-s1);
}
```

### Baseline Custom Property

We recommend using a [named space](#named-spaces), but for more granular control a project may output any space which is a multiple of our baseline value. For users who do not have access to Sass, `o-spacing` outputs a `--o-spacing-baseline` CSS variable.

```scss
.example {
	padding: calc(var(--o-spacing-baseline) * 1); // A small padding (4px).
	margin-bottom: calc(var(--o-spacing-baseline) * 4); // A large space (16px).
}
```

## Sass

### Relative Units

For compatibility with existing Origami projects, `o-spacing` outputs `px` values by default. To use relative `rem` values, set `$o-spacing-relative-units: true` before importing `o-spacing`.

```scss
	$o-spacing-relative-units: true;

	.example {
		padding: oSpacingByName('s1');  // Small padding (0.24rem).
		margin-bottom: oSpacingByName('m12'); // Medium margin (3rem).
	}
```

_If using `o-typography` set [$o-typography-relative-units](https://registry.origami.ft.com/components/o-typography@5.11.3/sassdoc?brand=master#variable-o-typography-relative-units) also._

### Named Space

We recommend Sass users apply space to their project using the `oSpacingByName` function. It accepts a [space name](#named-spaces) and returns a `px` value (or `rem` value, if [relative units](#relative-units) are enabled).

```scss
	.example {
		padding: oSpacingByName('s1');  // Small padding (4px).
		margin-bottom: oSpacingByName('m12'); // Medium margin (48px).
	}
```

### Baseline Space

We recommend the use of [named spaces](#named-space), but any space that multiplies our [baseline](#baseline) is allowed. To apply a multiple of the baseline value use `oSpacingByIncrement`. It accepts a value to multiply the baseline by and returns a `px` value (or `rem` value, if [relative units](#relative-units) are enabled).

```scss
	.example {
		margin-bottom: oSpacingByIncrement(4);
	}
```

### Custom Properties &amp; Utility Classes

We recommend users apply named spaces using the Sass function [oSpacingByName](#named-space), but Sass users may output all `o-spacing` CSS including [utility classes](#markup) and [CSS custom properties](#css-custom-properties) using the `oSpacing` mixin.

```scss
@include oSpacing($opts: (
	'margin-bottom-utilities': true, // Output CSS classes such as `o-spacing-s1`
	'custom-properties': true // Output CSS variables
));
```

## Migration

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 2 | N/A | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
╳ deprecated | 1 | 1.0 | N/A |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-spacing/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

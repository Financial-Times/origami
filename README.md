# Visual Effects  [![Circle CI](https://circleci.com/gh/Financial-Times/o-visual-effects/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/o-visual-effects/tree/master) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

This [Origami](http://origami.ft.com/) component provides CSS visual effects via a set of Sass variables and mixins.

- [Usage](#usage)
	- [Markup](#markup)
	- [Sass](#sass)
- [Migration Guide](#migration-guide)
- [Contact](#contact)
- [Licence](#licence)


## Usage

### Markup

When using the build service or importing the module with [silent mode](http://origami.ft.com/docs/syntax/scss/#silent-styles) set to false, o-visual-effects provides helper classes to access the different levels of box shadow settings. The main class available is: `.o-visual-effects-shadow` which outputs a _low_ shadow. To access any other level of shadow, you should use the modifier for that level, for example: `.o-visual-effects-shadow--high`.

```html
<div class="box o-visual-effects-shadow--high">Box content</div>
```

### Sass

As with all Origami components, o-visual-effects has a [silent mode](http://origami.ft.com/docs/syntax/scss/#silent-styles). To use its compiled CSS (rather than using its mixins with your own Sass) set `$o-visual-effects-is-silent : false;` in your Sass before you import the o-visual-effects Sass.

```sass
$o-visual-effects-is-silent: false;
@import 'o-visual-effects/main';
```

#### Shadows mixin

The `oVisualEffectsShadowsElevation` mixin is used to add a consistent shadow to your element. There are 4 levels of shadow available: `ultralow`, `low` (default), `mid`, and `high`.

Example:

```sass
.my-element {
	@include oVisualEffectsShadowsElevation('mid');
}
```

Output:

```css
.my-element{
	box-shadow: 0 1px 3px rgba(77, 72, 69, 0.2), 0 6px 10px rgba(77, 72, 69, 0.15);
}
```

#### Transition variables

When adding transitions to elements in CSS, you should use o-visual-effects variables for consistent timings for `slide`, `expand`, and `fade` effects.

Example:

```sass
.transition--slide {
	transition: all 0.5s $o-visual-effects-transition-slide;
}

.transition--expand {
	transition: all 0.5s $o-visual-effects-transition-expand;
}

.transition--fade {
	transition: all 0.5s $o-visual-effects-transition-fade;
}
```

Output:

```css
.transition--slide {
	transition: all 0.5s cubic-bezier(1, 0, 0.5, 1.275);
}

.transition--expand {
	transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
}

.transition--fade {
	transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
}
```

## Migration

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 3 | N/A | [migrate to v3](MIGRATION.md#migrating-from-v2-to-v3) |
⚠ maintained | 2 | 2.1 | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
╳ deprecated | 1 | 1.0 | N/A |


## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-visual-effects/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

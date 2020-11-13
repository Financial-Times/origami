# o-visual-effects

This [Origami](http://origami.ft.com/) component provides CSS visual effects via a set of Sass variables and mixins.

- [Usage](#usage)
- [Markup](#markup)
- [CSS Custom Properties](#css-custom-properties)
- [Sass](#sass)
- [Migration Guide](#migration-guide)
- [Contact](#contact)
- [Licence](#licence)

## Usage

Check out [how to include Origami components in your project](https://origami.ft.com/docs/components/#including-origami-components-in-your-project) to get started with `o-visual-effects`.

## Markup

`o-visual-effects` provides helper classes to style with different levels of box shadow:
- `.o-visual-effects-shadow-ultralow`
- `.o-visual-effects-shadow-low`
- `.o-visual-effects-shadow-mid`
- `.o-visual-effects-shadow-high`

```html
<div class="o-visual-effects-shadow-high">Box content</div>
```

`o-visual-effects` also provides [timing functions](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function) for slide, expand, or fade animations and transitions as [CSS custom properties](#css-custom-properties) (CSS Variables). Sass users may use [Sass variables](#sass) to apply these timing functions instead.

## CSS Custom Properties

Build Service users may use CSS Custom Properties (CSS Variables) to apply consistent [timing functions](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function) within custom CSS. The variables avalible are:

- `--o-visual-effects-timing-slide`
- `--o-visual-effects-timing-expand`
- `--o-visual-effects-timing-fade`

E.g.
```css
.transition--slide {
	transition: all 0.5s var(--o-visual-effects-timing-slide);
}

.transition--expand {
	transition: all 0.5s var(--o-visual-effects-timing-expand);
}

.transition--fade {
	transition: all 0.5s var(--o-visual-effects-timing-fade);
}
```

Sass users should use [Sass variables](#sass) instead for improved browser support.

## Sass

To include all `o-visual-effects` css call the `oVisualEffects` mixin. This will include box shadow styles and CSS custom properties for transition [timing functions](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function).

```scss
@include oVisualEffects();
```

`o-visual-effects` may also be output granularly. For example ommit the CSS custom properties if you are using Sass variables such as `$o-visual-effects-timing-slide` instead:

```scss
@include oVisualEffects($opts: (
	'shadows': ('ultralow', 'low', 'mid', 'high')
));
```

If you are not using `o-visual-effects` CSS, and instead are using other Sass mixins or variables directly there is no need to call `oVisualEffects`.

### Shadows mixin

The `oVisualEffectsShadowContent` mixin is used to add a consistent shadow to your element. There are 4 levels of shadow available: `ultralow`, `low` (default), `mid`, and `high`.

Example:

```scss
.my-element {
	@include oVisualEffectsShadowContent('mid');
}
```

Output:

```css
.my-element {
	box-shadow: 0 1px 3px rgba(77, 72, 69, 0.2), 0 6px 10px rgba(77, 72, 69, 0.15);
}
```

#### Transition variables

When adding transitions to elements in CSS, you should use o-visual-effects variables for consistent timings for `slide`, `expand`, and `fade` effects.

Example:

```scss
.transition--slide {
	transition: all 0.5s $o-visual-effects-timing-slide;
}

.transition--expand {
	transition: all 0.5s $o-visual-effects-timing-expand;
}

.transition--fade {
	transition: all 0.5s $o-visual-effects-timing-fade;
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

## Migration guide

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 3 | N/A | [migrate to v3](MIGRATION.md#migrating-from-v2-to-v3) |
⚠ maintained | 2 | 2.1 | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
╳ deprecated | 1 | 1.0 | N/A |


## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-visual-effects/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

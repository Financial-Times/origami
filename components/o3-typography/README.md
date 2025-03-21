> :warning: **o3-typography has been deprecated**: Please refer to the [migration guide](MIGRATION.md) to continue using typography.

# o3-typography

Typographical styles for FT branded sites.

- [Overview](#overview)
- [Usage](#usage)
- [Markup](#markup)
  - [Headings](#headings)
  - [Body/Paragraphs](#bodyparagraphs)
  - [Links](#links)
  - [List](#list)
  - [Modifiers](#modifiers)
  - [Wrapper](#wrapper)
  - [Custom Properties](#custom-properties)
- [Contact](#contact)
- [Licence](#licence)

## Overview

O3 Typography is a collection of typographical styles for FT branded sites using design tokens. It provides styling and Typescript templates for:

- Headings
- Paragraphs
- Links

It also includes modifier classes to apply bold, italic, superscript, and subscript styles.

## Markup

o3-typography supports [JSX templates for React users](#jsx), or direct HTML. We recommend using JSX where possible.

### Body/Paragraphs

O3 paragraphs are styled with the `o3-typography-body-standard` class:

#### HTML

```html
<p class="o3-typography-body-standard">This is a paragraph of text.</p>
```

#### JSX

Using the Typescript component applies this styling:

```tsx
import {Body} from '@financial-times/o3-typography';

<Body>This is a paragraph of text.</Body>;
```

### Links

Link styles can be used to give consistent styling to anchor tags:

#### HTML

```html
<p class="o3-typography-body-standard">
	Styling and usage guides can be seen on the
	<a href="#" class="o3-typography-link">Origami</a> homepage.
</p>
```

#### JSX

```tsx
import {Link} from '@financial-times/o3-typography';

<Body>
	Styling and usage guides can be seen on the <Link href="#">Origami</Link>{' '}
	homepage.
</Body>;
```

### List

O3 Tygraphy provides styling for both ordered and unordered lists:

#### HTML

```html
<ul class="o3-typography-ul">
	<li>Item 1</li>
	<li>Item 2</li>
	<li>Item 3</li>
</ul>

<ol class="o3-typography-ol">
	<li>Item 1</li>
	<li>Item 2</li>
	<li>Item 3</li>
</ol>
```

#### JSX

```jsx
import { List } from '@financial-times/o3-typography';

<UnorderedList>
	<li>Item 1</li>
	<li>Item 2</li>
	<li>Item 3</li>
</UnorderedList>

<OrderedList>
	<li>Item 1</li>
	<li>Item 2</li>
	<li>Item 3</li>
</OrderedList>
```

### Captions

Used with figures to provide a caption:

```html
<figcaption class="o3-typography-caption">This is a caption.</figcaption>
```

```tsx
import {Caption} from '@financial-times/o3-typography';

<Caption>This is a caption.</Caption>;
```

### Modifiers

O3 Typography comes with 4 modifier classes:

- Strong (Bold)
- Emphasis (Italic)
- Superscript
- Subscript

These can be used on whole paragraphs or individual words:

#### HTML

```html
<p class="o3-typography-body-standard o3-typography-bold">
	This is a paragraph of bold text.
</p>
<p class="o3-typography-body-standard">
	This body contains an <em class="o3-typography-italic">emphasised</em> word.
</p>
<p class="o3-typography-body-standard">
	This body contains a
	<sup class="o3-typography-superscript">superscript</sup> and a
	<strong class="o3-typography-bold">strong</strong> word.
</p>
```

#### JSX

```tsx
import { Body, Emphasis, Strong, Superscript } from '@financial-times/o3-typography';

<Body><Strong>This is a paragraph of bold text.</Strong></Body>
<Body>This body contains an <Emphasis>emphasised</Emphasis> word.</Body>
<Body>This body contains a <Superscript>superscript</Superscript> and a <Strong>strong</Strong> word.</Body>
```

### Wrapper

The wrapper can be used to style blocks of body without needing to apply the class to each element. This can be useful when large bodies of many components need styling:

#### HTML

```html
<div class="o3-typography-wrapper"></div>
```

```jsx
import {Wrapper, Heading} from '@financial-times/o3-typography';

<Wrapper>
	<h1>This heading gets styled.</h1>
	<p>And so does this paragraphy of text.</p>
	<h2>This gets styled also</h2>
</Wrapper>;
```

### Custom Properties

#### Max Line Width

`o3-typography` includes a CSS Custom Property `--o3-typography-max-line-width` to limit typography line length for readability.
E.g.

```css
.my-selector {
	max-width: var(--o3-typography-max-line-width);
}
```

You may want to slightly decrease or increase this limit inline with our [design guidelines](https://origami-for-everyone.ft.com/guides/typography/). To do so we recommend using the [ch relative unit](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Values_and_Units#distance_units).

E.g.

```css
.my-selector {
	max-width: 70ch;
}
```

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o3-typography/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).

---

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

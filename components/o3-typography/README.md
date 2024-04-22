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
- [Contact](#contact)
- [Licence](#licence)

## Overview
O3 Typography is a collection of typographical styles for FT branded sites using design tokens. It provides styling and Typescript templates for:

* Headings
* Paragraphs
* Links

It also includes modifier classes to apply bold, italic, superscript, and subscript styles.

## Markup

o3-typography supports [JSX templates for React users](#jsx), or direct HTML. We recommend using JSX where possible.

### Headings

O3 headings come in 6 levels, `<h1>` to `<h6>`, and styling can be applied to each through class modifiers:

```html

<h1 class="o3-heading o3-heading--level-1">Welcome to Origami</h1>
<h2 class="o3-heading o3-heading--level-2">Who are we?</h2>
```

Properties on the typescript components can be used to apply the same styles:

```tsx
import { Heading } from '@financial-times/o3-typography';

<Heading level={1}>Welcome to Origami</Heading>
<Heading level={2}>Who are we?</Heading>
```

### Body/Paragraphs

O3 paragraphs are styled with the `o3-typography-body` class:

```html
<p class="o3-typography-body">This is a paragraph of text.</p>
```

Using the Typescript component applies this styling:

```tsx
import { Body } from '@financial-times/o3-typography';

<Body>This is a paragraph of text.</Body>
```

### Links

Link styles can be used to give consistent styling to anchor tags:

```html
<p class="o3-typography-body">Styling and usage guides can be seen on the <a href="#" class="o3-typography-link">Origami</a> homepage.</p>
```

```tsx
import { Link, Body } from '@financial-times/o3-typography';

<Body>Styling and usage guides can be seen on the <Link href="#">Origami</Link> homepage.</Body>
```

### List

O3 Tygraphy provides styling for both ordered and unordered lists:

#### HTML
```html
<ul class="o3-typography-list o3-typography-list--unordered">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>

<ol class="o3-typography-list o3-typography-list--ordered">
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
### Modifiers

O3 Typography comes with 4 modifier classes:
* Strong (Bold)
* Emphasis (Italic)
* Superscript
* Subscript

These can be used on whole paragraphs or individual words:

```html
<p class="o3-typography-body o3-typography-bold">This is a paragraph of bold text.</p>
<p class="o3-typography-body">This body contains an <em class="o3-typography-italic">emphasised</em> word.</p>
<p class="o3-typography-body">This body contains a <sup class="o3-typography-superscript">superscript</sup> and a <strong class="o3-typography-bold">strong</strong> word.</p>
```

```tsx
import { Body, Emphasis, Strong, Superscript } from '@financial-times/o3-typography';

<Body><Strong>This is a paragraph of bold text.</Strong></Body>
<Body>This body contains an <Emphasis>emphasised</Emphasis> word.</Body>
<Body>This body contains a <Superscript>superscript</Superscript> and a <Strong>strong</Strong> word.</Body>
```

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o3-typography/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).

---

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

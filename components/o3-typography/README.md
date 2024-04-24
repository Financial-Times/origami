# o3-typography

Typographical styles for FT branded sites.

- [Overview](#overview)
- [Usage](#usage)
- [Markup](#markup)
  - [Headings](#headings)
  - [Body/Paragraphs](#bodyparagraphs)
  - [Links](#links)
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

#### HTML
```html

<h1 class="o3-heading o3-heading--level-1">Welcome to Origami</h1>
<h2 class="o3-heading o3-heading--level-2">Who are we?</h2>
```

#### JSX
Properties on the typescript components can be used to apply the same styles:

```tsx
import { Heading } from '@financial-times/o3-typography';

<Heading level={1}>Welcome to Origami</Heading>
<Heading level={2}>Who are we?</Heading>
```

### Body/Paragraphs

O3 paragraphs are styled with the `o3-typography-body` class:

#### HTML
```html
<p class="o3-typography-body">This is a paragraph of text.</p>
```

#### JSX
Using the Typescript component applies this styling:

```tsx
import { Body } from '@financial-times/o3-typography';

<Body>This is a paragraph of text.</Body>
```

### Links

Link styles can be used to give consistent styling to anchor tags:

#### HTML
```html
<p class="o3-typography-body">Styling and usage guides can be seen on the <a href="#" class="o3-typography-link">Origami</a> homepage.</p>
```
#### JSX
```tsx
import { Link, Body } from '@financial-times/o3-typography';

<Body>Styling and usage guides can be seen on the <Link href="#">Origami</Link> homepage.</Body>
```

### Footer

#### HTML
```html
<footer class="o3-typography o3-typography-footer">Copyright notice</footer>
```
#### JSX
```tsx
import { Footer } from '@financial-times/o3-typography';

<Footer>Copyright notice</Footer>
```

### Captions

Used with figures to provide a caption:

```html
<figcaption class="o3-typography o3-typography-caption">This is a caption.</figcaption>
```

```tsx
import { Caption } from '@financial-times/o3-typography';

<Caption>This is a caption.</Caption>
```

### Modifiers

O3 Typography comes with 4 modifier classes:
* Strong (Bold)
* Emphasis (Italic)
* Superscript
* Subscript

These can be used on whole paragraphs or individual words:

#### HTML
```html
<p class="o3-typography-body o3-typography-bold">This is a paragraph of bold text.</p>
<p class="o3-typography-body">This body contains an <em class="o3-typography-italic">emphasised</em> word.</p>
<p class="o3-typography-body">This body contains a <sup class="o3-typography-superscript">superscript</sup> and a <strong class="o3-typography-bold">strong</strong> word.</p>
```

#### JSX
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

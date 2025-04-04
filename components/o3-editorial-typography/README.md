# o3-editorial-typography

Typographic styles for editorial content.

- [o3-editorial-typography](#o3-editorial-typography)
  - [Overview](#overview)
  - [Markup](#markup)
    - [Heading styles](#heading-styles)
      - [HTML](#html)
      - [JSX](#jsx)
    - [Body and dropcap](#body-and-dropcap)
      - [HTML](#html-1)
      - [JSX](#jsx-1)
    - [Editorial detail styles](#editorial-detail-styles)
      - [Topic Tag](#topic-tag)
      - [Standfirst](#standfirst)
      - [Summary](#summary)
      - [Caption](#caption)
      - [Byline](#byline)
    - [Quote](#quote)
    - [Big Number](#big-number)
    - [Lists](#lists)
  - [Theme modifiers](#theme-modifiers)
  - [Migration](#migration)
  - [Contact](#contact)
  - [Licence](#licence)

## Overview

`o3-editorial-typography` provides typographic styles for editorial content. It supports the following brands:

- `core`
- `sustainable-view`

For UI typography see [o3-typography](https://github.com/Financial-Times/origami/tree/main/components/o3-typography).

## Markup

o3-editorial-typography supports [JSX templates for React users](#jsx), or direct HTML. We recommend using JSX where possible.

### Heading styles

Heading styles are available in 5 different types.

| Type       | Selector                            | Notes                                                             |
| ---------- | ----------------------------------- | ----------------------------------------------------------------- |
| Display    | .o3-editorial-typography-display    | Add the `data-o3-editorial-underline` attribute for an underline. |
| Headline   | .o3-editorial-typography-headline   |                                                                   |
| Chapter    | .o3-editorial-typography-chapter    |                                                                   |
| Subheading | .o3-editorial-typography-subheading |                                                                   |
| Label      | .o3-editorial-typography-label      |                                                                   |

#### HTML

```html
<h1 class="o3-editorial-typography-display" data-o3-editorial-underline>
	Large headline
</h1>

<h1 class="o3-editorial-typography-headline">Headline</h1>

<h2 class="o3-editorial-typography-chapter">Chapter</h2>

<h3 class="o3-editorial-typography-subheading">Subheading</h3>

<h3 class="o3-editorial-typography-label">Label</h3>
```

#### JSX

The same heading styles can be used in JSX environments as well by importing `<Headline>` component and applying the `type` modifier. The component is exported as a commonjs module as well as an es module. Depending your project setup, you can import the component from `/cjs` or `/esm` directory.

```jsx
import { Headline } from '@financial-times/o3-editorial-typography/cjs';

<Headline type="display" underline={true}>Large headline</Headline>
<Headline type="headline">Headline</Headline>
<Headline type="chapter">Chapter</Headline>
<Headline type="subheading">Subheading</Headline>
<Headline type="label">Label</Headline>

```

`<Headline>` props:

| Prop | Type | Default |
Description |
| --------- | --------------------------------------------------------------- | ---------- | ------------------------------------------------------------ |
| type | `display` \| `headline` \| `chapter` \| `subheading` \| `label` | `headline` | Type of the headline. |
| theme | `standard` \| `inverse` | - | Theme of the headline. |
| underline | `boolean` | `false` | Adds an underline to the headline. Valid only for `display`. |

### Body and dropcap

`o3-foundation` provides typography usecase tokens, including for editorial body copy (see `o3-type-body-content-*` classes). `o3-editorial-typography` builds on this by providing an optional drop cap style, `o3-editorial-typography-drop-cap`.

#### HTML

```html
<p class="o3-editorial-typography-drop-cap o3-type-body-content-base">
	This is a small paragraph of text with a drop cap.
</p>
```

#### Topic Tag

Also called display tag, are category labels in the FT. Used in teasers (article cards) to indicate the category of a post. A topic tag is usually an anchor but does not have to be if there is no page to link to. Pure HTML markup is as follows:

```html
<a class="o3-editorial-typography-topic-tag" href="#">Topic Link</a>
<span class="o-editorial-typography-topic-tag">Topic Without Link</span>
```

or with JSX import:

```jsx
import {TopicTag} from '@financial-times/o3-editorial-typography/cjs'; // or /esm

<TopicTag href="#">Topic Link</TopicTag>
<TopicTag>Topic Without Link</TopicTag>
```

`<TopicTag>` props:

| Prop  | Type                    | Default    | Description                                                                                |
| ----- | ----------------------- | ---------- | ------------------------------------------------------------------------------------------ |
| href  | `string`                | -          | URL to link the topic tag. The presence of `href` prop will determine rendered element tag |
| theme | `standard` \| `inverse` | `standard` | Theme of the topic tag.                                                                    |

Color and hover colour of the topic tag can be customized by using the following CSS variables:

| Variable                                          | Description                   | Default                |
| ------------------------------------------------- | ----------------------------- | ---------------------- |
| `--o3-editorial-typography-topic-tag-color`       | Colour of the topic tag       | `claret` - for core    |
| `--o3-editorial-typography-topic-tag-hover-color` | Hover colour of the topic tag | `claret-30` - for core |

#### Standfirst

Short intro below the headline that provides context about a post. Used in combination with a header in the topper component. Pure HTML markup is as follows:

```html
<p class="o3-editorial-typography-standfirst">Standfirst</p>
```

or with JSX import:

```jsx
import {Standfirst} from '@financial-times/o3-editorial-typography/cjs'; // or /esm

<Standfirst>Standfirst</Standfirst>;
```

`<Standfirst>` props:

| Prop  | Type                    | Default    | Description              |
| ----- | ----------------------- | ---------- | ------------------------ |
| theme | `standard` \| `inverse` | `standard` | Theme of the standfirst. |

#### Summary

Use to provide a concise summary of the article, offering a quick, high-level overview of the key points. It allows readers to grasp the main ideas without reading the entire article.

```html
<p class="o3-editorial-typography-summary">Summary</p>
```

or with JSX import:

```jsx
import {Summary} from '@financial-times/o3-editorial-typography/cjs'; // or /esm

<Summary>Summary</Summary>;
```

#### Caption

For additional information about a piece or image that should be less prominent. Pure HTML markup is as follows:

```html
<figcaption class="o3-editorial-typography-caption">Caption</figcaption>
```

or with JSX import:

```jsx
import {Caption} from '@financial-times/o3-editorial-typography/cjs'; // or /esm

<Caption>Caption</Caption>;
```

`<Caption>` props:

| Prop  | Type                    | Default    | Description           |
| ----- | ----------------------- | ---------- | --------------------- |
| theme | `standard` \| `inverse` | `standard` | Theme of the caption. |

#### Byline

Byline is a composite component that includes author name, location and timestamp. It is used to display author details in the editorial content.

Author name is usually an anchor but does not have to be if there is no page to link to. Pure HTML markup is as follows:

```html
<div class="o3-editorial-typography-byline">
	<a class="o3-editorial-typography-byline-author" href="#">Joe Doe</a> in
	London
	<time
		class="o3-editorial-typography-byline-timestamp"
		datetime="2019-10-11T20:51:54Z"
		title="October 11 2019 9:51 pm"
		>October 11 2019</time
	>
</div>
```

or with JSX import:

```jsx
import {Byline} from '@financial-times/o3-editorial-typography/cjs'; // or /esm

<Byline>
	<a className="o3-editorial-typography-byline-author" href="#">
		Joe Doe
	</a>
	{''} in London {''}
	<time
		className="o3-editorial-typography-byline-timestamp"
		dateTime="2019-10-11T20:51:54Z"
		title="October 11 2019 9:51 pm">
		October 11 2019
	</time>
</Byline>;
```

`<Byline>` props:

| Prop  | Type                    | Default    | Description          |
| ----- | ----------------------- | ---------- | -------------------- |
| theme | `standard` \| `inverse` | `standard` | Theme of the byline. |

Byline author colour and hover color can be customized by using the following CSS variables:

| Variable                                              | Description                       | Default                |
| ----------------------------------------------------- | --------------------------------- | ---------------------- |
| `--o3-editorial-typography-byline-author-color`       | Colour of the byline author       | `claret` - for core    |
| `--o3-editorial-typography-byline-author-hover-color` | Hover colour of the byline author | `claret-30` - for core |

### Quote

Quote is a composite component that includes quote text, author and caption. It is used to display direct words said by a person. It comes in two types: `block` and `pull`. The difference between the two is that `block` quote has vertical line on the left side of the quote, while `pull` quote has none. Pure HTML markup is as follows:

```html
<blockquote class="o3-editorial-typography-blockquote">
	<p>
		Origami is about empowering developers of all levels to build robust,
		on-brand products ranging from simple static sites through to rich, dynamic
		web applications, to do it faster, to do it cheaper, and leave them more
		supportable and more maintainable.
	</p>
	<cite>
		<span class="o3-editorial-typography-blockquote__author">Quote Author</span>
		<span class="o3-editorial-typography-blockquote__caption"
			>Quote Source</span
		>
	</cite>
</blockquote>
```

or with JSX import:

```jsx
import {Quote} from '@financial-times/o3-editorial-typography/cjs'; // or /esm

<Quote
	type="pull"
	quoteAuthor="Quote Author"
	quoteSource="Quote Source"
	quoteIcon={true}>
	Origami is about empowering developers of all levels to build robust, on-brand
	products ranging from simple static sites through to rich, dynamic web
	applications, to do it faster, to do it cheaper, and leave them more
	supportable and more maintainable.
</Quote>;
```

`<Quote>` props:

| Prop        | Type                    | Default    | Description                |
| ----------- | ----------------------- | ---------- | -------------------------- |
| type        | `block` \| `pull`       | `block`    | Quote text.                |
| quoteAuthor | `string`                | -          | Author of the quote.       |
| quoteSource | `string`                | -          | Source of the quote.       |
| quoteIcon   | `boolean`               | `true`     | Adds an icon to the quote. |
| theme       | `standard` \| `inverse` | `standard` | Theme of the quote.        |

### Big Number

Big Number is a composite component that includes a large number and a label. It is used to describe a big number in the editorial content. Pure HTML markup is as follows:

```html
<div class="o3-editorial-typography-big-number">
	<div class="o3-editorial-typography-big-number__title">£27,5m</div>
	<div class="o3-editorial-typography-big-number__content">
		Cost expected to increase by £13.7m a year.
	</div>
</div>
```

```jsx
import {BigNumber} from '@financial-times/o3-editorial-typography/cjs'; // or /esm

<BigNumber title="£27,5m">
	Cost expected to increase by £13.7m a year.
</BigNumber>;
```

`<BigNumber>` props:

| Prop  | Type                    | Default    | Description              |
| ----- | ----------------------- | ---------- | ------------------------ |
| title | `string`                | -          | Title of the big number. |
| theme | `standard` \| `inverse` | `standard` | Theme of the big number. |

### Lists

`o3-editorial-typography` supports ordered and unordered lists. Use the classes `o3-editorial-typography-list-ordered` or `o3-editorial-typography-list-unordered`.

Lists may be used in different contexts they inherit font properties such as size and family. It's therefore required to apply font styles to a parent element. E.g. this could be done with `o3-editorial-typography-body`:

```html
<div class="o3-editorial-typography-body">
	<ol class="o3-editorial-typography-list-ordered">
		<li>Lorem ipsum adipiscing elit.</li>
		<li>Sed feugiat turpis at massa tristique.</li>
		<li>Curabitu r accumsan elit luctus.</li>
	</ol>
</div>
```

```jsx
import {Body, List} from '@financial-times/o3-editorial-typography/cjs'; // or /esm

<Body>
	<List
		type="ordered"
		listItems={[
			'Lorem ipsum adipiscing elit.',
			'Sed feugiat turpis at massa tristique.',
			'Curabitu r accumsan elit luctus.',
		]}
	/>
</Body>;
```

`<List>` props:

| Prop      | Type                     | Default    | Description        |
| --------- | ------------------------ | ---------- | ------------------ |
| type      | `ordered` \| `unordered` | -          | Type of the list.  |
| theme     | `standard` \| `inverse`  | `standard` | Theme of the list. |
| listItems | `Array<string>`          | -          | List items.        |

## Theme modifiers

All component can have theme modifiers. By default, the theme is `standard` and is not required. `o3-editorial-typography` also supports the `inverse` theme. Adding `data-o3-theme="inverse"` to the wrapper element or at the element itself will change the colour of the text to white. Inverse theme is supported by all exported components. Pure HTML markup is as follows:

```html
<h3 class="o3-editorial-typography-label" data-o3-theme="inverse">Label</h3>
```

or if you are using JSX templates, theme can be passed as theme prop:

```tsx
import {Heading} from '@financial-times/o3-editorial-typography/cjs';

<Heading type="headline" theme="inverse">
	Headline
</Heading>;
```

## Migration

|    State     | Major Version | Last Minor Release |                    Migration guide                    |
| :----------: | :-----------: | :----------------: | :---------------------------------------------------: |
|  ✨ active   |       3       |        N/A         | [migrate to v3](MIGRATION.md#migrating-from-v2-to-v3) |
| ╳ deprecated |       2       |        2.3         | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
| ╳ deprecated |       1       |         -          |                          N/A                          |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o3-editorial-typography/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).

---

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

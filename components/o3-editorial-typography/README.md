# o3-editorial-typography

Typographic styles for editorial content.

- [Overview](#overview)
- [Markup](#markup)
  - [Heading styles](#heading-styles)
    - [HTML](#html)
    - [JSX](#jsx)
  - [Body/Paragraph styles](#bodyparagraph-styles)
    - [HTML](#html-1)
    - [JSX](#jsx-1)
  - [Editorial detail styles](#editorial-detail-styles)
    - [HTML](#html-2)
    - [JSX](#jsx-2)
  - [Composite components of editorial details](#composite-components-of-editorial-details)
    - [Byline](#byline)
    - [Quote](#quote)
    - [Big Number](#big-number)
- [Theme modifiers](#theme-modifiers)
- [Migration](#migration)
- [Contact](#contact)
- [Licence](#licence)

## Overview

`o3-editorial-typography` provides typographic styles for editorial content. It supports the following brands:

- `core`
- `sustainable-view`

For UI typography see `o3-typography`.

## Markup

o3-editorial-typography supports [JSX templates for React users](#jsx), or direct HTML. We recommend using JSX where possible.

### Heading styles

Heading styles are available in 5 different types.

| Type           | Selector                                | Notes                                                                                |
| -------------- | --------------------------------------- | ------------------------------------------------------------------------------------ |
| Headline Large | .o3-editorial-typography-headline-large | Large headline can take `data-o3-editorial-underline` attribute to add an underline. |
| Headline       | .o3-editorial-typography-headline       |                                                                                      |
| Chapter        | .o3-editorial-typography-chapter        |                                                                                      |
| Subheading     | .o3-editorial-typography-subheading     |                                                                                      |
| Label          | .o3-editorial-typography-label          |                                                                                      |

#### HTML

```html
<h1 class="o3-editorial-typography-headline-large" data-o3-editorial-underline>
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

<Headline type="headline-large" underline={true}>Large headline</Headline>
<Headline type="headline">Headline</Headline>
<Headline type="chapter">Chapter</Headline>
<Headline type="subheading">Subheading</Headline>
<Headline type="label">Label</Headline>

```

`<Headline>` props:
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| type | `headline-large` \| `headline` \| `chapter` \| `subheading` \| `label` | `headline` | Type of the headline.|
| theme | `standard` \| `inverse` | - | Theme of the headline. |
| underline | `boolean` | `false` | Adds an underline to the headline. Valid only for `headline-large`. |

### Body/Paragraph styles

O3 editorial paragraphs are styled with the `o3-editorial-typography-body--[type]` class. Where `type` can be either `large` or `small`.

| Type  | Selector                            |
| ----- | ----------------------------------- |
| Large | .o3-editorial-typography-body-large |
| Small | .o3-editorial-typography-body-small |

#### HTML

```html
<p class="o3-editorial-typography-body-small">
 This is a small paragraph of text.
</p>
```

#### JSX

Using the Typescript component applies this styling:

```jsx
import {Body} from '@financial-times/o3-typography/cjs'; // or /esm

<Body type="small">This is a paragraph of text.</Body>;
```

`<Body>` props:
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| type | `small` \| `large` | `small` | Type of the body. |
| theme | `standard` \| `inverse` | `standard` | Theme of the body. |

### Editorial detail styles

o3 editorial component export a `Detail` component that can be used to style additional information in the editorial content.

| Type             | Selector                                  | Description                                                                                                                   |
| ---------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| topic-tag        | .o3-editorial-typography-topic-tag        | Also called display tag, are category labels in the FT. Used in teasers (article cards) to indicate the category of a post.   |
| standfirst       | .o3-editorial-typography-standfirst       | Short intro below the headline that provides context about a post. Used in combination with a header in the topper component. |
| caption          | .o3-editorial-typography-caption          | For additional information about a piece or image that should be less prominent.                                              |
| byline-author    | .o3-editorial-typography-byline-author    | Shows Author name as part of a page author details in the byline component.                                                   |
| byline-location  | .o3-editorial-typography-byline-location  | Shows Author location as part of a page author details in the byline component.                                               |
| byline-timestamp | .o3-editorial-typography-byline-timestamp | Shows the timestamp of the article in the byline component.                                                                   |
| quote            | .o3-editorial-typography-quote            | For excerpt of direct words said by a person.                                                                                 |
| quote-author     | .o3-editorial-typography-quote-author     | For the author of the quote.                                                                                                  |
| quote-caption    | .o3-editorial-typography-caption          | For additional information about a piece or image that should be less prominent.                                              |

#### HTML

```html
<div class="o3-editorial-typography-topic-tag">Detail</div>
<div class="o3-editorial-typography-standfirst">Detail</div>
<div class="o3-editorial-typography-caption">Detail</div>
<div class="o3-editorial-typography-byline-author">Detail</div>
<div class="o3-editorial-typography-byline-location">Detail</div>
<div class="o3-editorial-typography-byline-timestamp">Detail</div>
<div class="o3-editorial-typography-quote">Detail</div>
<div class="o3-editorial-typography-quote-author">Detail</div>
<div class="o3-editorial-typography-quote-caption">Detail</div>
```

#### JSX

```jsx
import {Detail} from '@financial-times/o3-editorial-typography/cjs'; // or /esm

<Detail type="topic-tag">Content</Detail>
<Detail type="standfirst">Content</Detail>
<Detail type="caption">Content</Detail>
<Detail type="byline-author">Content</Detail>
<Detail type="byline-location">Content</Detail>
<Detail type="byline-timestamp">Content</Detail>
<Detail type="quote">Content</Detail>
<Detail type="quote-author">Content</Detail>
<Detail type="quote-caption">Content</Detail>
```

`<Detail>` props:
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| type | `topic-tag` \| `standfirst` \| `caption` \| `byline-author` \| `byline-location` \| `byline-timestamp` \| `quote` \| `quote-author` \| `quote-caption` | - | Type of the detail. |
| theme | `standard` \| `inverse` | `standard` | Theme of the detail. |

### Composite components of editorial details

#### Byline

Byline is a composite component that includes author name, location and timestamp. It is used to display author details in the editorial content.

```html
<div class="o3-editorial-typography-byline">
 <a class="o3-editorial-typography-byline-author" href="#">Joe Doe</a>
 &nbsp;
 <span class="o3-editorial-typography-byline-location">in London</span>
 &nbsp;
 <time
  class="o3-editorial-typography-byline-timestamp"
  datetime="2019-10-11T20:51:54Z"
  title="October 11 2019 9:51 pm"
  >October 11 2019</time
 >
</div>
```

```jsx
import {Byline} from '@financial-times/o3-editorial-typography/cjs'; // or /esm

<Byline>
 <a className="o3-editorial-typography-byline-author" href="#">
  Joe Doe
 </a>
 &nbsp;
 <span className="o3-editorial-typography-byline-location">in London</span>
 &nbsp;
 <time
  className="o3-editorial-typography-byline-timestamp"
  dateTime="2019-10-11T20:51:54Z"
  title="October 11 2019 9:51 pm">
  October 11 2019
 </time>
</Byline>;
```

`<Byline>` props:
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| theme | `standard` \| `inverse` | `standard` | Theme of the byline. |

#### Quote

Quote is a composite component that includes quote text, author and caption. It is used to display direct words said by a person. It can also include an icon to indicate the speech marks by adding `data-o3-editorial-quote-icon="true"` attribute.

```html
<blockquote
 class="o3-editorial-typography-quote"
 data-o3-editorial-quote-icon="true"
>
 <p>
  Origami is about empowering developers of all levels to build robust,
  on-brand products ranging from simple static sites through to rich, dynamic
  web applications, to do it faster, to do it cheaper, and leave them more
  supportable and more maintainable.
 </p>
 <cite>
  <span class="o3-editorial-typography-quote-author">Quote Author</span>
  <span class="o3-editorial-typography-quote-caption">Quote Source</span>
 </cite>
</blockquote>
```

```jsx
import {Quote} from '@financial-times/o3-editorial-typography/cjs'; // or /esm

<Quote quoteAuthor="Quote Author" quoteCaption="Quote Source" quoteIcon={true}>
 Origami is about empowering developers of all levels to build robust, on-brand
 products ranging from simple static sites through to rich, dynamic web
 applications, to do it faster, to do it cheaper, and leave them more
 supportable and more maintainable.
</Quote>;
```

`<Quote>` props:
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| quoteAuthor | `string` | - | Author of the quote. |
| quoteCaption | `string` | - | Source of the quote. |
| quoteIcon | `boolean` | `true` | Adds an icon to the quote. |
| theme | `standard` \| `inverse` | `standard` | Theme of the quote. |

#### Big Number

Big Number is a composite component that includes a large number and a label. It is used to describe a big number in the editorial content.

```html
<div class="o3-editorial-typography-big-number">
 <div class="o3-editorial-typography-big-number-title">£27,5m</div>
 <div class="o3-editorial-typography-big-number-content">
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
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| title | `string` | - | Title of the big number. |
| theme | `standard` \| `inverse` | `standard` | Theme of the big number. |

## Theme modifiers

`o3-editorial-typography` also supports the `inverse` theme. Adding `data-o3-theme="inverse"` to the wrapper element or at the element itself will change the colour of the text to white. Inverse theme is supported by all exported components.

```html
<h3 class="o3-editorial-typography-label" data-o3-theme="inverse">Label</h3>
```

or if you are using JSX templates, theme can be passed as theme prop:

```tsx
import {Headline} from '@financial-times/o3-editorial-typography/cjs';

<Headline type="headline" theme="inverse">
 Headline
</Headline>;
```

## Migration

|   State   | Major Version | Last Minor Release | Migration guide |
| :-------: | :-----------: | :----------------: | :-------------: |
| ✨ active |       1       |        N/A         |       N/A       |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o3-editorial-typography/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).

---

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

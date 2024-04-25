# o3-editorial-typography

Typographic styles for editorial content.

- [o3-editorial-typography](#o3-editorial-typography)
  - [Overview](#overview)
  - [Markup](#markup)
    - [Heading styles](#heading-styles)
      - [HTML](#html)
      - [JSX](#jsx)
  - [Migration](#migration)
  - [Contact](#contact)
  - [Licence](#licence)

## Overview

O3 editorial typography is keeping typography consistent and sticking to logical hierarchies ensures that page elements are clear and easily recognisable when scanning the page. Lead with Mobile-First (also applies to FT Apps. For example; FT Apps, FT Edit). `o3-editorial-typography` only supports `core` and `sustainable-view` brands.

## Markup

o3-editorial-typography supports [JSX templates for React users](#jsx), or direct HTML. We recommend using JSX where possible.

### Heading styles

Heading styles are available in 5 different types.

| Type           | Selector                                 |
| -------------- | ---------------------------------------- |
| Headline Large | .o3-editorial-typography--headline-large |
| Headline       | .o3-editorial-typography--headline       |
| Chapter        | .o3-editorial-typography--chapter        |
| Subheading     | .o3-editorial-typography--subheading     |
| Label          | .o3-editorial-typography--label          |

#### HTML

```html
<h1 class="o3-editorial-typography o3-editorial-typography--headline-large">
 Large headline
</h1>

<h1 class="o3-editorial-typography o3-editorial-typography--headline">
 Headline
</h1>

<h2 class="o3-editorial-typography o3-editorial-typography--chapter">
 Chapter
</h2>

<h3 class="o3-editorial-typography o3-editorial-typography--subheading">
 Subheading
</h3>

<h3 class="o3-editorial-typography o3-editorial-typography--label">Label</h3>
```

#### JSX

Same heading styles can be used in JSX environments as well by importing `<Headline>` component and applying `type` modifier. The component is exported as commonjs module as well as es module. Depending your project setup, you can import the component from `/cjs` or `/esm` directory.

```tsx
import { Headline } from '@financial-times/o3-editorial-typography/cjs';

<Headline type="headline-large">Large headline</Headline>
<Headline type="headline">Headline</Headline>
<Headline type="chapter">Chapter</Headline>
<Headline type="subheading">Subheading</Headline>
<Headline type="label">Label</Headline>

```

`<Headline>` props:
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| type | `headline-large` \| `headline` \| `chapter` \| `subheading` \| `label` | `headline` | Type of the headline.|
| theme | `standard` \| `inverse` | '' | Theme of the headline. |

## Theme modifiers

`o3-editorial-typography` also supports `inverse` theme. Adding `data-o3-theme="inverse"` to the wrapper element or at the element itself will change the color of the text to white.

```html
<h3
 class="o3-editorial-typography o3-editorial-typography--label"
 data-o3-theme="inverse"
>
 Label
</h3>
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

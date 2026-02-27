# Typography

FT typography uses the following typefaces, to convey information to our users in different aspects of FT products.

| Typefaces | CSS Variable | Details |
|-----------|---------------|---------|
| Metric | `--o3-font-family-metric` | Metric is our primary typeface. Clear, contemporary and rational, Metric communicates with clarity. It is best used for CTAs, body copy, and headings across all sub-brands. [Learn more about Metric](https://brand.ft.com/document/24#/branding-elements/fonts). |
| Financier Display | `--o3-font-family-financier-display` | Financier is our secondary typeface. Elegant, authoritative, and with a distinct voice. It is primarily used for large article titles and headings in editorial pages only. [Learn more about Financier Display](https://brand.ft.com/document/24#/branding-elements/fonts). |
| Georgia | `--o3-font-family-georgia` | Georgia is solely used for editorial article body copy. This is an alternate to Financier Text, as a [system font](https://en.wikipedia.org/wiki/Web_typography) it avoids the performance implications of users downloading additional custom fonts. |

## Typography Scale

We do not recommend the direct use of our typographic scale within projects. Instead use a [usecase token](#usecase-tokens), which defines family, scale, weight, and style as one token for specific scenarios.

These usecases are based on multiple typographic scales, for different font families. Our scale ranges from -2 to 10, depending on the font family. Consider scale 0 the baseline, with ascending and descending values in each direction. Avoid using styles below zero for long form content.

## Font Weight

Font weight can be used to express hierarchy or urgency of information. As with our typographic scale, we do not recommend the direct use of our font weight values within projects. Instead apply a [usecase token](#usecase-tokens).

| Weight | CSS Variable | Value |
|--------|--------------|-------|
| Light | `--o3-font-weight-light` | 300 |
| Regular | `--o3-font-weight-regular` | 400 |
| Medium | `--o3-font-weight-medium` | 500 |
| Semibold | `--o3-font-weight-semibold` | 700 |
| Bold | `--o3-font-weight-bold` | 800 |

## Usecase Tokens

Typography usecase tokens provide low level typography styles for use in a variety of contexts.

In addition to these usecase tokens, Origami provides typography components which use these. For example the [display heading component](#headings) combines all three [display sizes](#display) at different breakpoints for a responsive heading.

### Display

Display styles, as the largest text on the screen, are reserved for short, important text or numerals.

These styles are responsive to screen sizes and use the Financier Display typeface. This font family should be used exclusively for editorial story headlines, such as teaser headlines or article toppers.

#### display-lg

Use this style for large screens headlines in the main headers (toppers) of content pages, for prominent, large teasers or landing pages.

##### Inspect display-lg values

| Name | CSS Variable | Value |
|------|--------------|-------|
| fontFamily | `--o3-type-display-lg-font-family` | financier display VF, serif |
| fontWeight | `--o3-type-display-lg-font-weight` | 800 |
| fontSize | `--o3-type-display-lg-font-size` | 48px |
| lineHeight | `--o3-type-display-lg-line-height` | 48px |

#### display-md

Use this style for medium screens headlines in the main headers (toppers) of content pages, for prominent, large teasers or landing pages.

##### Inspect display-md values

| Name | CSS Variable | Value |
|------|--------------|-------|
| fontFamily | `--o3-type-display-md-font-family` | financier display VF, serif |
| fontWeight | `--o3-type-display-md-font-weight` | 800 |
| fontSize | `--o3-type-display-md-font-size` | 40px |
| lineHeight | `--o3-type-display-md-line-height` | 40px |

#### display-sm

Use this style for small screens headlines in the main headers (toppers) of content pages, for prominent, large teasers or landing pages.

##### Inspect display-sm values

| Name | CSS Variable | Value |
|------|--------------|-------|
| fontFamily | `--o3-type-display-sm-font-family` | financier display VF, serif |
| fontWeight | `--o3-type-display-sm-font-weight` | 800 |
| fontSize | `--o3-type-display-sm-font-size` | 32px |
| lineHeight | `--o3-type-display-sm-line-height` | 32px |

### Headline

Headlines are best suited for short, high-emphasis text on smaller screens and components. They work well for highlighting primary text passages or important content regions. Headlines use the Financier Display typeface, with carefully integrated line height and letter spacing to ensure readability. This font style should be reserved exclusively for editorial story headlines, such as teaser headlines or article toppers.

#### headline-lg

Use this style for large screens headlines in standard-sized teasers and text only toppers (eg. Opinion and News).

##### Inspect headline-lg values

| Name | CSS Variable | Value |
|------|--------------|-------|
| fontFamily | `--o3-type-headline-lg-font-family` | financier display VF, serif |
| fontWeight | `--o3-type-headline-lg-font-weight` | 300 |
| fontSize | `--o3-type-headline-lg-font-size` | 40px |
| lineHeight | `--o3-type-headline-lg-line-height` | 40px |

#### headline-md

Use this style for medium screens headlines in smaller teasers and text only toppers (eg. Opinion and News).

##### Inspect headline-md values

| Name | CSS Variable | Value |
|------|--------------|-------|
| fontFamily | `--o3-type-headline-md-font-family` | financier display VF, serif |
| fontWeight | `--o3-type-headline-md-font-weight` | 300 |
| fontSize | `--o3-type-headline-md-font-size` | 32px |
| lineHeight | `--o3-type-headline-md-line-height` | 32px |

#### headline-sm

Use this style for small screens headlines in smaller teasers and text only toppers (eg. Opinion and News).

##### Inspect headline-sm values

| Name | CSS Variable | Value |
|------|--------------|-------|
| fontFamily | `--o3-type-headline-sm-font-family` | financier display VF, serif |
| fontWeight | `--o3-type-headline-sm-font-weight` | 300 |
| fontSize | `--o3-type-headline-sm-font-size` | 20px |
| lineHeight | `--o3-type-headline-sm-line-height` | 24px |

### Title

Titles should be used for medium-emphasis text that remains relatively short. For example, consider using title styles to divide secondary passages of text or story paragraph.

#### title-lg

Use for the main page title H1 in functional pages such as account and settings. Use across all breakpoints.

##### Inspect title-lg values

| Name | CSS Variable | Value |
|------|--------------|-------|
| fontFamily | `--o3-type-title-lg-font-family` | metric 2 VF, sans-serif |
| fontWeight | `--o3-type-title-lg-font-weight` | 700 |
| fontSize | `--o3-type-title-lg-font-size` | 28px |
| lineHeight | `--o3-type-title-lg-line-height` | 32px |

#### title-md

Use this style as H3 or subtitles within the content body to break paragraphs, or for titles of components like forms, tables and cards across all breakpoints.

##### Inspect title-md values

| Name | CSS Variable | Value |
|------|--------------|-------|
| fontFamily | `--o3-type-title-md-font-family` | metric 2 VF, sans-serif |
| fontWeight | `--o3-type-title-md-font-weight` | 300 |
| fontSize | `--o3-type-title-md-font-size` | 24px |
| lineHeight | `--o3-type-title-md-line-height` | 32px |

#### title-sm

Use H6 for subtitles within the content body to break up paragraphs, and H2 for subheadings on stream pages or as subtitles for components such as forms, tables, and cards across all breakpoints.

##### Inspect title-sm values

| Name | CSS Variable | Value |
|------|--------------|-------|
| fontFamily | `--o3-type-title-sm-font-family` | metric 2 VF, sans-serif |
| fontWeight | `--o3-type-title-sm-font-weight` | 400 |
| fontSize | `--o3-type-title-sm-font-size` | 28px |
| lineHeight | `--o3-type-title-sm-line-height` | 24px |

### Body

Body styles are used for longer passages of text in your features and components.

#### body-lg

Use primarily for the stand-first (introductory summary or highlight) in topper component, as larger body text in components, or section description.

##### Inspect body-lg values

| Name | CSS Variable | Value |
|------|--------------|-------|
| fontFamily | `--o3-type-body-lg-font-family` | metric 2 VF, sans-serif |
| fontWeight | `--o3-type-body-lg-font-weight` | 400 |
| fontSize | `--o3-type-body-lg-font-size` | 18px |
| lineHeight | `--o3-type-body-lg-line-height` | 24px |

#### body-base

Use this style for the stand-first in teasers and as the default body copy style across components such as location in the byline.

##### Inspect body-base values

| Name | CSS Variable | Value |
|------|--------------|-------|
| fontFamily | `--o3-type-body-base-font-family` | metric 2 VF, sans-serif |
| fontWeight | `--o3-type-body-base-font-weight` | 400 |
| fontSize | `--o3-type-body-base-font-size` | 16px |
| lineHeight | `--o3-type-body-base-line-height` | 24px |

#### body-highlight

Use this style for bold formatting in body copy or for small interactive elements, such as Topic tags and Author names.

##### Inspect body-highlight values

| Name | CSS Variable | Value |
|------|--------------|-------|
| fontFamily | `--o3-type-body-highlight-font-family` | metric 2 VF, sans-serif |
| fontWeight | `--o3-type-body-highlight-font-weight` | 700 |
| fontSize | `--o3-type-body-highlight-font-size` | 16px |
| lineHeight | `--o3-type-body-highlight-line-height` | 24px |

### Label and Details

Label styles are smaller, utilitarian styles, used for very small text within body copy such as captions, contextual info, and label tags.

#### detail

Use this style for caption in visual assets such as image and video and for small text elements, such as secondary metadata, caveats, or footnotes.

##### Inspect detail values

| Name | CSS Variable | Value |
|------|--------------|-------|
| fontFamily | `--o3-type-detail-font-family` | metric 2 VF, sans-serif |
| fontWeight | `--o3-type-detail-font-weight` | 700 |
| fontSize | `--o3-type-detail-font-size` | 14px |
| lineHeight | `--o3-type-detail-line-height` | 20px |

#### label

Use this style for labels such as badges and metadata in teasers and toppers (e.g., "Live," "Premium," or the main timestamp). Avoid using full sentences.

##### Inspect label values

| Name | CSS Variable | Value |
|------|--------------|-------|
| fontFamily | `--o3-type-label-font-family` | metric 2 VF, sans-serif |
| fontWeight | `--o3-type-label-font-weight` | 700 |
| fontSize | `--o3-type-label-font-size` | 14px |
| lineHeight | `--o3-type-label-line-height` | 20px |
| textCase | `--o3-type-label-text-case` | uppercase |

### Body content

#### body-content-base

Use this style only for the body copy of content pages, such as articles, live news and other content experience page.

##### Inspect body-content-base values

| Name | CSS Variable | Value |
|------|--------------|-------|
| fontFamily | `--o3-type-content-base-font-family` | Georgia |
| fontWeight | `--o3-type-content-base-font-weight` | Regular |
| fontSize | `--o3-type-content-base-font-size` | 20px |
| lineHeight | `--o3-type-content-base-line-height` | 32px |

#### body-content-highlight

Use this style only for the body copy of content pages, such as articles, live news and other content experience page.

##### Inspect body-content-highlight values

| Name | CSS Variable | Value |
|------|--------------|-------|
| fontFamily | `--o3-type-content-highlight-font-family` | Georgia |
| fontWeight | `--o3-type-content-highlight-font-weight` | Bold |
| fontSize | `--o3-type-content-highlight-font-size` | 20px |
| lineHeight | `--o3-type-content-highlight-line-height` | 32px |

#### body-content-emphasis

Use this style only for the body copy of content pages, such as articles, live news and other content experience page.

##### Inspect body-content-emphasis values

| Name | CSS Variable | Value |
|------|--------------|-------|
| fontFamily | `--o3-type-content-emphasis-font-family` | Georgia |
| fontWeight | `--o3-type-content-emphasis-font-weight` | Regular |
| fontSize | `--o3-type-content-emphasis-font-size` | 20px |
| lineHeight | `--o3-type-content-emphasis-line-height` | 32px |
| fontStyle | `--o3-type-content-emphasis-font-style` | italic |

### Links

The link style can be applied inline (within a paragraph or body text) or standalone. The inline links inherit the text properties of the body it is in. Its focus style follows the global Origami focus for single ring element.

This example shows a link within copy that uses `body-base`.

Here's another example which shows a link within `body-content-base`.

## UI Components

User interface (UI) typography components apply [typography usecase tokens](#usecase-tokens). They are intended for all design elements except those with an editorial voice, such as article page content (see [editorial typography](#editorial-components)).

### List

Lists allow users to view two or more individual, but related, text items grouped together. We have ordered and unordered lists.

Ordered list contains items in a sequential order or priority. List items follow an alphanumeric sequence.

#### Unordered List

Unordered lists make blocks of related text easier to read. Use for non-sequential lists.

## Editorial Components

Editorial typography components bring together [typography usecases](#usecase-tokens) for a specific purpose. For example combining the 3 display sizes into one responsive heading. They are intended for editorial and article content e.g article and home pages, live news, teasers.

### Headings

Names of heading styles in Editorial typography are broadly aligned with the naming used within Editorial, however “display” is sometimes called “headline large”.

#### Display

Responsive headlines used for titles and headlines of Main news pages and articles, applying the [display typography use-cases](#display). Usually in the full-bleed topper component. Use in moderation.

#### Headline

For titles and introductions of Feature posts and other new stories. Usage example: [Top Stories](https://www.ft.com/content/0d1326b7-8c83-46bc-a9c2-56ce7bb1a109#:~:text=Add%20to%20myFT-,Keir%20Starmer%20defends%20green%20spending%20U%2Dturn%20as%20Sunak%20claims%20Labour%20policy%20is%20in%20%E2%80%98tatters%E2%80%99,-Opposition%20leader%20wants), [Opinion](https://www.ft.com/content/65593173-7f85-47f6-a253-29cc374fd3ca#:~:text=Opinion%20Corporate%20governance-,Sunak%20take%20note%3A%20diluting%20corporate%20governance%20has%20consequences,-Proposed%20reforms%20to) . Applies the [headline typography use-cases](#headline) in one responsive style.

#### Chapter

For in-page titles / chapters.

#### Subheading

For in-page sub-titles / sub-headings.

#### Label

To provide short details about a chapter, kickers (additional headline) just above a chapter.

### Body

For article body use the [body-content](#body-content) [typography use-case](#body-content) as above.

### Drop Cap

Use for stylistic emphasis on the first letter of an article.

### Quotes

The quote component is used to highlight notable statements, excerpts, or phrases from articles, interviews, and other types of content. It draws attention to key information and enhances the reading experience.

We have two variants:

#### Block quote

For direct quotations of an author's words from other sources. It’s usually indented from the main body of text.

#### Pull quote

Pull quote is used to highlight important points within a body of text. It is usually placed within the body of the text and left-aligned.

### Lists

For lists in article content. Refer to guidelines under [UI lists above](#list).

#### Ordered List

Ordered list contains items in a sequential order or priority. List items follow an alphanumeric sequence.

#### Unordered List

Unordered lists make blocks of related text easier to read. Use for non-sequential lists.

### Big Number

Big Number is a composite component that includes a large number and a label. It is used to describe a big number in the editorial content.

### Byline

Byline component tells information about the author of a piece. The elements that constitute a byline include, author name, location and timestamp.

### Topic Tag

Topic tag is used to indicate the category of a post. Its default colour may be customised to suit your product need.

##### Topic tag customisation options

| Option | Description |
|--------|-------------|
| Topic tag color | The colour of the topic tag. |
| Topic tag hover color | The colour of the topic tag on hover. |

E.g. to make the topic tag pink

```css
:root{
	--o3-editorial-typography-topic-tag-color: hotpink;
	--o3-editorial-typography-topic-tag-hover-color: deeppink;
}
```

### Standfirst

Short intro below the headline that provides context about a post. Used in combination with a header in the topper component.

### Caption

For additional information about a piece or image that should be less prominent.

## Usage Guidelines

### Use descriptive words to describe links

Link text should be clear, concise, and descriptive enough to make sense out of context. Avoid vague phrases like “click here” or “read more.” for example: use “Read our accessibility guidelines” Instead.

### Define heading levels

Styles can be assigned a heading level that is independent of style name, size, weight, or other properties.

### Don't use Financier fonts for UI

The Financier Display font must be used for Editorial article content only, use Metric for UI.

### Avoid negative font scales

Scales less than zero, o3-font-size--1(14px) and o3-font-size--2(12px), are edge cases. Avoid these as they can be hard to read especially on large screens. Negative scales may be used to present short, secondary information where needed to align to existing designs. However we recommend using predefined [ui typography](#ui-typography) styles where possible.
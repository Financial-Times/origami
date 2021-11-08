---
title: Origami Newsletter, May 2019
description: This issue features a new and improved version of o-forms, a new component o-spacing, and fancy new features to our colour contrast checker.
author: Lee Moody
tags:
  - Newsletter
---

**TL;DR:** This issue features a new and improved version of o-forms, a new component o-spacing, and fancy new features to our colour contrast checker.

## Top three things

These are some of the bigger things we've worked on or released over the last month.

### o-forms

This month we released a new version of `o-forms@^7.0.0` with some major improvements:
- We've reduced the minified bundle size by *30%* &#x1F389;.
- Markup has been simplified, and has become more flexible — we've reduced the amount of wrapper elements, and inputs may be used independently of a form element more easily.
- We've included a new markdown document about form accessibility.
- We've included a new interactive error summary alongside built-in form validation.

You can find [o-forms demos](https://registry.origami.ft.com/components/o-forms@7.0.3) and the [migration guide](https://registry.origami.ft.com/components/o-forms@7.0.3/readme?brand=core#migration) in the registry.

### o-spacing

We’ve been working with the uxd team to bring new spacing guidelines to Origami, to help us achieve a more consistent layout across our sites and pages.

Currently `o-typography` provides developers with Sass tools to output spaces (for margins, paddings, etc.) according to our 4px baseline grid. But it’s not obvious spacing tools are there in `o-typography`, and the flexibility of any multiple of 4px has lead to some inconsistent layouts.

So we’ve created `o-spacing` &#x1F389;. It’s still possible to output any size from our 4px baseline (like `oTypographySpacingSize`), but there are now a more limited set of named spaces which align with our uxd toolkit. We’ve also included new CSS Custom Properties (CSS Variables) and class helpers to help build service users lay out a page.

Please [see the readme](https://registry.origami.ft.com/components/o-spacing@1.0.0-beta.1/readme) for details including an overview, diagrams, and technical documentation.

### o-colors picker

The `o-colors` contrast checker was also updated this month with some shiny new features. It's now possible to test two colours for contrast based on our colour palettes, their tints, and mixes of the palette.

<img alt="" src="https://www.ft.com/__origami/service/image/v2/images/raw/https://origami.ft.com/assets/images/2019-05-31-newsletter/contrast-checker.png?source=origami" />

You can find the contrast checker on the [o-colors demo](https://registry.origami.ft.com/components/o-colors@4.8.8) page of the registry.

## Special thanks

Special thanks this time goes to Origami member Gabrielle von Koss (Gabi), who sadly left the FT this month. Gabi joined us from Makers in 2016 and worked on Ads, Rich Journalism, ScoutAsia CMS, and Lighthouse before settling in Origami. A big thanks for her contributions, not least the new major of `o-forms`, a new major of `o-syntax-highlight`, and the o-colors contrast checker improvements in this issue! &#x1F4AA;

## Broader update

A digest list of other things that have happened over the last month.

- MAJOR: [o-syntax-highlight@v2.0.0](https://registry.origami.ft.com/components/o-syntax-highlight@2.0.0) was released. It simplifies the Sass api and adds support for both the internal and master brands.
- MINOR: [o-tooltip@v3.5.0](https://registry.origami.ft.com/components/o-tooltip@3.5.0) now correctly removes any generated tooltip when the `destroy` method is called. It also has a new option to show on focus (all credit to Max Clark).
- PATCH: [o-video@v5.1.5](https://registry.origami.ft.com/components/o-video@5.1.5) fixes a flaw which impacted playback performance of long videos, caused by excessive tracking events firing. Nice work from Liam Keaton on this one &#x1F44C;.
- PATCH: [o-buttons@v5.16.4](https://registry.origami.ft.com/components/o-buttons@5.16.4) reduces the total bundle size of o-buttons by 11% (minified, gzip). This change will not have a big impact for Sass users who may include styles granularly, but marks a significant reduction for build service users.
- PATCH: [o-teaser@v3.5.4](https://registry.origami.ft.com/components/o-teaser@3.5.4) fixes the focus style of video teasers (thanks Liam Keaton).
- PATCH: [o-normalise@v1.7.1](https://registry.origami.ft.com/components/o-normalise@1.7.1) updates the default colour of our focus outline to improve contrast with paper and inverse backgrounds, in response to our DAC Audit.
- PATCH: [o-typography@v5.11.5](https://registry.origami.ft.com/components/o-typography@5.11.5) handles non-numeric passed to Sass functions values when relative font units are enabled; updates the default focus state of custom link styles in accordance to our DAC audit; and has a bug fix to remove dart sass warnings.
- PATCH: [o-tracking@v1.7.2](https://registry.origami.ft.com/components/o-tracking@1.7.2) tweaks a "window.IntersectionObserver" warning which was output when it shouldn't be (thanks for the fix Asuka Ochi).
- PATCH: [o-fonts@v3.3.2](https://registry.origami.ft.com/components/o-fonts@3.3.2) corrects documentation of allowed fonts.
- PATCH: [o-header@v7.8.6](https://registry.origami.ft.com/components/o-header@7.8.6) in response to our DAC Audit (Digital Accessibility Centre), this release of o-header keeps focus within the drawer when tabbing to the end -- thanks Remy Bach!
- PATCH: [o-footer@v6.1.3](https://registry.origami.ft.com/components/o-footer@6.1.3) fixes an issue with the alignment of "terms & conditions" in Safari (thanks again Remy Bach).
- PATCH: [o-layout@v3.1.10](https://registry.origami.ft.com/components/o-layout@3.1.12) includes a handful of nice improvements including: padding to header permalinks; blockquote styles; tweaks to the sidebar so words in the sidebar navigation do not break if possible; overflow of images in the main content area is now prevented by default; a bug fix to remove double links in linked headings; progressive font loading improvements to better normalise the size of default fonts; and expanded documentation for build service users.
- PATCH: [node-health-check@v1.10.1](https://github.com/Financial-Times/node-health-check/) has improved documentation with `node-fetch` troubleshooting details (thanks James Loveridge)!

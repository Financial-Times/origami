---
title: Origami Newsletter, May 2021
description: The Origami specification is no more
author: chee rabbits, lee moody
tags:
- Newsletter
---

<abbr title="Too long; didn't read">
<strong>
TL;DR:
</strong>
</abbr> {{page.description}}

## Top things

Some of the bigger Origami news from the last month:


### The Origami specification is no more

The team spent most of the month revisiting the [Origami Specification](https://origami.ft.com/spec/v1/). The specification is a formal document detailing the rules of how an Origami project, such as a component, must be built. We were trying to separate the parts of it that were developer advice from the parts that were relied on by our tools and services. After reducing the specification from 35 pages to 3, we had one last meeting in which we ultimately decided to retire the specification entirely.

### What do people mean when they say Origami?

When other teams say Origami, they tend to mean either the FT’s design or our team.

When we say Origami we tend to mean our reference implementation of the brand guidelines.

### What is the benefit of the specification?

Origami was originally conceived as a series of specifications for components and services. There was an expectation that people all over the company and at external agencies would be building new Origami components and services all the time. In that context, a shared contract made a lot of sense.

But that’s not how it ended up. Origami components are mostly built by our team, and we’re always in the loop when other teams build Origami components. 

Teams don't trust the specification, they trust **us**.

The specification wasn't what kept our components working in all the environments they were used in: we did!

We've always been vigilant about not breaking things for people, and that will never change. Breaking changes will _always_ happen in major versions.

Retiring the specification gives us the opportunity to create better, faster, more modern components and to make sure that Design are a leading part of the process.

We'll be going into a lot more detail about our plans in a blog post at the end of Q2.

## Special thanks

This issues special thanks goes to Nick Ramsbottom! Nick worked with us on a component update to support New Product Development work, and enthusiastically got involved in the development. Together we were able to avoid project-specific overrides for a more reliable, consistent user interface.

If your team are looking to customise an Origami component for a project, checkout our [guide to component customisation](https://origami.ft.com/docs/components/customisation/) or contact the team for support.

## Broader update

A digest of other things that have happened since our last update:

- DEPRECATED: [podcast-logos](https://github.com/Financial-Times/podcast-logos), podcast logos are no longer updated in Origami, refer to Acast, the podcast hosting system we use.
- MINOR: [o-colors](https://github.com/Financial-Times/o-colors) adds a new "matisse" colour, which is used by partner content.
- MINOR: [o-forms](https://github.com/Financial-Times/o-forms) provide styling for a file upload input `input[type="file"]` 🎉, and fixes the low contrast of valid form fields for the whitelabel brand.
- MINOR: [o-labels](https://github.com/Financial-Times/o-labels) adds a wider selection of labels for the internal brand, using colours from our palette.
- MINOR: [o-layout](https://github.com/Financial-Times/o-layout) fixes an issue where the "muted hero" area was obscured by the page background colour.
- MINOR: [o-tooltip](https://github.com/Financial-Times/o-tooltip) adds Sass customisation options, including foreground and background colours. Thanks again, Nick Ramsbottom!
- MINOR: [polyfill-library](https://github.com/Financial-Times/polyfill-library) adds a polyfill for `HTMLInputElement.prototype.valueAsDate`, fix a [`URLSearchParams` bug](https://github.com/Financial-Times/polyfill-library/issues/1048), and more ([polyfill-library releases](https://github.com/Financial-Times/polyfill-library/releases)).
- PATCH: [change-api-action](https://github.com/Financial-Times/change-api-action) only adds `githubname` to the change api payload if the action was triggered by a github user, this fixes the action when trigged at set intervals by a cron for example.
- PATCH: [o-grid](https://github.com/Financial-Times/o-grid) fixes `o-grid.layoutChange` events given custom layouts (breakpoints). Thanks for your help with that, Eray Baskin!
- PATCH: [o-table](https://github.com/Financial-Times/o-table) fixes the `updateRows` method to account for removed or changed rows. Thanks Emma Lewis for your work investigating that one!
- PATCH: [origami-percy](https://github.com/Financial-Times/origami-percy) is used for component visual regression testing, it's now more reliable and will not error if no component demos are found for a supported brand. In addition it runs automatically for each component now and the `percy` Github label, which used to trigger tests, has been removed.
- PATCH: [useragent_parser](https://github.com/Financial-Times/useragent_parser) updates the detection logic for more accurate reporting of ios 11 and newer versions.
- The [Origami Registry](https://registry.origami.ft.com/components) now shows stable releases of components by default. Use the version switcher in the right-hand sidebar to preview upcoming beta releases.
- The following projects have had additional updates to support the [migration from bower to NPM](https://origami.ft.com/blog/2021/01/18/deprecating-bower-and-origami-via-npm/):
   - [origami-repo-data](https://github.com/Financial-Times/origami-repo-data)
   - [origami-website](https://github.com/Financial-Times/origami-website)
   - [o-test-component](https://github.com/Financial-Times/o-test-component)
   - [origami-build-tools](https://github.com/Financial-Times/origami-build-tools)
   - [origami-build-service](https://github.com/Financial-Times/origami-build-service)
   - [create-origami-component](https://github.com/Financial-Times/create-origami-component)
   - [remark-preset-lint-origami-component](https://github.com/Financial-Times/remark-preset-lint-origami-component)

---
title: Origami Newsletter, February 2023
description: Origami updates on its new components and work exploring options for a Multi-brand design system
author: Ben Freshwater
tags:
  - Newsletter
---

<abbr title="Too long; didn't read">
<strong>
TL;DR:
</strong>
</abbr> {{page.description}}

## Top things

Some of the bigger Origami news since our last update:

### New component – o-multi-select

Akaki has been working with Designers to introduce a new component – o-multi-select. This component allows users to select multiple options from a list, building upon the browser's native multi select capability. Will Renny has collaborated with us to provide guidance on design.

o-multi-select is near completion and will ship with TSX templates. It is planned to be released in the upcoming month.

### Multi-brand exploration

As Origami's user base grows, it will naturally end up supporting more components. Specifically, more variations of existing components. This can sometimes end up with component fragmentation with teams copy/pasting existing components and styling to their needs. Fortunately, there are tools which can enable components to support multiple brands and styles whilst being sourced from a single curated repository.

The Origami team has been exploring this, and a number of options are available. Enabling multi brand capability will help bring more brands to the design system and continue to reduce duplication of components throughout the FT. Greater consistency between Design and Engineers can also be achieved through tooling and pipelines that distribute brand tokens between both teams.

Exploration will continue with a proof of concept being delivered next.

## Special Thanks

Special thanks to; Will Renny for their contributions to o-multi-select; Juan Sanchez, Alberto Cubero Navas, Phil Hunt, for their contributions throughout February.

## Broader update

A digest list of some other things that have happened in February:

- [o-forms](https://registry.origami.ft.com/components/o-forms): has been updated to allow submit events to be intercepted.
- [o-buttons](https://registry.origami.ft.com/components/o-buttons): now supports any string as an icon parameter, also preserves the default set as inputs to help TypeScript users.
- [o-comments](https://registry.origami.ft.com/components/o-comments): upgrades to support Coral v7, introduces a custom scroll container option, introduces ability to set additional classes on shadow dom, various styling changes.
- [o-ft-concept-button](https://registry.origami.ft.com/components/o-ft-concept-button): introduce inverse monochrome variant.
- [o-topper](https://registry.origami.ft.com/components/o-topper): change styling for deep landscape, various other styling changes.


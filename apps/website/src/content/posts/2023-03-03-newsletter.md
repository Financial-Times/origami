---
title: Origami Newsletter, February 2023
description: Origami updates on its new components and work exploring options for a Multi-brand design system
author: Ben Freshwater
publishDate: 2023-03-03
tags:
  - Newsletter
custom_email_slug: 2023-02-01-newsletter
---


## Top things

Some of the bigger Origami news since our last update:

### New component – o-multi-select

Akaki has been working with Designers to introduce a new component – o-multi-select. This component allows users to select multiple options from a list, building upon the browser's native multi select capability. Will Renny has collaborated with us to provide guidance on design.

o-multi-select is near completion and will ship with TSX templates. It is planned to be released in the upcoming month.

![the o-multi-select component](https://www.ft.com/__origami/service/image/v2/images/raw/https://origami.ft.com/assets/images/2023-03-03-newsletter/o-multi-select.png?width=500&quality=highest&source=origami)

### Multi-brand exploration

As Origami's user base grows, it will naturally end up supporting more components. Specifically, more variations of existing components. This can sometimes end up with component fragmentation with teams copy/pasting existing components and styling to their needs.

Origami already supports multiple brands with ft-core, internal, and whitelabel branding. With the Origami team planning support for the FT Professional brand, we have been exploring ways in which we can scale the rollout of new brands. Fortunately, there are tools which can help us spin up new brands quicker and introduce more variations of existing components. Another key question for us is how can we provide design tooling to match engineering tooling.

The Origami team has been exploring some of the options in February. Exploration will continue with a proof of concept being delivered next.

### Jira

As an enablement team, we collaborate with a lot of multi-disciplinary teams across the FT Group. We want to ensure our shared tracked work is visible across all disciplines in Product and Technology, and our current board for tracking, GitHub, is less familiar to people outside of engineering. In light of this, we have begun using Jira to track our shared work so that our collaborators have better visibility on what we do.

Our new board can be accessed through [Jira](https://financialtimes.atlassian.net/jira/software/c/projects/OR/boards/1658).

## Special Thanks

Special thanks to; Will Renny for their contributions to o-multi-select; Juan Sanchez, Alberto Cubero Navas, Phil Hunt, for their contributions throughout February.

## Broader update

A digest list of some other things that have happened in February:

- [o-forms](https://registry.origami.ft.com/components/o-forms): has been updated to allow submit events to be intercepted. This helps the Acquisition team use reCaptcha on the sign-up page.
- [o-buttons](https://registry.origami.ft.com/components/o-buttons): now supports any string as an icon parameter, also preserves the default set as inputs to help TypeScript users.
- [o-comments](https://registry.origami.ft.com/components/o-comments): upgrades to support Coral v7, introduces a custom scroll container option, introduces ability to set additional classes on shadow dom, various styling changes. This will enable the Storytelling team to upgrade Coral.
- [ft-concept-button](https://registry.origami.ft.com/components/ft-concept-button): introduces inverse monochrome variant as requested by the Storytelling team.
- [o-topper](https://registry.origami.ft.com/components/o-topper): change styling for deep landscape, various other styling changes.


---
title: Origami Newsletter, April 2023 - May 2023
description: Origami is preparing two talks for June. We released FT Professional themes for a bunch of components. We started working on Origami For Everyone(O3) and we started talking to other organisations to share knowledge about design systems.
author: Akaki Mikaia
publishDate: 2023-05-31
tags:
  - Newsletter
---

## Top things

Some of the bigger Origami news since our last update:

## Upcoming talks and workshops

Mark your calendars! We have two engaging talks lined up for the upcoming month.

1. [Introduction to Origami](https://financialtimes.learn.link/content/62f4125979e7860012a64e2e/): Lee will be delivering an insightful session that provides a high-level overview of Origami. Whether you work in Product or Technology, this talk is for you! Discover why Origami exists and how it can benefit you in your work.

2. [Origami Foundations](https://financialtimes.learn.link/content/6478b3546da1c4001190511a): Join Ako as he explores the fundamentals of Origami components. This talk will delve into the usage, advantages, and practical implementation of key components such as o-normalise, o-fonts, o-spacing, o-colors, o-typography, and a glimpse into o-grid.

***Note:*** This talk is engineer oriented but anyone who want to deepen their Origami knowledge is definitely welcome.

## FT Professional

Last months Origami has been working with FT Professional to gather requirements and identify which Origami components require a new FT Professional theme, this quarter we managed to release more themes than we promised and we will release a few more before Q2 finishes.

Currently we support `o-banner`, `o-forms`, `o-tooltip`, `o-typography` and `o-buttons` component themes and variations.

## Origami for everyone

We're excited about [Origami for Everyone](https://financialtimes.atlassian.net/wiki/spaces/OR/blog/2023/05/18/8064925807/Introducing+Origami+for+Everyone) as creating differentiated products targeting different audiences is a central theme of the [FT’s product and growth strategy](https://inside.ft.com/home/knowledge-base/Product-strategy-2023). Origami for Everyone will allow Origami to scale to support more brands, designer-developer collaboration, and multi-platform compatibility.

To achieve these vision, we'll need to make some fundamental changes in the existing Origami implementation. We've already started recruiting a new designer to lead on the design side of Origami, and we've been conducting research into design tokens, which will form the backbone of the new implementation of Origami. Ben already did a demo for new design tokens system and we got some initial positive feedback from our potential users. You can read more about this on our blogpost [Origami Team Trials Design Tokens](https://financialtimes.atlassian.net/wiki/spaces/OR/blog/2023/04/20/8047034476/Origami+Team+Trials+Design+Tokens) and if you want to know more of a technical decisions made along the way check out [Conventions for origami Design Tokens](https://financialtimes.atlassian.net/wiki/spaces/OR/blog/2023/04/26/8049524875/Conventions+for+Origami+Design+Tokens).

We encourage everyone to actively participate in this project, offering feedback and sharing proposals for the new Origami architecture. Together, we can shape a future where the Origami design system works seamlessly with every product we deliver.

## Knowledge sharing with other organisations

We've been talking with other organisations to share knowledge about design systems. We had a meeting with the design system team from the Lego, Washington Post, and Compare The Market. Next month we have a meeting scheduled with Conde Nast and we are all excited to share our knowledge and learn from each other.

## Special Thanks

We had a few contributors who helped us to improve Origami components and we want to thank them for their contributions. Thanks to Juan Sanchez Alcala for contributing to `o-topper`, `o-video` and `o-comments` components.

Special thanks to Anna Bebb for deprecating  the `n-sliding-popup` component – that prompted us to write some docs on how to do deprecate Origami components. Now we have a [guide on how to deprecate Origami components](https://origami.ft.com/documentation/components/versioning/#deprecate-a-component)

We had new contributors who helped us to improve Origami components. Thanks to Marlon Bucley for helping us to improve `o-multi-select` component and thanks to Ed Gargan for helping us to improve `o-forms` component.

And a final thankyou to Arjun Gadhia who contributed a new customisation feature to o-autocomplete to support the TagMe rewrite. This was a most [excellent pull request](https://github.com/Financial-Times/origami/pull/1127) which included problem context, screenshots, documentation, and demos – making it very easy for the team to review and approve.
## Broader update

A digest list of some other things that have happened in April and May:

- Major [o-multi-select](https://registry.origami.ft.com/components/o-multi-select): After some feedback from Spark we improved `o-multi-select` functionality and now it can be initialised with a selected value. We also added a custom event `OptionChange` to enable users to track interactions to o-multi-select. We also published TSX templates.
- Minor [o-forms](https://registry.origami.ft.com/components/o-forms): `o-forms` had a few minor releases in the last two months. We removed the "green" valid state from `o-forms`. Deprecated pseudo-radio-links. `o-forms` now also has TSX templates published and can be used by other TSX projects. We also released FT Professional themes for `o-forms` elements. Now we apply invalid input styles to inputs with custom validation, as well as those which use default browser validation.
- Minor [o-topper](https://registry.origami.ft.com/components/o-topper): To improve accessibility, we changed the outline colour for focus links in some cases.
- Minor [ft-concept-button](https://registry.origami.ft.com/components/ft-concept-button): Now `ft-concept-button` sets aria-label on initialise.
- Minor [o-buttons](https://registry.origami.ft.com/components/o-buttons): Now o-buttons supports `professional` themes.
- Minor [o-colors](https://registry.origami.ft.com/components/o-colors): Professional color Mint is now part of o-colors pallet. We added `page-inverse` and `base-inverse` colour usecases.
- Minor [o-tooltip](https://registry.origami.ft.com/components/o-tooltip): added `professional` themes and now it supports setting themes imperatively.
- Minor [o-typography](https://registry.origami.ft.com/components/o-typography): added `professional` themes for body and links.
- Minor [o-autocomplete](https://registry.origami.ft.com/components/o-autocomplete): added a `suggestionTemplate` override option. This function is used to override the default rendering of suggestion items in autocomplete, with a function that returns a custom HTML string for the given option. It is typically used when wanting to provide additional context or styling for each suggestion item.
- Minor [o-banner](https://registry.origami.ft.com/components/o-banner): added a new `inverse-professional` themes.
- Patch [o-header](https://registry.origami.ft.com/components/o-header): We improved scroll button behaviour in the o-header subnav.

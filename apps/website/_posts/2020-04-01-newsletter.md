---
title: Origami Newsletter, March 2020
description: This issue features remote first working, deep spring cleaning, and an improved release workflow.
author: Lee Moody
tags:
  - Newsletter
---

<abbr title="Too long; didn't read">
	<strong>
	TL;DR:
	</strong>
</abbr> {{page.description}}

## Top Things

These are some of the bigger things we've done over the last month.

### Remote First

It's hard to believe we were largely working from an office at the beginning of this month. A reminder that we're here to help. Our level of support is the same, and we’re happy to help via a hangout or Slack. 😊

We're also running our workshops as usual. This month we ran out first ever fully remote "An Introduction to Origami" workshop for our fellow colleagues in Sofia. Thanks to everyone who attended!

Find us on Slack here:
- [#origami-support](https://app.slack.com/client/T025C95MN/C02FU5ARJ), a place for questions and general support.
- [#origami-chat](https://app.slack.com/client/T025C95MN/CSW6B2VAN), a place to generally chat with the team, make proposals, or discuss all things Origami related.

Email us here: origami.support@ft.com

Or join our recurring open meeting: Origami Office Hours, every Friday at 3pm ([https://meet.google.com/vpi-zszo-avx](https://meet.google.com/vpi-zszo-avx)).

### Spring Cleaning

In response to _these times_, we've been doing more spring cleaning of the Origami estate than usual.

- We've created an [origami-labels](https://github.com/Financial-Times/origami-labels) Github action to synchronise issue labels across all our projects, which we can use to organise our [project board](https://github.com/orgs/Financial-Times/projects/83).
- Every project also now has our issue templates to help users request new features or report bugs.
- All Origami projects now have Github Code Owners, so new issues are assigned and added to our project board.
- Each Origami component has [our eslint configuration](https://github.com/Financial-Times/eslint-config-origami-component) directly in the repository, which improves code editor integration and allows us to fix code linting issues automatically.
- We recently renamed our support slack channel and have found out remaining outdated references so you always know how to find us.
- We updated the support status for a host of older components, with recommendations for modern alternatives.
- Many stale issues which were never prioritised have been actioned. Such as using dummy data in [o-header](https://registry.origami.ft.com/components/o-header) demos, and pointing users to the [Navigation Service](https://www.ft.com/__origami/service/navigation/) instead; tweaking the Origami Registry UI, for example to make sure the "copy to html" button does not obscure demo HTML and works consistently; and we fixed a few [origami-build-tools](https://github.com/Financial-Times/origami-build-tools) issues which highlighted a performance bug ([o-buttons](https://registry.origami.ft.com/components/o-buttons), which has a lot of demos, builds around 7-8 times faster! 🎉) — watch this space, we have more [origami-build-tools](https://github.com/Financial-Times/origami-build-tools) improvements to come.

### New Component Release Workflow

We've introduced [an optional new workflow](https://github.com/Financial-Times/origami/issues/30) for releasing Origami projects. If your team maintains an Origami component, we hope you love it as much as we do!

It's now possible to add a release label to an open pull request which will automatically create a [semver](https://semver.org/) release when merged. The version number released is added as a comment on the merged pull request. Labels include `release:minor`, `release:patch`, and `release:major`.

![a pull-request which has been merged with a release label, and automatically released with the correct semver tag](https://www.ft.com/__origami/service/image/v2/images/raw/https://origami.ft.com/assets/images/2020-04-01-newsletter/label-release.png?width=1200&quality=highest&source=origami)

The benefits of this approach are:

- It makes new releases of previous major versions "just work". Our former approach was time consuming and easy to make a mistake. Now we're able to support users who haven't been able to upgrade to the latest version of Origami components easier.
- Releasing happens faster (we had some projects which had many minor changes which had not been released yet).
- In the future we can add extra features/protections to versioning, such as enforcing a migration guide exists for a major release.

## Special Thanks

This months special thanks goes to you all! You're all doing a great job. Treat yourselves kindly. We miss your faces. ❤️

## Broader Update

A digest list of other things that have happened since our last update:

- MAJOR: [origami-build-tools](https://github.com/Financial-Times/origami-build-tools ), only build assets once when shared by multiple demos, swaps lib sass for dart sass, fix demo sass source maps, drop node v8 support.
- MAJOR: [o-teaser](https://github.com/Financial-Times/o-teaser) introduces a new typography style (great work Olga Averjanova and Mark Limb!)
- MINOR: [o-banner](https://github.com/Financial-Times/o-banner) now allows for banner button customisation (thanks Ben Fletcher!).
- MINOR: [o-message](https://github.com/Financial-Times/o-message) adds support for custom message states, which was used to build our Corona virus newsletter signup messaging.
- MINOR: [o-colors](https://github.com/Financial-Times/o-colors) our mandarin colour is now available to internal brand users.
- MINOR: [polyfill-library](https://github.com/Financial-Times/polyfill-library/compare/v3.49.0...v3.53.1) brings automated daily browser target updates so we only serve polyfills to the browsers which need them with accuracy, a real feature detect for smoothscroll support, and a [bunch of improvements and fixes](https://github.com/Financial-Times/polyfill-library/compare/v3.49.0...v3.53.1).
- MINOR: [o-forms](https://github.com/Financial-Times/o-forms), adds support for a declarative error summary without using o-forms JavaScript, for server-side rendering.
- MINOR: [o-fonts](https://github.com/Financial-Times/o-fonts), adds a new Financier font weight for redesigned teasers (thanks Olga Averjanova!) And introduces recommended fonts to make it easier to include fonts commonly used across ft.com products.
- MINOR: [o-typography](https://github.com/Financial-Times/o-typography), adds an option to error if a font variant (family/weight/style)
is used when a font face for that variant has not been included in
the project.
- MINOR: [o-comment-api](https://github.com/Financial-Times/o-comment-api), updated support status to "dead". This project is no longer maintained and has been replaced by the new version of [o-comments](https://github.com/Financial-Times/o-comments).
- MINOR: [o-linked-list](https://github.com/Financial-Times/o-linked-list), updated support status to "dead". This component is no longer maintained, please speak to the team if you would like to use a component like o-link-list.
- MINOR: [o-fetch-jsonp](https://github.com/Financial-Times/o-fetch-jsonp), updated support status to "dead". This component is no longer maintained, use the `fetch` [polyfill](http://polyfill.io/) and [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) instead.
- MINOR: [o-dom](https://github.com/Financial-Times/o-dom), updated support status to "dead". This component is no longer maintained. Use native methods instead, such as [Element.closest](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest), with [polyfills](https://polyfill.io/v3/) to support older browsers.
- PATCH: [o-share](https://github.com/Financial-Times/o-share), encodes urls before sharing on social platforms (thanks for the fix, Glynn Phillips!).
- PATCH: [o-teaser-collection](https://github.com/Financial-Times/o-teaser-collection), darkens the background of the assassination collection to improve accessibility.
- PATCH: [o-header-services](https://github.com/Financial-Times/o-header-services), prevents a "flash" on viewport resize from the mobile view, when the navigation draw is enabled or disabled.
- PATCH: [o-header](https://github.com/Financial-Times/o-header), removes the auto-hiding scroll bar for Internet Explorer which obscures active navigation elements.
- PATCH: [o-footer](https://github.com/Financial-Times/o-footer), removes an access aria label and brings demo html headings inline with ft.com for accessibility reasons.
- PATCH: [o-cookie-message](https://github.com/Financial-Times/o-cookie-message), corrects HTML heading markup for improved semantics and accessibility, and improves documentation.
- PATCH: [o-comments](https://github.com/Financial-Times/o-comments), tracks all errors thrown by Coral Talk (thanks Keran Braich!).
- PATCH: [polyfill-service-url-builder](https://github.com/Financial-Times/polyfill-service-url-builder), allows browserslist 'all' range to work, and a number of other fixes.
- PATCH: [polyfill-useragent-normaliser](https://github.com/Financial-Times/polyfill-useragent-normaliser), allows browserslist 'all' range to work, and a number of other fixes.
- PATCH: [useragent_parser](https://github.com/Financial-Times/useragent_parser), updated to correctly identify in-app IOS browsers, used by polyfill.io
- PATCH: [origami-image-service](https://github.com/Financial-Times/origami-image-service), adds tests for SVG purification.
- [origami-registry-ui](https://github.com/Financial-Times/origami-registry-ui), we removed a US Heroku backend to save a little extra money. As a Fastly backed bronze service we realised a US backend was surplus. We also improved a number of UI elements as described previously, including ensuring the "copy to html" button does not obscure demo HTML and works consistently.
- [origami-website](https://github.com/Financial-Times/origami-website), [documents the need for a major cascade](/docs/components/major-cascade/) and adds [a new guide for using Origami via npm](/docs/tutorials/npm/).

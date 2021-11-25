---
title: Origami Newsletter, April 2019
description: This issue features improvements to the image service, a new table filtering feature, and two new browser polyfills.
author: Lee Moody
tags:
  - Newsletter
---

**TL;DR:** This issue features improvements to the image service, a new table filtering feature, and two new browser polyfills.

## Top three things

These are some of the bigger things we've worked on or released over the last month.

### Origami Image Service

We maintain a group of [image sets](https://registry.origami.ft.com/components?search=&module=&imageset=true&service=&active=true&maintained=true&experimental=&deprecated=&dead=) such as icons, logos, and headshot images for our journalists. They're usually included in projects using the [Origmai Image Service](https://www.ft.com/__origami/service/image/v2/). This month we worked on improvements which allow us to publish updated images more quickly and reliably. We also moved the Image Service to it's own Fastly service and enabled shielding, which makes us more resilient to spikes of traffic &#x1F680;. These improvements have the added benefit of increasing our cache-hit-ratio which, when we gather more data, we hope to find reduces costs also.

### Table Filtering

[Last edition](/blog/2019/03/29/newsletter/) we announced an o-table beta with a new filter feature, this is now released as part of o-table@^7.3.0. See the [demo in the registry](https://registry.origami.ft.com/components/o-table@7.3.0#demo-filter) and documentation in the [README](https://registry.origami.ft.com/components/o-table@7.3.0/readme?brand=core#filtering).

### New Polyfills

We have released two new polyfills to the [Polyfill Service](https://polyfill.io/v3/) this month: [toggleAttribute](https://developer.mozilla.org/en-US/docs/Web/API/Element/toggleAttribute) and [requestIdleCallback / cancelIdleCallback](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback). &#x1F389;

The [requestIdleCallback](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback) method queues a function for when the browser is idle. It's useful to schedule non-critical tasks so the browser is free to respond quickly to user input, animation, and other events where low latency is important.

## Special thanks

A big thank you to the team(s) which made our move to Bracken House so smooth! We're based on the lower ground floor, but you'll also find us roaming the third floor and the swanky garden roof.

## Broader update

A digest list of other things that have happened over the last month.

- MAJOR: [origami-image-set-tools@v2.2.0](https://registry.origami.ft.com/components/origami-image-set-tools@2.2.0) was released. Improves publish speed by refactoring and dropping support for NodeJS 10 and below, includes the image hash in the filename of the image when publishing, and includes version and host in the imageset file. These changes allow us to publish updates to [our image sets](https://registry.origami.ft.com/components?search=&module=&imageset=true&service=&active=true&maintained=true&experimental=&deprecated=&dead=) more quickly and reliably as mentioned above.
- MAJOR: [ftdomdelegate@v3.0.0](https://registry.origami.ft.com/components/ftdomdelegate@3.0.0) was released. Originally decided in 2015, we at last released a new major of `ftdomdelegate` which removes the alias `dom-delegate`. If your project depends on `dom-delegate` swap it for `ftdomdelegate`. Using just `ftdomdelegate` will reduce your bundle size by not including two copies. Thanks for making it happen Matt Hinchliffe. For more context see: https://github.com/Financial-Times/ftdomdelegate/pull/93
- MINOR: [polyfill-library@v3.33.0](https://github.com/Financial-Times/polyfill-library/releases) includes  a bunch of updates to existing polyfills including but not limited to `Object.assign`, `Symbol.match`, `Event` (for more [see recent releases](https://github.com/Financial-Times/polyfill-library/releases)). As disucssed above, we have also released two new polyfills [toggleAttribute](https://developer.mozilla.org/en-US/docs/Web/API/Element/toggleAttribute) and [requestIdleCallback / cancelIdleCallback](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback). These are now available via the [Polyfil Service](https://polyfill.io/v3/).
- PATCH: [o-header-services@v3.2.13](https://registry.origami.ft.com/components/o-header-services@3.2.13) prevents the hidden drawer in certain cases flashing on page load; updates the core experience; allows the logo to be a link; fixes a bug when used alongside `o-expander`.
- MINOR: [o-icons@v5.11.0](https://registry.origami.ft.com/components/o-icons@5.11.0) includes two new audio icons "skip-forward-30" and "skip-backward-30", and shows three existing icons in the registry "audio", "mute", and "mute-notifications"
- MINOR: [node-health-check@v1.10.0](https://registry.origami.ft.com/components/node-health-check@1.10.0) allows data points of null or zero for graphite threshold checks, and makes graphite threshold checks accept a response when there is no data for the query (all credit to Kat Downes!)
- MINOR: [o-teaser@v3.5.1](https://registry.origami.ft.com/components/o-teaser@3.5.1) includes a bunch of changes to o-teaser, all contributed by people outside the core Origami team. Thanks everyone &#x1F603;. It displays standfirsts in video teasers (credit to Umberto!) Adds an audio icon to audio teasers (thanks Asuka Ochi!) And adds styles to support teaser standfirsts which are links (thanks Jenny Bacon!)
- PATCH: [o-grid@v4.5.2](https://registry.origami.ft.com/components/o-grid@4.5.2) improves the documentation of o-grid.
- MINOR: [o-tracking@v1.7.0](https://registry.origami.ft.com/components/o-tracking@1.7.0) adds a `getRootID` method (credit to Alex Florisca).
- MINOR: [o-table@v7.3.0](https://registry.origami.ft.com/components/o-table@7.3.0) introduces a new feature, support for a filterable table (you may remember we announced a beta for this last edition).
- MINOR: [o-typography@v5.11.0](https://registry.origami.ft.com/components/o-typography@5.11.0) corrects the bold font weight of MetricWeb for internal brand users (700 to 600) and make the default "sans", "serif", or "display" bold font weight customisable for whitelabel brand users (e.g. specialist titles).
- PATCH: [o-video@v5.1.3](https://registry.origami.ft.com/components/o-video@5.1.3) maintains the placeholder image aspect ratio and centers.
- PATCH: The following components were also updated, to use the latest `ftdomdelegate` over `dom-delegate`:
    - o-share@^6.4.2
    - o-gallery@^3.0.7
    - o-tooltip@^3.4.1
    - o-overlay@^2.7.3

*[TL;DR]: too long; didn't read

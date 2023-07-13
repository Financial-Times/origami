---
title: Origami Newsletter, October 2019
description: This issue covers an upcoming major new release of our components including o-typography, o-colors, and o-buttons; plus we discuss our new Continuous Integration tools.
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

These are some of the bigger things we've done over the last three months since our previous newsletter...

### Major Component Releases

We've been working on upgrades to fundamental Origami components like o-typography, o-colors, and o-buttons. Releasing a new version of these components necessitates a major release of other components too. So we've taken the opportunity to introduce recent proposals across all 52 of our components. The upgrades focus on:

- Improving our ability to iterate on and share editorial styles across projects.
- Improving our ability to customise Origami for unique products.
- Design consistency.
- Smaller bundle sizes for quicker sites.
- Maintenance and integration efficiency with fewer developer interfaces.
- Removing technical debt.

Find out [more about the changes we're making and why](/blog/2019/10/31/major-cascade/) in our blog post.

We will start to release betas for these changes next week, with an announcement and full releases following soon after. Projects which depend on Origami components will need developer input to upgrade. We’ve discussed our plans with groups across the Financial Times and are planning a time to support Customer Products directly with their more complex upgrade path. If you have any questions, concerns, or feedback please reach out to the team — we’re here to help. 😊

### Origami Fox

Also new are our [continuous integration tools for Origami components](https://github.com/financial-times/origami-ci-tools). They allow us to roll out changes to our build process for all components at once.

With this new found power we made a little Origami Fox friend. Our little Origami Fox tells us if our components are getting bigger or smaller with every change, to help us prevent an unexpected jump which could slow down sites across the Financial Times Group.

<figure>
	<img
		alt=""
		src="https://www.ft.com/__origami/service/image/v2/images/raw/https://origami.ft.com/assets/images/2019-10-31-newsletter/fox-friend.png?source=origami&quality=highest"
	/>
	<figcaption>
		A comment from Fox Friend on an o-comments pull request (a request to make changes to its codebase). The comments team have done a great job at reducing the bundle size of o-comments by over 130kb without compression.
	</figcaption>
</figure>

If your team maintains an Origami compatible component which doesn't already use our new Continuous Integration tools let us know, we're happy to help you start using them.

## Special Thanks

Our special thanks this month goes to everyone who has contributed to the design basics working group. Thanks Luke Griffiths, Caroline Nevitt, Mark Limb, Simon Coxon, and Jessica Engerer! They helped rationalise inconsistent design in typography and buttons for the upcoming [major releases](/blog/2019/10/31/major-cascade/) discussed above, and have created a Sketch UI Kit of Origami components. Learn more about the new [UI Kit in Luke Griffiths' blog post](https://medium.com/ft-product-technology/ft-design-basics-1-why-we-finally-built-a-ui-kit-850e98b127bf).

## Broader Update

A digest list of other things that have happened since our last update:

- MINOR: [origami-build-tools](https://github.com/Financial-Times/origami-build-tools/) now outputs more useful Sass errors. It also has updated boilerplate to create new components with our latest continuous integration tools.
- MINOR: [o-banner](https://github.com/Financial-Times/o-banner) has a new `appendTo` option so imperatively made banners may be inserted into the DOM at a point which is most appropriate for keyboard users.
- MINOR: [o-table](https://github.com/Financial-Times/o-table) has a new `updateRows` method to account for new `tr` DOM nodes, this is particularly useful for React integration.
- PATCH: [o-overlay](https://github.com/Financial-Times/o-overlay) ensures the overlay CSS is not output multiple times in silent mode is disabled; supports visually hiding the overlay heading declaratively; updates the close button to a semantic `button` element rather than an anchor `a` element.
- PATCH: [o-normalise](https://github.com/Financial-Times/o-normalise) fixes a bug with the focus outline colour.
- PATCH: [o-colors](https://github.com/Financial-Times/o-colors) adds the focus outline colour, to replace the colour set in o-normalise in a future major.
- MINOR: [o-forms](https://github.com/Financial-Times/o-forms) allow the label of box radio buttons to be customised; corrects input labels on date input demos.
- MINOR: [o-header-services](https://github.com/Financial-Times/o-header-services) allows mixing drop down navs with non dropdown navs.
- MINOR: [o-header](https://github.com/Financial-Times/o-header) improves accessibility across a broader range of screen readers by giving buttons a visually hidden label as well as the existing title attribute.
- MINOR: [ftdomdelegate](https://github.com/Financial-Times/ftdomdelegate) fixes an issue for SVG events in IE and no longer fires events on disabled buttons / inputs.
- PATCH: [o-date](https://github.com/Financial-Times/o-date) prevents empty dates being read by assistive technology.
- MINOR: [o-share](https://github.com/Financial-Times/o-share) adds link as a valid socialUrl and updates the share icon class names to enable more consistent control over their visibility (credit to Maggie Allen!)
- MINOR: [node-health-check](https://github.com/Financial-Times/node-health-check) sets "ok" if Graphite returns an empty array; switches the memory usage module to one which requires no native dependencies/compiling for Node 12 support (thanks Andreas Hermansson!).
- MINOR: [o-layout](https://github.com/Financial-Times/o-layout) improve brand support errors and documentation.
- MINOR: [logo-images](https://github.com/Financial-Times/logo-images) adds logos for use as favicons with notification dot.
- PATCH: [o-teaser](https://github.com/Financial-Times/o-teaser) prevents topic tags from overflowing, they wrap instead (thanks Olga Averjanova!)

---
title: January Newsletter
description: Hello new Origami; Goodbye Registry; Goodbye Sass.
author: Lee Moody
publishDate: 2024-02-12
tldr: We're decommissioning the registry in favour of storybook, and later introducing a design led documentation site.
tags:
	- Newsletter
---

## Top things

Some of the bigger Origami news since our last update:

## Hello, new Origami

We released a new website in beta, [origami-for-everyone.ft.com](https://origami-for-everyone.ft.com/about/), which showcases our vision for Origami.

1. **Design guideline led documentation**, to support teams to prototype new products or features consistently, building on tried and tested approaches.
2. **Integrated designer and engineering tooling**, for improved efficiency and collaboration during handover from prototype to build.
3. **Multi-brand enabled**, to allow for the creation of a reusable capability across the FT Group, so we can share our learnings across brands.

### Why and when to use a component

So far we've added design guidelines for basic colours, typography, spacing, buttons, and a more complex pagination pattern. Unlike our current documentation this covers the why and where of using a component, as well as the what and how. Knowing why and where to use a component or pattern is crucial to using it as designed, to build a familiar and trusted user experience.

![](/assets/images/2024-02-12-newsletter/for-everyone-button-guidelines.png?width=500&source=origami)

### A bridge between specialist tools and documentation

Our new website will act as a hub, bringing together tools and specialised sources of documentation. For example, demos include links to Storybook and Figma.

![](/assets/images/2024-02-12-newsletter/for-everyone-button-variants.png?width=500&source=origami)

### Delving deep with Storybook

Curating documentation for all possible combination of a component is not always practical, there are too many permutations\* Storybook will allow designers and engineers to explore all a component's options in more depth, and try it out with their own content.

<aside>*Big buttons, small buttons, buttons with icons, buttons without icons, buttons with only icons, primary, secondary, ghost buttons, buttons for dark backgrounds, buttons for light backgrounds.</aside>

Storybook will also be the place for other in-depth documentation, such as technical readme and code-docs.

![](/assets/images/2024-02-12-newsletter/o3-button-storybook.png?width=500&source=origami)

### Prototyping with Figma

Within Figma, designers will be able to quickly pull in components and patterns as an engineer does for production. This will allow designers to create prototypes and experiment with new forms of user interface (UI) with confidence. Reusing existing UI where it makes sense to, and focusing on where they can create new value.

![](/assets/images/2024-02-12-newsletter/o3-button-figma.png?width=500&source=origami)

### Integrated designer and engineer handover

Our new website, Figma, and Storybook are integrated both ways. Using Origami's new Figma libraries, a designer can jump from their Figma file straight to design guidelines or Storybook. It will also allow designers to verify that what they see in Figma is what an engineer will see when they implement the component in production.

Engineers who use VS Code (a popular [IDE](https://en.wikipedia.org/wiki/Integrated_development_environment)) will be able to use the Figma plugin to preview the design they are working on, right next to their code. The Figma plugin will highlight in a click which component the designer has used, which properties the engineer should set, and include a link to jump straight to design guidelines for more information.

![](/assets/images/2024-02-12-newsletter/vs-code-figma.png?width=500&source=origami)

## Goodbye Registry

Whilst we're busy building out what's new for Origami, we're also working to decommission the old. This quarter we plan to turn off the [Origami Registry](https://registry.origami.ft.com/components) along with its two supporting systems [origami-codedocs](https://biz-ops.in.ft.com/System/origami-codedocs) and [origami-repo-data](https://biz-ops.in.ft.com/System/origami-repo-data). This will help us reduce our maintenance burden to focus on what's new, and also consolidate our demos and documentation for easier onboarding to Origami. 

![](/assets/images/2024-02-12-newsletter/registry-button-demos.png?width=500&source=origami)

This is big news. The Origami Registry is used by designers and engineers across the FT, and externally, to support our day-to-day work. During recent internal user research we found the registry is our most trusted source of documentation for reusable user interface, by both designers and engineers.

To minimise disruption, our first step will be to migrate content such as missing demos, readme, SassDoc, and JSDoc documentation to Storybook.

![](/assets/images/2024-02-12-newsletter/o2-button-storybook.png?width=500&source=origami)

Storybook will then take the place of the Origami Registry for existing Origami components. This also means delving deep into component documentation will feel consistent whether working with existing (soon to be legacy) components or new Origami components.

In Q2, we'll turn our attention to replacing [origami.ft.com](https://origami.ft.com/) with [origami-for-everyone.ft.com](https://origami-for-everyone.ft.com/about/).

## Origami and Specialist Titles collaboration

Deyan Dragov from FT Specialist has partnered with the Origami team to add Sustainable Views to Origami, our first fully supported FT Specialist brand. It's been a delight having him with the team.

He's been working with Mary Godservant to create guidelines for typography, including editorial typography, and has also picked up work to audit our use of tooltips.

We know of 3 use-cases where our [current o-tooltip](https://registry.origami.ft.com/components/o-tooltip) is used, in ways it was never designed for. This often creates an inaccessible and inconsistent experience. Tooltip is therefore a great way for us to demonstrate our new, design guideline led approach. It also gives us an opportunity to explore technical decisions around building interactive components for our new architecture.

So Deyan's work will benefit ft.com as well as Specialist brands. That's something to be excited about.

## Special Thanks

This month's special thanks going to Edward Gargan. Ed joined the Origami team for a 2 week boot-camp and did some awesome work. He [added the internal brand](https://github.com/Financial-Times/origami/pull/1403) to our new site; made the [brand selector work reliably](https://github.com/Financial-Times/origami/pull/1396); _and_ implemented [a new mobile pagination pattern](https://github.com/Financial-Times/origami/pull/1409) – with our first use of [CSS container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries)!

For those who don't know, boot-camping isn't about getting more work done for the host team, as a couple of weeks isn't a lot of time to get up to speed. We don't expect our boot-campers to necessarily deliver anything, though there are exceptions as in Ed's case here.

For the boot-camper it's an opportunity to see how another team work, gain new skills, and learn more about Origami. For Origami, it helps create future contributors who understand Origami's design system work and how to get involved.

If you would like to join the Origami team for a short boot-camp let us know by reaching out to me (Lee Moody). We'll work with your team to find a mutually convenient time and chat with you about your motives, to make sure we have some interesting work lined up for your time with us ✨

## Broader update

A digest list of some other things that have happened in January:

- [Sass build time metrics in PageKit](https://origami-for-everyone.ft.com/blog/2024/01/24/sass-build-times). Sass build times got you down? Enable Sass monitoring in your project and let us know. New Origami components do not require Sass.
- [Improved pagination pattern](https://origami-for-everyone.ft.com/patterns/pagination/), with mobile support.
- [New colour palette design guidelines](https://origami-for-everyone.ft.com/guides/colours/).
- Beta [Sustainable Views](https://origami-for-everyone.ft.com/sustainable-views/components/buttons/#themes) support added.
- Revised Origami Image Service hostname monitoring, [to mitigate a business risk](https://biz-ops.in.ft.com/Risk/image-service-open-to-abuse?message=Risk%20image-service-open-to-abuse%20was%20successfully%20updated&messageType=success). We count 2151 unique image hosts so far, for images requested via the Origami Image Service.

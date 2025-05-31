---
title: May Newsletter
description: Origami V3 in production; design guideline led website grows; Origami neighbourhood, a community of design libraries and documentation assets.
author: Lee Moody
publishDate: 2024-05-29
tldr: Origami V3 (o3) is out in the wild and our new, design guideline led website is quickly developing in beta.
tags:
	- Newsletter
---

## Top things

Some of the bigger Origami news since our last update:

## o3 in production

Origami components are independently versioned, we iterate regularly. o-buttons is at version 7, o-table is at version 9. The overarching approach we follow to design and build components is also versioned. By comparison to individual components, these standards are remarkably stable.

Origami v1 (o1) launched around 2013; [Origami v2](https://origami.ft.com/blog/2020/12/01/newsletter/#origami-v2) (o2) around 2020; and as of 2024 we’re now moving to Origami v3 (o3). It might be our most significant upgrade ever.

In o3 we've reimagined Origami with a renewed focus on design guidelines; aligned designer and engineer tooling; and enhanced multi-brand support ([learn more about what's new in Origami v3 on our beta website](https://origami-beta.ft.com/about/what-is-new/)).

Since our last update both [FT Monetary Policy Radar](https://professional-monetary-policy-radar.ft.com/) and [Sustainable Views](https://www.sustainableviews.com/) have begun to adopt o3 components 🎉 We're thrilled to see these in production and the beginnings of us realising the [benefits of o3](https://origami-beta.ft.com/about/what-is-new/) – massive shout out to the Specialist Team, and Oliver Barnwell from FT Professional, who made that happen.

You're welcome to [try o3 in your project](https://origami-beta.ft.com/getting-started/) from today, as o3 is designed to work alongside existing o2 components and patterns. Keep a look out for future announcements regarding improved documentation, workshops, and co-ordinated migration plans. The Origami team are here to support you with any questions in the meantime.

## New website updates

Our [new, design guideline led website](https://origami-beta.ft.com) is central to o3. It's still in beta but quickly progressing. We've recently added:

- What's new with o3.
- Technical getting started guide.
- Further new o3 design guidelines.
- o2 component documentation, these will be around for a while yet.
- Contact, support information.

We're continuing to improve the site this quarter. Next up we're working on a getting started guide for designers; contribution guides; migrating our blog; improved previews & code snippets; and more.

## Origami neighbourhood

We don't want _all the components_ to live within Origami. Origami is helpful to spread tried, tested, and thoroughly documented design patterns we want to encourage across the FT Group. But teams and brands still need to be able to experiment, do their own thing, with custom design patterns which augment Origami. Often these are even shared across a specific set of projects, and sometimes teams, outside of Origami.

These product specific design patterns often lack design libraries or guidelines leading to confusion and inconsistency – for designer, developer, and user! To help, the Origami team is working with the design team on a neighbourhood\* of Figma libraries. We've made a start by [restructuring our Design System team in Figma](https://drive.google.com/file/d/1XuaLjdvfyiITM5plt1lkHM0mDbj4ixrF/view), with more clear delineations between Origami o2, o3, and other libraries.

\* Thanks Chee Rabbits for coining the phrase!

## Broader update

A digest list of some other things that have happened since out last update:

- Major: [@financial-times/node-health-check](https://financialtimes.slack.com/archives/C02FU5ARJ/p1716458351227109), we've removed the `graphite-threshold` health check from `@financial-times/node-health-check`. If your project uses `node-health-check`, remove any `graphite-threshold` health check from your projects by the end of Q3 2024 ([migration guide](https://github.com/Financial-Times/node-health-check/blob/master/MIGRATION.md#migrating-from-v3-to-v4)).
- Decommissioned: We turned off the Origami Registry, Origami Codedocs, and Origami Repo Data as we were [planning to back in our last update](/blog/2024/02/12/newsletter). This is _huge_. It reduces the number of documentation sources Origami users need to be aware of, and also cuts the number of systems we maintain by half; allowing us to focus more on what's new for Origami.
- New: [o3 onboarding and toggle tooltip](https://origami-beta.ft.com/components/tooltip/), these o3 replacements for o-tooltip are designed with specific use-cases in mind for ease of use and to avoid accidentally creating inaccessible experiences, as discussed in our [last update](/blog/2024/02/12/newsletter#origami-and-specialist-titles-collaboration).
- New: [o3 typography components and guidelines](https://origami-beta.ft.com/foundations/typography/), Sustainable Views support coming next.
- New: [button group guidelines](https://origami-beta.ft.com/components/buttons/#button-groups).

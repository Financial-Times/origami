---
title: November Newsletter
description: Origami releases experimental O3 Button, updates on improvements to documentation and bootcamps.
author: Ben Freshwater
publishDate: 2023-11-30
tldr: A summary of the past months events.
tags:
	- Newsletter
---

It's been a while since our last update, so here's a quick summary of what's been going on the past few months.

## O3 Button experimental release

We have released an experimental package to NPM called o3-button, this new package features a new set of buttons with FT branding, but with fundamental changes to how they are built to improve the designer experience and hand off to engineers.

Part of this involves using [design tokens](https://spectrum.adobe.com/page/design-tokens/), which are shared in Figma Libraries and our GitHub projects. This allows us to keep styles across designs and web implementations in sync with each other across all brands, including FT Professional. This has allowed the Origami team to provide Figma libraries for all brands for the first time!

O3 button components are also built with CSS instead of Sass. This removes the dependency on Sass and opens up their usage to projects that don't use Sass. The buttons have been designed from a clean slate, and along with the absense of Sass, should make O3 components easier to use and maintain.

You can see our catalog of Origami 3 components on our new [Storybook for Origami 3](https://o3.origami.ft.com). More information to come on Storybook below!

The release also saw the introduction of another new package: `o3-web-token`, this package contains design tokens defined as CSS custom properties for colours, spacing, and typography. Replacing existing o-colours, o-spacing, and o-typography packages. These can be used to style Origami components and other projects at the FT, and supports an improved branding experience out of the box.

O3 Buttons is still experimental, so they shouldn't be used right now. We will continue to gather feedback, and plan to roll these out to our first products early next year alongside our existing components.

## Improvements to Documentation

Mary has been conducting usability with Origami users to help us understand how we can improve our documentation.

Themes emerged around improvements that can be made to documentation on Figma, Origami Registry, and Storybook. And improvements to the usage of Origami with react was also mentioned. Our usability ratings pushed towards the lower end of the spectrum (a lower value is better), with O2 rated as 3.8 and O3 rated at 2.8.

Mary presented the findings at a recent design system guild, more details can be found in [the recording of the session](https://docs.google.com/document/d/1aKhbRfMnCthZ-6D5eT82lpMmBeCcywNl9HzQakBf6lU/edit#heading=h.c69urzbzbwic).

As part of this, we have rolled out Storybook to Chromatic, a platform that, amongst other things, hosts Storybook for us. This has enabled us to display [all Origami 2 brands in one single place](https://o2.origami.ft.com/?path=/docs/origami-2--docs). It is also where Origami 3's Storybook is hosted.

We thank everyone who contributed to the feedback and look to implement more changes off the back of it soon.

## Bootcamps

The Origami team was joined by two engineers from Internal Products for two short bootcamps.

Behnaz joined us for two weeks in July where they paired with Ako to migrate the Origami website to Astro.

In October, Nigel joined us for two weeks where they paired with Ben contributing on updating typography inverse body colours,

## Special Thanks

Special thanks to:

- Nigel Pelvin and Behnaz Pourafshari for joining us for bootcamps,
- all those who attended our User Studies and feedback sessions,
- Erika Cellai for her support toward our documentation research,
- Delyanka Sirakova for presenting Figma Organisation, Structure, & Naming Convention at Origami Design System Guild,
- Kristo Mikkonen for adding an image overlays api to the Origami Image Service

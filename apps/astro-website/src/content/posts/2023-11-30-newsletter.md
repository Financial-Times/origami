---
title: November Newsletter
description:
author: Ben Freshwater
publishDate: 2023-11-30
tldr: A summary of the past months events.
---

It's been a while since our last update, so here's a quick summary of what's been going on the past few months.

## O3 Buttons released!

One of the biggest updates is our release of o3-buttons, this new package features a new set of buttons with existing designs, but with fundamental changes to how they are built.

The first being that they are built using design tokens. This allows us to keep our designs and implementations in sync with each other across all brands, including FT Professional. This has allowed the Origami team to provide Figma libraries for all brands for the first time!

O3 button components are also built with CSS instead of Sass. This removes the dependency on Sass and opens up their usage to projects that don't use Sass. The buttons have been designed from a clean slate, and along with the absense of Sass, should make O3 components easier to use and maintain.

You can see our catalog of Origami 3 components on our new [Storybook for Origami 3](https://main--64faf6b1815b6c0106f82e74.chromatic.com/). More information to come on Storybook below!

The release also saw the introduction of another new package: `o3-web-token`, this package contains design tokens defined as CSS custom properties for use in web project. These can be used to style Origami components and other projects at the FT, and supports an improved branding experience out of the box.

## Improvements to Documentation

Mary has been conducting usability with Origami users to help us understand how we can improve our documentation. Themes emerged around improvements that can be made to documentation on Figma, Origami Registry, and Storybook. And improvements to the usage of Origami with react was also mentioned.

As part of this, we have rolled out Storybook to Chromatic, a platform that, amongst other things, hosts Storybook for us. This has enabled us to display [all Origami 2 brands in one single place](https://main--655f72ec522e424302dc6201.chromatic.com/?path=/docs/origami-2--docs). It is also where Origami 3's Storybook is hosted.

We thank everyone who contributed to the feedback and look to implement more changes off the back of it soon.

## Bootcamps

The Origami team was joined by two engineers from Internal Products for two short bootcamps.

Behnaz joined us for two weeks in July where they paired with Ako to migrate the Origami website to Astro.

In October, Nigel joined us for two weeks where they paired with Ben contributing on updating typography inverse body colours,

## Special Thanks

Special thanks to all those who attended our User Studies and feedback sessions, Nigel and Behnaz for joining us for bootcamps.

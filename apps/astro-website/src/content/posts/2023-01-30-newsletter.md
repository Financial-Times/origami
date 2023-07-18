---
title: Origami Newsletter, January 2023
description: Origami has more team members; Storybook templates; More accessibility improvements; New CLI tool to create new components.
author: Akaki Mikaia
publishDate: 2023-01-30
tags:
  - Newsletter
---


## Top things

Some of the bigger Origami news since our last update:

### Origami has more team members

The Origami team is very happy that we have new team members joining. Ben Freshwater joined as a full-time S1 developer. Rhys Evans is helping Origami as a part-time product owner.

### Storybook templates

Origami has been thinking about adopting a tool for documenting and making interactive component demos. So last year Origami started writing TSX templates for existing components. Which gets integrated into our [Storybook](https://origami.ft.com/storybook/) demos. This approach will also support designers to work closer with the Origami team and will enable other developers to have a better demo experience.

**NOTE:** This is still a work in progress and not every component has a TSX template, but play around with the ones that we already published. Also if you think we should prioritise some components get in touch with us or join us during our office hours.

### More accessibility improvements

In December Origami dedicated its energy to closing as many accessibility issues as possible following the DAC audit. In this successful endeavour, we managed to close 38 issues out of 40. The remaining two are in progress.

The most notable change was related to focus styles. We published [a blog](https://origami.ft.com/blog/2022/12/14/focus-styles/) about this if you want to have deeper dive into it, but in short, focus rings are black and white shadows around the focusable elements.

### New CLI tool to create new components

Summer 2022 Origami rebuilt a CLI tool to make it easier for other developers to create new components. To create new components run `npm run create-component` from the root folder and it will guide you through the new component creation process and will generate template files and even some default code to get started with.

**NOTE:** Since Origami is trying to migrate existing components to TSX templates, as mentioned above, we decided to make this even easier and at the moment the CLI tool also supports a command `npm run create-component storybook` that should help you to generate all the files needed to start building a TSX template for existing components.

## Special Thanks

Special thanks, in last quarter, goes to Orhan Bakir and Andy Little for helping Origami to write a [TSX template for o-forms](https://origami.ft.com/storybook/brands/core/?path=/story/components-o-forms-box-radio-buttons--box-radio-button). It was a very big component and thanks both of you for your contribution.

## Broader update

A digest list of some other things that have happened in January:

- [o-forms](https://registry.origami.ft.com/components/o-forms): has TSX templates and a [storybook demo](https://origami.ft.com/storybook/brands/core/?path=/story/components-o-forms-box-radio-buttons--box-radio-button).

- [o-header](https://registry.origami.ft.com/components/o-header): Origami stopped supporting subbrand variants, since they are not in use anymore, in `o-header` component. We also published TSX templates for the `o-header` component. The drawer component has improved accessibility and it traps focus within the drawer.

- [o-share](https://registry.origami.ft.com/components/o-share): is version 9 now. The accessibility has improved and `o-share` no longer provides client-side JavaScript to generate markup. Instead, users will need to write the [full markup](https://github.com/Financial-Times/origami/blob/o-share-v9.0.1/components/o-share/MIGRATION.md#deprecate-autogenerate-share-links). To address some accessibility issues `o-share` now uses inline SVGs for icons.

- [o-ft-affiliate-ribbon](https://registry.origami.ft.com/components/o-ft-affiliate-ribbon): now has [storybook demo](https://origami.ft.com/storybook/brands/core/?path=/story/components-o-ft-affiliate-ribbon--ft-affiliate-ribbon-story) and TSX templates are also published to NPM.

- [o-colors](https://registry.origami.ft.com/components/o-colors): only warns users of colour deprecations via Sass when they explicitly request a colour or colour use-case, reducing noise so engineers can focus on true issues.

- [o-editorial-layout](https://registry.origami.ft.com/components/o-editorial-layout): has TSX templates and a [storybook demo](https://origami.ft.com/storybook/brands/core/?path=/story/components-o-editorial-layout--body).

- [o-big-number](https://registry.origami.ft.com/components/o-big-number): We published TSX template to NPM packages.

- [o-normalise](https://registry.origami.ft.com/components/o-normalise): updated to match [FT browser](https://docs.google.com/document/d/1z6kecy_o9qHYIznTmqQ-IJqre72jhfd0nVa4JMsS7Q4/edit) policy and deprecate code supporting IE.

- [o-comments](https://registry.origami.ft.com/components/o-comments): got migrated to Coral V7.

- [o-topper](https://registry.origami.ft.com/components/o-topper): We supported the dynamic storytelling team to release two new toppers for articles: Deep Landscape and Deep Portrait, as featured in the recent product release announcement. Shout out to Alberto Cubero, Juan Sanchez, and Phil Hunt for their work on the o-topper Origami component!

- [o-video](https://registry.origami.ft.com/components/o-video): Thanks to Juan Sanchez for contributing to o-video component that now tracks that progress of video playback at 99%, since 100% is not sent by Chrome.

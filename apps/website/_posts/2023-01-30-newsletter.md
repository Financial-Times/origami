---
title: Origami Newsletter, January 2023
description: Origami has more team members; Storybook templates; More accessibility improvements; New CLI tool to create new components.
author: Akaki Mikaia
tags:
  - Newsletter
---

<abbr title="Too long; didn't read">
<strong>
TL;DR:
</strong>
</abbr> {{page.description}}

## Top things

Some of the bigger Origami news since our last update:

### Origami has more team members

Origami is very happy that we have new team members joining. Ben Freshwater joined as full time S1 developer. Rhys Evans is helping Origami as part time product owner.

### Storybook templates

Origami has been thinking about adopting a tool for documenting and making  interactive component demos. So last year Origami started writing TSX templates for existing components. Which gets integrated in our [Storybook](https://origami.ft.com/storybook/) demos and this gets us one step closer to new origami architecture.

**NOTE** This is still work in progress and not every component has a TSX template but play around the ones that we already published.

### More accessibility improvements

In December Origami dedicated their energy to close as many accessibility issues as possible. In this successful endeavour we managed to close 38 issues out of 40. The remaining to are in progress.

The most notable change was related to focus styles. We published [a blog](https://origami.ft.com/blog/2022/12/14/focus-styles/) about this if you want to have deeper dive in it.

### New CLI tool to create new components

Summer 2022 Origami build a new CLI tool. It was created for developers to make it easier to create new components. Running `npm run create-component` from root folder now guides users through new component creation process and generates template files and starter code.

**NOTE:** Since Origami is trying to migrate to TSX templates at the moment the CLI tool also supports a command `npm run create-component storybook` that should help you to generate all the files needed to start building TSX template for existing components.

## Special Thanks

Special thanks in last quarter goes to Orhan Bakir and Andy Little for helping Origami to write a [TSX template for o-forms](https://origami.ft.com/storybook/brands/core/?path=/story/components-o-forms-box-radio-buttons--box-radio-button). It was a very big component and thanks both of you for your contribution.

## Broader update

A digest list of some other things that have happened in January:

- [o-forms](https://registry.origami.ft.com/components/o-forms):
- [o-header](https://registry.origami.ft.com/components/o-header): Origami stopped supporting subbrand variants, since they are not in use anymore, in `o-header` component.
- [o-share](https://registry.origami.ft.com/components/o-share): is version 9 now. The accessibility has improved and `o-share` no longer provides client side JavaScript to generate markup. Instead users will need to write the [full markup](https://github.com/Financial-Times/origami/blob/o-share-v9.0.1/components/o-share/MIGRATION.md#deprecate-autogenerate-share-links). To address some accessibility issues `o-share` now uses inline SVGs for icons.
- [o-ft-affiliate-ribbon](https://registry.origami.ft.com/components/o-ft-affiliate-ribbon): now has [storybook demo](https://origami.ft.com/storybook/brands/core/?path=/story/components-o-ft-affiliate-ribbon--ft-affiliate-ribbon-story) and TSX templates are also published to NPM.
-

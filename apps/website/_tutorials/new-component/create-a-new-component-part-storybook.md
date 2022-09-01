---
title: Create A New Origami Component - Part 6 Storybook
description: A step-by-step tutorial which teaches you how to build and deploy a new Origami component.
cta: Learn how to create an Origami component
collection_listing_display: false

# Redirect from legacy URLs
redirect_from:
  - /docs/tutorials/create-a-new-component-part-storybook/
---

# {{page.title}}

The "Create A New Origami Component" tutorial is split into nine parts and is intended to be followed sequentially from start to finish:
1. [Intro & Boilerplate](/documentation/tutorials/create-a-new-component-part-1/)
2. [Base Styles](/documentation/tutorials/create-a-new-component-part-2/)
3. [Themes & Brands](/documentation/tutorials/create-a-new-component-part-3/)
4. [Demos](/documentation/tutorials/create-a-new-component-part-4/)
5. [JavaScript](/documentation/tutorials/create-a-new-component-part-5/)
6. Storybook
7. [Testing](/documentation/tutorials/create-a-new-component-part-6/)
8. [Documentation](/documentation/tutorials/create-a-new-component-part-7/)
9. [Component Lifecycle](/documentation/tutorials/create-a-new-component-part-8/)

In part six we will rewrite `demo.mustache` into tsx template, we will use our component's javascript code to initialise interactivity for storybook demos and implement all the variants of our component.

## Storybook
To run storybook locally you can execute
## TSX template
`npm run create-component` generated TSX boilerplate template as well.


## Part six: Storybook

In part six we learnt how to make storybook templates for `o-example` component, covering:
- Initialising JavaScript inside story file.
- JavaScript configuration using the `init` argument or namespaced data attributes.
- How to update the <abbr title="Document Object Model">DOM</abbr> with component JavaScript.
- How to handle no JavaScript at all, to meet Financial Times browser support requirements.

In part seven we'll look at writing storybook templates for our component. [Continue to part six](/documentation/tutorials/create-a-new-component-part-6).

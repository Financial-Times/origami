---
title: Technical Guide
description: A technical guide to using "o3" Origami.
sidebar:
  order: 11
---

This technical guide covers Origami "o3", the [latest evolution of Origami](/about/what-is-new/). If you are working with older Origami components, which are still most commonly in use today, we have a separate ["o2" technical guide](/o2-components/technical-guide/).

## Using Origami in your project

We publish multiple Origami packages to npm which are independently versioned and contain a collection of reusable components and patterns.

If you would like to get started quickly, continue to our [guide to using Origami via npm](/technical-guide/package-manager-npm). Otherwise keep reading for a general technical overview of Origami components.

## Code Structure & Languages

### Manifest

Any Origami project contains an `origami.json` file, including those with components. It's a <a href="https://www.json.org/"><abbr title="JavaScript Object Notation">JSON</abbr></a> format file that is responsible for describing various aspects of the project.

It is under active development and subject to change. For reference, see [`origami.json` manifest documentation for "o2"](/o2-components/technical-guide/origami-json/), which covers the contents of this file.

### Naming conventions

A component’s name is used in URLs and CSS class names, so they:

- Begin with `o3-`.
- Avoid plurals.
- Contain only ASCII letters, numbers and hyphens
- Begin with a letter

<aside>
	Examples of good component names include
	<code>o3-button</code>,
	<code>o3-foundation</code> and
	<code>o3-typography</code>.
</aside>

### Package management

Origami components are installable with the npm package manager. Multiple components or patterns may exist within one package.

As well as following the
[package.json](https://docs.npmjs.com/cli/v7/configuring-npm/package-json) specification, component packages also include a:

- [`"browser"`](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#browser)`
  property set to the package's main client-side JavaScript entry-point if the package
  has JavaScript.
- [`"main"`](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#main)` property set to the package's CommonJS JSX entry point, if it provides a JSX template.
- [`"module"`](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#module)` property set to the package's ESM JSX entry point, if it provides a JSX template.
- `"description"` property set to a short description of the
  component.
- `"keywords"` property in order to help users discover the right
  component.
- `"type"` should not be set.
- `"license"` property set to the SPDX license identifier for the
  license of the component, e.g. "MIT".
- List any production Sass or Origami component dependencies under
  `"peerDependencies"`, to avoid using multiple versions of the same dependency.
- `"bugs"` field as described in the [package.json](https://docs.npmjs.com/cli/v7/configuring-npm/package-json) specification.

### Documentation

A component should have a README.md file at its root.

When a new major version of a component is released a migration guide should be written to help users upgrade from the previous release. The migration guide
is added to a MIGRATION.md file in the root of the component's codebase,
and is linked to from the component's README.md.

<aside>
	See
	<a href="https://github.com/Financial-Times/origami/blob/main/components/o-buttons/MIGRATION.md#migrating-from-v7-to-o3-button">
		o-button's migration guide to o3-button
	</a>
	as an example.
</aside>

### HTML

- A component’s markup should be contained in a root element that is defined as a
  [customElement](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element)
  registered against the component’s JavaScript class
- All data attributes and IDs are namespaced with the component’s name.

### JavaScript

- We recommend components only modify:
  - The component’s root element, and its children
  - Elements passed explicitly to the component via JavaScript, and their
    children
  - Elements with any other data attribute in the component’s namespace,
    and their children
- Components are configurable using data attributes
- Events triggered by a component should be namespaced under the
  target component’s name
- Component JavaScript is usually annotated using JSDoc

### CSS

- CSS selectors follow the [BEM naming convention](https://en.bem.info/methodology/naming-convention/).
- CSS Custom properties defined in the global
  namespace are prefixed with the component name
- We recommend components only style:
  - The component’s root element and its children
  - Elements with classes prefixed with the component’s name, and their
    children
  - Elements with any other data-attribute in the component’s namespace, and
    their children

@TODO brand and themes and design tokens?

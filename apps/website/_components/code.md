---
title: Code Structure & Languages
description: An overview of Origami component code structure, languages, and conventions.
cta: Learn more about component code

# Navigation config
nav_display: true
nav_label: Code
nav_order: 12
---

# {{page.title}}

The <a href="https://origami.ft.com/blog/2021/06/01/newsletter/#the-origami-specification-is-no-more">Origami component specification is now deprecated</a>. How Origami components are built is under active development and may change as Origami tooling and services are updated too. This is a non-normative reference for contributing to or creating new components.

## Manifest

Origami components contain an `origami.json` file at the top of the
component's directory structure, with the `type` property set to `"component"`. The [`origami.json` manifest documentation](/docs/manifests/origami-json/) covers the contents of this file.

## Naming conventions

A component’s name is used in the package.json, URLs, and CSS class names, so they:

- Contain only ASCII letters, numbers and hyphens
- Begin with a letter

<aside>
	Examples of good component names include
	<code>o-colors</code>,
	<code>o-grid</code> and
	<code>o-cookie-message</code>.
</aside>

## Package management

Origami components are installable with the npm package manager.

As well as following the
[package.json](https://docs.npmjs.com/cli/v7/configuring-npm/package-json) spec, components also include a:

- [`"browser"`](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#browser)`
  property set to the component's main JavaScript entry-point if the component
  has JavaScript.
- `"sass"` property set to the component's main Sass
  entry-point if the component has Sass.
- `"description"` property set to a short description of the
  component.
- `"keywords"` property in order to help users discover the right
  component.
- `"type"` property set to `"module"`.
- `"license"` property set to the SPDX license identifier for the
  license of the component, e.g. "MIT".
- List any production Sass or Origami component dependencies under
  `"peerDependencies"`, to avoid using multiple versions of the same dependency.
- `"bugs"` field as described in the [package.json](https://docs.npmjs.com/cli/v7/configuring-npm/package-json) spec.

## Documentation

A component should have a README.md file at its root.

When a new major version of a component is released a migration guide should be written to help users upgrade from the previous release. The migration guide
is added to a MIGRATION.md file in the root of the component's codebase,
and is linked to from the component's README.md.

<aside>
	See
	<a href="https://github.com/Financial-Times/o-table#migration">
		o-table's migration guide
	</a>
	as an example.
</aside>

## HTML

- A component’s markup should be contained in a root element that:
	- Has a data-o-component attribute with value of the component’s name, or
	- Is defined as a
	  [customElement](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element)
	  registered against the component’s JavaScript class
- All data attributes and IDs are namespaced with the component’s name.

## JavaScript

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

## Sass

- CSS selectors follow the [BEM naming convention](https://en.bem.info/methodology/naming-convention/).
- Sass functions, variables, mixins and placeholders defined in the global
  namespace are prefixed with the component name
- We recommend components only style:
	- The component’s root element and its children
	- Elements with classes prefixed with the component’s name, and their
	  children
	- Elements with any other data-attribute in the component’s namespace, and
	  their children
- A component shouldn't output CSS by default when Sass is loaded (i.e. `@use`, or
  `@import`)
- If the component is consumed via the `@import` syntax:
	- It provides a primary mixin with a name that matches the component
	  name (e.g. a component `o-well` provides a mixin `oWell`)
	- The primary mixin outputs all component CSS when no arguments are
	  given.
- Sass is usually annotated with SassDoc

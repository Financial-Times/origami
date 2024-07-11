---
title: Technical Guide
description: A technical guide to using "o3" Origami.
sidebar:
  order: 11
---

This technical guide covers Origami "o3", the [latest evolution of Origami](/about/what-is-new/). If you are working with older Origami components, which are still most commonly in use today, we have a separate ["o2" technical guide](/o2-components/technical-guide/).

## Using Origami in your project

We publish multiple Origami packages to npm which are independently versioned and contain a collection of reusable components and patterns.

If you would like to get started quickly, continue to our [guide to using Origami via npm](/getting-started/technical-guide/package-manager-npm). Otherwise keep reading for a general technical overview of Origami components.

## Code Structure & Languages

### Manifest

Any Origami project contains an `origami.json` file, including those with components. It's a <a href="https://www.json.org/"><abbr title="JavaScript Object Notation">JSON</abbr></a> format file that is responsible for describing various aspects of the project.

It is under active development and subject to change. For reference, see [`origami.json` manifest documentation for "o2"](/o2-components/technical-guide/origami-json/), which covers the contents of this file.

### Naming conventions

A component’s name is used in URLs and CSS class names, so they:

- Begin with `o3-`.
- Avoid plurals.
- Contain only ASCII letters, numbers and hyphens.

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
- `"peerDependencies"` should include any production Origami dependencies with styles ([see versioning](#versioning)).
- `"bugs"` field as described in the [package.json](https://docs.npmjs.com/cli/v7/configuring-npm/package-json) specification.

### Documentation

Markdown files at the root of a component's codebase:

- `/README.md`: It should include component specific technical documentation. Design guidelines and other general usage information should be documented on the [main website](https://origami.ft.com/).
- `/MIGRATION.md`: It should include steps to migrate from one major version of the npm package to another. It should be concise and instructional, rather than descriptive. E.g. see the [o-buttons to o3-button migration guide](https://github.com/Financial-Times/origami/blob/main/components/o-buttons/MIGRATION.md#migrating-from-v7-to-o3-button). The migration guide should be linked to from the component's `README.md`.
- `CHANGELOG.md`: Should include a description of changes for each npm package release.

Other documentation sources:

- Storybook: All components should include Stories `/stories` which provide interactive demos to allow users to preview all of the component's variants. It should also include a Story to provide easy access to technical documentation such as `/README.md` via Storybook.
- Main website (`origai.ft.com`): The main design system website should act as a hub, with links to all other documentation sources. In addition, it should include component design guidelines and general usage information. This includes the "where" any "why" of using components.

### Markup

- All classes, data attributes, and IDs are namespaced with the component’s name.
- HTML is part of the component's public API. Required HTML changes which need user action to upgrade must be treated as a major release.
- Components with HTML should provide an optional [JSX](https://facebook.github.io/jsx/) template for React users.
- JSX should be [authored as TSX](https://www.typescriptlang.org/docs/handbook/jsx.html) but published as compiled JSX with type definitions.

### Client JavaScript

- Component's should be written using Web Component standards. A component’s markup should be contained in a root element that is defined as a
  [customElement](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element),
  registered against the component’s JavaScript class.
- We recommend components only modify:
  - The component’s root element, and its children
  - Elements passed explicitly to the component via JavaScript, and their
    children
  - Elements with any other data attribute in the component’s namespace,
    and their children
- Components are configurable using data attributes
- Events triggered by a component should be namespaced under the
  target component’s name
- Component JavaScript should be annotated using [TypeScript in JSDoc](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)

### CSS

- CSS selectors follow the [BEM naming convention](https://en.bem.info/methodology/naming-convention/).
- Brand specific CSS must be applied using the presence of a parent `data-o3-brand` data attribute. E.g. `[data-o3-brand="core"] .o3-button`.
- Theme specific CSS must be applied using the `data-o3-theme` data attribute, whether applied directly to the component or a parent element. E.g. `.o3-button[data-o3-theme=inverse],
:where([data-o3-theme=inverse]) .o3-button`
- CSS Custom properties defined in the global
  namespace are prefixed with the component name
- We recommend components only style:
  - The component’s root element and its children
  - Elements with classes prefixed with the component’s name, and their
    children
  - Elements with any other data-attribute in the component’s namespace, and
    their children

## Versioning

Origami components:

- Must follow [Semantic Versioning (semver)](https://semver.org/) conventions, as outlined below.
- Should be installed as `peerDependencies`, to ensure only one version of a component is installed at once. This reduces the CSS/JS bundle size for users and ensures no code conflicts.
- Should be installed with a [caret `^` version range](https://docs.npmjs.com/cli/v6/using-npm/semver#caret-ranges-123-025-004), to avoid peer dependency conflicts when the component is required by more than one package. E.g. `^1.2.0` allows any version of the component at `>=1.2.0 <2.0.0`.

[Semantic Versioning (semver)](https://semver.org/) conventions mean a version such as `2.1.1` indicates `MAJOR.MINOR.PATCH` releases.

- `MAJOR` changes indicate incompatible API changes, where a user may need to make changes to use the new version. For Origami components this includes HTML changes.
- `MINOR` changes new functionality, added in a backward compatible manner.
- `PATCH` changes include backward compatible bug fixes.

See the [semver documentation](https://semver.org/) for further examples, including versioning for pre-release (beta) components.

## Browser support

Origami components support the <a href="https://docs.google.com/document/d/1z6kecy_o9qHYIznTmqQ-IJqre72jhfd0nVa4JMsS7Q4/"><abbr title="Financial Times">FT</abbr> Browser Support Policy (Google Doc)</a>. This includes "enhanced" support when JavaScript can run and "core" support for when JavaScript is not available.

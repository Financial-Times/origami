---
title: Component Specification
description: A specification which describes what is required for a front-end component to be considered Origami-compatible, and included in our registry.
cta: Read the component spec

# Redirect from legacy URLs
redirect_from:
  - /docs/component-spec/modules/
  - /docs/background-linters/

# Navigation config
nav_display: true
nav_label: Components
nav_order: 15
---

# {{page.title}}

Origami components are repositories containing front end code which can be used as part of a web page. Components are intended to be reusable UI patterns or functions; examples of good use-cases for components are:

  - A sortable table
  - A cookie notice
  - A consistent top navigation
  - Functions to track user behaviour


## Origami.json manifest

All Origami components **must** contain an `origami.json` file at the top of the repository's directory structure. The [`origami.json` manifest specification](/spec/v1/manifest/) covers the contents of this file. In addition to the rules outlined in the manifest specification, Origami components **must** set the `origamiType` property in the JSON to `"module"`.

<aside>
	The <code>origamiType</code> of <code>"module"</code> is a hangover from when client-side Origami components were named "modules". It's likely to change in a later version of the spec.
</aside>


## Naming conventions

Components **must** be named using a short descriptive term (hyphenated if necessary) and **should** be prefixed with `o-` (for Origami). The name **must** only contain lower-case ASCII letters, and hyphens. This name **must** be used as the repository name, the `name` property in `origami.json`, and as a prefix for any default CSS class names.

<aside>
	Examples of good component names include <code>o-colors</code>, <code>o-grid</code>, <code>o-cookie-message</code>.
</aside>

If a component is not maintained by the Origami team, then it **may** be prefixed with a different letter than `o-`, E.g. `n-button`, `g-audio`. This practice is discouraged, it's preferred that authors specify a support contact other than Origami in the component manifest.


## Files and folder structure

Origami components **must** include the following files:

  - `main.js` **_if_** the component has JavaScript functionality
  - `main.scss` **_if_** the component has styles
  - `origami.json` as outlined in [Origami.json manifest](#origamijson-manifest) above

_The rest of this section is non-normative._

A component's folder structure **may** be organised as follows. The following is what the Origami team use for all of their supported components, but it's not a requirement.

<aside class="no-padding">
<p>Origami provides a command to initialise a new component in this style:</p>
<pre style="white-space: normal; word-break: keep-all;"><code class="o-syntax-highlight--bash">npm init origami-component</code>
</pre>
</aside>

<pre><code class="o-syntax-highlight--bash">.
├── demos
│   └── src (containing Mustache files)
├── src
│   ├── js (containing JavaScript files)
│   └── scss (containing SCSS files)
├── test (containing JavaScript and Sass tests)
├── bower.json
├── README.md
├── main.js
├── main.scss
├── origami.json
└── package.json</code>
</pre>


## Package management

Origami components **must** be installable through at least one package manager (individual package managers detailed below).

When a consumer attempts to use a component and finds that it is installable through a particular package manager, they **should** be able to assume that the same package manager can be used to install _any_ Origami component.

### Bower

Origami components **must** be installable through the <a href="https://bower.io/" class="o-typography-link--external">Bower package manager</a>, and **should** include a `bower.json` manifest file which configures the component. The component **should not** be published to the public Bower registry (through `bower register` or similar).

<aside>
  Origami components are not published to the public Bower registry because they can be accessed through the Origami Bower Registry.
  <a href="https://origami-bower-registry.ft.com/" class="o-typography-link--external">Read the service documentation</a> for more information.
</aside>

As well as following the <a href="https://github.com/bower/spec/blob/master/json.md" class="o-typography-link--external">`bower.json` spec</a>, there are additional requirements to make the component's Bower manifest conform to the Origami specification:

  - It **must** include a `name` property set to the repository name, e.g. `o-typography`
  - It **must** include a `main` property set to an array which **must**:
    - reference the component's main JavaScript file (`main.js`) **_if_** it exists
    - reference the component's main Sass file (`main.scss`) **_if_** it exists
  - It **must** include a `dependencies` property set to an object **_if_** the component has any Origami dependencies. Each key/value pair **must**:
    - reference a semver range and **not** a Git repository or URL
    - **not** reference an unstable or beta version of a dependency
  - It **must** include an `ignore` property set to an array, which **must**:
    - include all files and directories in the component that are not required by consumers (see [ignored files](#bower-ignored-files) for an example configuration)
    - **not** contain the files: `origami.json`, `README.md`, and files required to build demos
  - It **must not** include a `version` property. This is not needed and risks being out of sync with the repository's git tags
  - It **may** contain a `description` property set to a short description of the component
  - It **should not** contain any additional properties

#### Bower ignored files

_This section is non-normative._

The following is the list of ignored files in most component Bower configurations. This **may** be used as a starting point for new components:

<pre><code class="o-syntax-highlight--json">"ignore": [
	"**/.*",
	"node_modules",
	"bower_components",
	"test",
	"build"
]</code></pre>

### npm

Origami components **may** include a `package.json` manifest. As well as following the <a href="https://docs.npmjs.com/files/package.json" class="o-typography-link--external">`package.json` spec</a>, there are additional requirements to make the component's npm manifest conform to the Origami specification:

  - It **must not** include any of the following properties: `bin`, `bugs`, `config`, `cpu`, `dependencies` (as this would indicate that the manifest is required for consumption of the component), `engines`, `engineStrict`, `files`, `main`, `os`, `preferGlobal`, `publishConfig`
  - It **must not** include a `version` property
  - It **must** include a `devDependencies` property set to an object **_if_** the component has any npm dependencies required for development or testing
  - It **should** include a `private` property set to `true`
  - It **may** include any other standard npm-defined property


### Specifying dependencies

Components **should** have as few dependencies as possible. When a dependency is not required for use in production, it **should** be listed as a development dependency in whichever package manager you use.

Dependencies used in a component **must** be added explicitly to the package manager config. Components **must not** rely on code from sub-dependencies (see example).

<aside>
  Sub-dependency example: if <code>o-component-a</code> includes <code>o-component-b</code> as a dependency and a new component you're developing requires features from both, then both must be added as explicit dependencies – you must not depend on <code>o-component-a</code> alone.
</aside>

When listing dependencies in your `bower.json` manifest, the <a href="https://semver.org/" class="o-typography-link--external">SemVer</a> range that you specify:

  - **must** be specified in a way that allows `MINOR` and `PATCH` to automatically update. This is normally achieved by using the caret (`^`) operator
  - **must** be greater than or equal to `1.0.0`
  - **must not** contain a SemVer prerelease suffix, e.g. `1.0.0-beta`

(See the example for clarification).

<aside>
  <p>Examples of spec-compliant dependency versions: <code>^1.0.0</code>, <code>&lt;3</code></p>
  <p>Examples of non-spec-compliant dependency versions: <code>^0.1.0</code>, <code>1.0.0</code>, <code>~1.0.0</code>, <code>^2.0.0-beta.4</code></p>
</aside>

When an Origami component is a dependency of many other Origami components, it **must** verify and assert the widest version compatibility possible, including maintaining compatibility with earlier versions of a dependency unless to do so would be impractical. E.g. specifying a broad version range like `"o-colors": ">=3.0.0 <5"`

<aside>If you want to understand more about how a SemVer expression matches specific versions, try <a href="https://semver.npmjs.com/" class="o-typography-link--external">npm's SemVer calculator</a>.</aside>


## Source control

Origami component code **must** reside in a Git repository which has the same name as the component ([see naming conventions](#naming-conventions)). This repository **must** be stored remotely under one of the following GitHub organisations:

  - <a href="https://github.com/Financial-Times" class="o-typography-link--external">Financial-Times</a>
  - <a href="https://github.com/ft-interactive" class="o-typography-link--external">FT-Interactive</a>
  - <a href="https://github.com/ftlabs" class="o-typography-link--external">FTLabs</a>

Component repositories **should** be public by default, however they **may** be private if there is a compelling reason, e.g. to comply with a font license in the case of `o-fonts-assets`.

Commit messages **should** describe the change that they introduce to a component.

## Code

### Markup

See [the Origami Markup Specification](/spec/v1/components/markup).

### Styles

Origami component styles are authored in <a href="http://sass-lang.com/" class="o-typography-link--external">Sass</a>, specifically the SCSS syntax.

See [the Origami Sass Specification](/spec/v1/components/sass).

### Behaviour

See the [Origami javascript specification](/spec/v1/components/javascript).

### Subresources

Origami components **may** load additional files (fonts, JSON data, images etc) from their own source. To do so safely, components **must** resolve file paths using the <a href="https://github.com/Financial-Times/o-assets" class="o-typography-link--external">Origami assets module</a>:

Without any explicit configuration, `o-assets` will assume, as we do for sub-resources in Sass, that the components are installed publicly at a URL path of `/bower_components` on the current host, and will form URLs on that basis.  Product developers are advised to reconfigure `o-assets` to accommodate their own server-side URL routing architecture.

Where external resources are not within Origami components, a <a href="https://www.paulirish.com/2010/the-protocol-relative-url/" class="o-typography-link--external">protocol-relative</a> URL **must** be used (see <a href="https://github.com/Financial-Times/ft-origami/issues/173" class="o-typography-link--external">issue 173</a>.

## Testing

### Automated tests

Components **should** include automated tests which at least verify that the component can be built using <a href="https://github.com/Financial-Times/origami-build-tools" class="o-typography-link--external">Origami Build Tools</a>.

A component author **may** additionally test their component however they like, providing that all test-related files **should** be in the `test` directory, and also ignored as outlined in [Bower ignored files](#bower-ignored-files). A component **may** use Origami Build tools to run the tests for consistency:

<pre><code class="o-syntax-highlight--bash">npx origami-build-tools test</code></pre>

### Continuous integration

Components **should** implement CI. If a component does so then it **should** verify that the component can be built using <a href="https://github.com/Financial-Times/origami-build-tools" class="o-typography-link--external">Origami Build Tools</a>, as mentioned in [Automated tests](#automated-tests).

### Browser/manual testing

All components **must** be tested with all the browsers listed in the <a href="/docs/components/compatibility/#browser-support">FT browser support policy</a>. If a component includes JavaScript, it **must** be error free in all the browsers that fall above the recommended minimum boundary for enhanced experience in that policy.

The versions tested **should** be listed in the component’s documentation, so that when boundary recommendations are changed, it is still possible to determine the support that was designed into an older component.


## Documentation

### Github Repo

If the repository is hosted on GitHub, the Github “Website” URL **should** be configured to be the component's page in the Origami registry (e.g. "http://registry.origami.ft.com/components/o-grid").

### README

A component **should** include a `README.md` in the root of the component's codebase. The README **should**:
- Include a single-line description of what the component does.
- Give examples detailing the most common use cases.
- Provide the licence, which **should** conform to the <a href="https://docs.google.com/document/d/1pI-qI3BrO5edFYdHcoDCH9wVbfbFvroclxSEtkXwpCw" class="o-typography-link--external">open source release policy</a>.

The README **should not** include generic information (e.g. installation steps that apply equally to all components in general), but a link to such documentation **may** be included.

### Migration

When a new major version of a component is released a migration guide **should** be written to help users upgrade from the previous release. The migration guide **should** be added to a `MIGRATION.md` file in the root of the component's codebase, and **should** be linked to from the component's `README.md`. See <a href="https://github.com/Financial-Times/o-table#migration" class="o-typography-link--external">o-table's migration guide</a> as an example.

### Codedocs

Component JavaScript **should** be documented using <a href="http://usejsdoc.org/" class="o-typography-link--external">JSDoc</a> and component Sass should be documented with <a href="http://sassdoc.com/" class="o-typography-link--external">SassDoc</a>. This allows users to view and search the component's public interface in the registry. For example, see <a href="https://registry.origami.ft.com/components/o-grid/sassdoc">o-grid's SassDocs</a>.

## Browser support

All components **must** be tested with all the browsers listed in the [FT browser support policy](/docs/components/compatibility/#browser-support). If a component includes JavaScript, it **must** be error free in all the browsers which fall under the "enhanced experience" in that policy.

## Demos

Component authors **should** provide component demos, which **must** be [defined in origami.json](/spec/v1/manifest/#demos) and built with <a href="https://www.npmjs.com/package/origami-build-tools" class="o-typography-link--external">Origami Build Tools</a>.

When deciding what demos to create, demos:
- **Must** be based on realistic use cases.
- **Should** be visually different from one another.
- **Should not** be used to explain configuration and implementation differences, these should be explained in the component’s README.

When building demos, they:
- **Must** have a description explaining what they show ([see origami.json](/spec/v1/manifest/#demos)).
- **Should** be reproducible using the [Origami Build Service](/docs/services/#build-service) by copying the demo markup.
- **Should not** include more than necessary to demonstrate the component, including: any headings, backgrounds, margins or other content that are not part of the component itself.

Where styles need to be added specifically for a demo (e.g. to make the content of o-grid containers visible), they **must** be attached to classes with a `demo-` prefix, for example:
```
.demo-cell {
  background-color: red;
}
```

## Build Step

All components **must** be buildable by the <a href="https://www.ft.com/__origami/service/build/v2/" class="o-typography-link--external">Origami Build Service</a>.

## Component Lifecycle

### Component Release

The first released version of a component **must** be `v1.0.0`. Versions lower than 1 are subject to different semver parsing logic, which is a nuance best avoided.

To ensure subsequent releases don't affect the current users of a component:

- Follow our guidelines on [deprecating component features](#component-feature-deprecation), making sure deprecated features still work. If an interface wasn't intended for public use but wasn't made private, removal will have to follow the same deprecation process as explicitly public code.
- Don’t make a major release until all or most dependants have removed deprecated features.
- When updating a dependency to the latest minor release, make a minor release.
- When updating a dependency to the latest major release, make sure the semver range includes the previous major release (_e.g. `>=1.2.3 <3`_). If not, a major release is necessary.
- When adding a new dependency, make a major release as it may break existing bundles.
- When using a new browser API which requires support from the Polyfill service (added in the features list of the `origami.json`), make a major release.

### Component Release Notice

When new versions of components are released, updates **may** be needed to other components and products that consume the component. The following notification rules apply:

- If the release is a new **major** version, the component developer **must** notify maintainers of all components and products with dependents, at least 1 day prior to the release being tagged (to enable other breaking changes to be suggested), and again immediately after the release. When a new **major** release affects many dependent components and projects we call this a [major cascade](/docs/components/major-cascade/). It **may** require [extra consideration](/docs/components/major-cascade/) before release.
- If the release is a new **minor** version, the component developer **should** notify maintainers of all components and products listed as dependents in the Origami registry, immediately after the release.
- If the release is a new **patch** version, no notifications need be sent.

### Component Feature Deprecation

- Deprecated code **should** go into a private deprecated file, or, if there’s an abundance of deprecated code, to a directory called `deprecated`. This way, it will be much easier to work with the new code while maintaining legacy code. It will also be easier to delete when making a major release.
- If separating deprecated code into its own `deprecated` file or directory is not pragmatic, modified code **must** be appended and prepended with a comment which begins ```@deprecated```, followed by text which describes the deprecation.
- Deprecated functions and mixins **should** log a warning stating that they are now deprecated and offering an alternative when there is one. This warning **may** also be added to the README.
- An issue with label `type: breaking` **must** be created as a reminder to remove deprecated code upon a future major release.

### Component Deprecation

In the event of deprecating an Origami component, the following steps **must** be followed:

1. Modify [origami.json](/spec/v1/manifest/) to change the `supportStatus` to `deprecated`.
2. Change the `README.md` to have a paragraph at the top outlining the deprecation status. If it has been replaced, it must point to the new replacement component from the deprecated component.
3. Disable the Issues functionality from the deprecated component's repository, if the component is hosted on Github.
4. Update the repository's description to "deprecated - please use <component> instead" if it has been replaced and change the URL to point towards the replacement's repository on GitHub.

---
title: origami.json
description: Responsible for describing various aspects of an Origami project.
cta: Read more about the origami.json manifest.

# Navigation config
nav_display: true
nav_label: origami.json
nav_order: 20
---

# {{page.title}}

`origami.json` is a <a href="https://www.json.org/" class="o-typography-link--external"><abbr title="JavaScript Object Notation">JSON</abbr></a> format file that is responsible for describing various aspects of an Origami project. It is under active development and subject to change, `required` properties indicate those that Origami tools or services may still rely on.

<aside>
The <a href="https://origami.ft.com/blog/2021/06/01/newsletter/#the-origami-specification-is-no-more">Origami specification is now deprecated</a>. The structure of <code class="language-plaintext highlighter-rouge">origami.json</code> may change as Origami tooling and services are updated.
</aside>

## Properties

### description

<table class="o-manifest__table o-table o-table--compact o-table--row-headings o-table--vertical-lines o-table--horizontal-lines" data-o-component="o-table">
	<tr>
		<th scope="row" role="rowheader">Type</th>
		<td><code>String</code></td>
	</tr>
	<tr>
		<th scope="row" role="rowheader">Required</th>
		<td><code>true</code></td>
	</tr>
</table>

A concise description of the purpose of the project.
<pre><code class="o-syntax-highlight--json">{
	"description": "Branded tables"
}</code></pre>

### origamiType

<table class="o-manifest__table o-table o-table--compact o-table--row-headings o-table--vertical-lines o-table--horizontal-lines" data-o-component="o-table">
	<tr>
		<th scope="row" role="rowheader">Type</th>
		<td><code>String</code> or <code>null</code></td>
	</tr>
	<tr>
		<th scope="row" role="rowheader">Required</th>
		<td><code>true</code></td>
	</tr>
</table>

Defines the type of Origami project that the manifest belongs to:
- `"component"` (previously `module`): A front-end component
- `"imageset"`: A set of images that have an alias on the Origami Image Service
- `"service"`: An HTTP service
- `"cli"`: 	A command line tool
- `"library"`: 	A library that is not a front-end component
- `"website"`: Origami websites that aren't intended to be services
- `"config"`: Projects that are configuration for other projects
- `"example"`: Example and boilerplate projects
- `"meta"`: Repository-only projects that relate to how Origami works
- `null`: An Origami project that does not fit any of the named categories

<pre><code class="o-syntax-highlight--json">{
	"origamiType": "component"
}</code></pre>

### origamiVersion

<table class="o-manifest__table o-table o-table--compact o-table--row-headings o-table--vertical-lines o-table--horizontal-lines" data-o-component="o-table">
	<tr>
		<th scope="row" role="rowheader">Type</th>
		<td><code>Integer</code></td>
	</tr>
	<tr>
		<th scope="row" role="rowheader">Required</th>
		<td><code>true</code></td>
	</tr>
</table>

The version of the [Origami specification](/spec/) the project follows. Note that the specification is now deprecated as of v1, any value other than `1`, for example `2.0`, indicates the project does not follow a specification:
<pre><code class="o-syntax-highlight--json">{
	"origamiVersion": 1
}</code></pre>

### brands

<table class="o-manifest__table o-table o-table--compact o-table--row-headings o-table--vertical-lines o-table--horizontal-lines" data-o-component="o-table">
	<tr>
		<th scope="row" role="rowheader">Type</th>
		<td><code>Array</code></td>
	</tr>
	<tr>
		<th scope="row" role="rowheader">Required</th>
		<td><code>false</code></td>
	</tr>
</table>

For components which support [brands](/docs/components/customisation/), an array of one or more brands: "master", "internal, "whitelabel".
If the brands property does not exist, this means the component is unbranded and supports all the brands.

### keywords

<table class="o-manifest__table o-table o-table--compact o-table--row-headings o-table--vertical-lines o-table--horizontal-lines" data-o-component="o-table">
	<tr>
		<th scope="row" role="rowheader">Type</th>
		<td><code>Array</code></td>
	</tr>
	<tr>
		<th scope="row" role="rowheader">Required</th>
		<td><code>true</code></td>
	</tr>
</table>

Expects keywords related to the project to help discover it in the registry.

<pre><code class="o-syntax-highlight--json">{
	"keywords": ["table", "rows", "columns"]
}</code></pre>

### origamiCategory

<table class="o-manifest__table o-table o-table--compact o-table--row-headings o-table--vertical-lines o-table--horizontal-lines" data-o-component="o-table">
	<tr>
		<th scope="row" role="rowheader">Type</th>
		<td><code>String</code></td>
	</tr>
	<tr>
		<th scope="row" role="rowheader">Required</th>
		<td><code>true</code>*</td>
	</tr>
</table>

*Applies to `{ "origamiType": "component" }`.

Describes the organisational category the component belongs to:
- `"utilities"`: Sass and JavaScript utilities that provide no markup, provide no classes and are used to encapsulate shared logic between components
- `"primitives"`: Base components that provide minimal markup and are used by other components
- `"components"`: Components built from primitives and utilities, which provide markup for a complete user interface
- `"layouts"`: Complex components that provide styles for the whole page

<pre><code class="o-syntax-highlight--json">{
	"origamiCategory": "components"
}</code></pre>

### support
<table class="o-manifest__table o-table o-table--compact o-table--row-headings o-table--vertical-lines o-table--horizontal-lines" data-o-component="o-table">
	<tr>
		<th scope="row" role="rowheader">Type</th>
		<td><code>String</code></td>
	</tr>
	<tr>
		<th scope="row" role="rowheader">Required</th>
		<td><code>true</code></td>
	</tr>
</table>
Describes where a user can go for support on this project, e.g. the project's GitHub issues.

<pre><code class="o-syntax-highlight--json">{
	"support": "https://github.com/Financial-Times/o-table/issues"
}</code></pre>

### supportStatus

<table class="o-manifest__table o-table o-table--compact o-table--row-headings o-table--vertical-lines o-table--horizontal-lines" data-o-component="o-table">
	<tr>
		<th scope="row" role="rowheader">Type</th>
		<td><code>String</code></td>
	</tr>
	<tr>
		<th scope="row" role="rowheader">Required</th>
		<td><code>true</code></td>
	</tr>
</table>

Describes the support status of the project's major version:
- `active`: feature development ongoing, bug reports will be gratefully received and acted upon promptly
- `maintained`: not actively developed but reproducible bugs will be fixed promptly and work done where necessary to maintain compatibility with platforms and other projects
- `deprecated`: not actively developed, not recommended for new projects, only the most disabling bugs will be addressed and only when time allows, but existing implementations may still work
- `dead`: decommissioned entirely, will receive no support
- `experimental`: the project is not ready for production use

<pre><code class="o-syntax-highlight--json">{
	"supportStatus": "active"
}</code></pre>

### supportContact

<table class="o-manifest__table o-table o-table--compact o-table--row-headings o-table--vertical-lines o-table--horizontal-lines" data-o-component="o-table">
	<tr>
		<th scope="row" role="rowheader">Type</th>
		<td><code>Object</code></td>
	</tr>
	<tr>
		<th scope="row" role="rowheader">Required</th>
		<td><code>false</code></td>
	</tr>
</table>

Describes contact details a user can choose from to find support for this project. The owner(s) identified in the support options commit to:
- reviewing code prior to release
- signing off on deployments
- publishing and maintaining up to date releases and documentation
- decommissioning the project when appropriate
- provide support to the users of the project

The object requires two properties:
- `email`: type `String`. Is an email address that users can request support from. We recommend a group or role based email, not a named individual
- `slack`: type `String`. Is a slack channel that users can go to for support in the format: organisation/channel-name

<pre><code class="o-syntax-highlight--json">{
	"supportContact": {
		"email": "origami.support@ft.com",
		"slack": "financialtimes/origami-support"
	}
}</code></pre>

### browserFeatures

<table class="o-manifest__table o-table o-table--compact o-table--row-headings o-table--vertical-lines o-table--horizontal-lines" data-o-component="o-table">
	<tr>
		<th scope="row" role="rowheader">Type</th>
		<td><code>Object</code></td>
	</tr>
	<tr>
		<th scope="row" role="rowheader">Required</th>
		<td><code>false</code></td>
	</tr>
</table>

Applies to `{ "origamiType": "component" }`. Outlines the browser features required for the component's functionality.
The object accepts two properties:
- `required`: type `Array`. A list of <a href="https://polyfill.io" class="o-typography-link--external">Polyfill Service</a> features or <a href="https://modernizr.com/docs/" class="o-typography-link--external">Modernizr</a> tests, which the component assumes exists. If these features do not exist, the component may error.
- `optional`: type `Array`. A list of <a href="https://polyfill.io" class="o-typography-link--external">Polyfill Service</a> features or <a href="https://modernizr.com/docs/" class="o-typography-link--external">Modernizr</a> tests, which the component  will use if they are available in the browser. If not the component may offer different or reduced functionality, but with graceful degradation.

<pre><code class="o-syntax-highlight--json">{
	"origamiType": "component",
	"browserFeatures": {
		"required": [
		"customEvent"
		],
		"optional": [
			"IntersectionObserver",
			"IntersectionObserverEntry"
		]
	}
}</code></pre>

### serviceUrl

<table class="o-manifest__table o-table o-table--compact o-table--row-headings o-table--vertical-lines o-table--horizontal-lines" data-o-component="o-table">
	<tr>
		<th scope="row" role="rowheader">Type</th>
		<td><code>String</code></td>
	</tr>
	<tr>
		<th scope="row" role="rowheader">Required</th>
		<td><code>true</code>*</td>
	</tr>
</table>

*Applies to `{ "origamiType": "service" }` only.

Is the URL on which the service is provided.

<pre><code class="o-syntax-highlight--json">{
	"origamiType": "service",
	"serviceUrl": "https://www.ft.com/__origami/service/build/"
}</code></pre>

### demosDefaults
<table class="o-manifest__table o-table o-table--compact o-table--row-headings o-table--vertical-lines o-table--horizontal-lines" data-o-component="o-table">
	<tr>
		<th scope="row" role="rowheader">Type</th>
		<td><code>Object</code></td>
	</tr>
	<tr>
		<th scope="row" role="rowheader">Required</th>
		<td><code>false</code></td>
	</tr>
</table>

Describes default options to be applied to all demos.

The object accepts the following properties:

- `template`: type `String`. Describes the path to the mustache template to render
- `sass`: type `String`. Describes the path to the Sass file to compile.
- `js`: type `String`. Describes the JS file to build.
- `data`: type `Object` or `String`. Describes data to populate to the mustache template with. If this is a string it must be a path to a JSON file containing the data, relative to the root of the repo.
- `documentClasses`: type `String`. Names CSS classes to set on the `html` tag.
- `dependencies`: type `Array`. Is a list of other components that are only needed for demos, which will be loaded via the <a href="https://www.ft.com/__origami/service/build" class="o-typography-link--external">Build Service</a>

All of these properties are **optional**.

<pre><code class="o-syntax-highlight--json">{
	"demosDefaults": {
		"template": "demos/src/demo.mustache"
		"sass": "demos/src/demo.scss",
		"js": "demos/src/demo.js"
		"data": {
			"striped-rows": true
		},
		"documentClasses": "demo-container",
		"dependencies": ["o-normalise"]
	}
}</code></pre>

### demos
<table class="o-manifest__table o-table o-table--compact o-table--row-headings o-table--vertical-lines o-table--horizontal-lines" data-o-component="o-table">
	<tr>
		<th scope="row" role="rowheader">Type</th>
		<td><code>Array</code></td>
	</tr>
	<tr>
		<th scope="row" role="rowheader">Required</th>
		<td><code>false</code></td>
	</tr>
</table>

It accepts an array. Is a list of configuration objects for individual demos.
Each object in the list accepts the following properties:

**required**:
- `name`: type `String`. Demo name which will be used as the name of the outputted html file
- `title`: type `String`. A title for the demo which will appear when listed in the Registry
- `description`: type `String`. An explanation of the purpose of the demo
- `template`: type `String`. Describes the path to the demo-specific mustache template to render

**optional**:
- `sass`: type `String`. Describes the path to the demo-specific Sass file to compile.
- `js`: type `String`. Describes the path to the demo-specific JS file to build.
- `data`: type `Object` or `String`. Describes data to populate to the component-specific mustache template with. If this is a string it must be a path to a JSON file containing the data, relative to the root of the repo.
- `brands`: type `Array`. For components which support [brands](/docs/components/branding/), this describes one or more brands which the demo applies to ("master", "internal, "whitelabel")
- `documentClasses`: type `String`. Names CSS classes to set on the component-specific `html` tag
- `dependencies`: type `Array`. Is a list of other components that are only needed a this specific demo, which will be loaded via the <a href="https://www.ft.com/__origami/service/build" class="o-typography-link--external">Build Service</a>
- `hidden`: type `Boolean`. Whether the demo should be hidden in the Registry
- `display_html`: type `Boolean`. Whether the demo should have a HTML tab in the Registry (defaults to true)

<pre><code class="o-syntax-highlight--json">{
	"demos": [
		{
			"name": "Basic table",
			"description": "Basic table implementation",
			"template": "demos/src/basic-component.mustache"
		},
		{
			"name": "Striped table",
			"description": "Striped table implementation",
			"template": "demos/src/striped-table.mustache",
			"sass": "demos/src/striped-table.scss",
			"documentClasses": "demo-striped-table-container",
			"brands": ["master", "internal"]
		},
		{
			"name": "pa11y",
			"description": "Hidden test for pa11y",
			"hidden": true,
			"template": "demos/src/pa11y.mustache"
		}
	]
}</code></pre>

## Example

This example joins all of the property snippets outlined above:

<pre><code class="o-syntax-highlight--json">{
	"description": "Branded tables",
	"origamiType": "component",
	"origamiVersion": '2.0',
	"keywords": ["table", "rows", "columns"],
	"origamiCategory": "components",
	"support": "https://github.com/Financial-Times/o-table/issues",
	"supportStatus": "active",
	"supportContact": {
			"email": "origami.support@ft.com",
			"slack": "financialtimes/origami-support"
		}
	"browserFeatures": {
		"required": [
		"customEvent"
		],
		"optional": [
			"IntersectionObserver",
			"IntersectionObserverEntry"
		]
	},
	"demosDefaults": {
		"template": "demos/src/demo.mustache"
		"sass": "demos/src/demo.scss",
		"js": "demos/src/demo.js"
		"data": {
			"striped-rows": true
		},
		"documentClasses": "demo-container",
		"dependencies": ["o-normalise"]
	},
	"demos": [
		{
			"name": "Basic table",
			"description": "Basic table implementation",
			"template": "demos/src/basic-component.mustache"
		},
		{
			"name": "Striped table",
			"description": "Striped table implementation",
			"template": "demos/src/striped-table.mustache",
			"sass": "demos/src/striped-table.scss",
			"documentClasses": "demo-striped-table-container"
		},
		{
			"name": "pa11y",
			"description": "Hidden test for pa11y",
			"hidden": true,
			"template": "demos/src/pa11y.mustache"
		}
	]
}</code></pre>

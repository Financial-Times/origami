---
title: Component versioning
description: An explanation of how Origami components are versioned, how to request different versions and resolve conflicts.
cta: Read more about component versioning

# Redirect from legacy URLs
redirect_from:
  - /docs/developer-guide/modules/module-versioning/

# Navigation config
nav_display: true
nav_label: Versioning
nav_order: 20
---

# {{ page.title }}

The Origami team maintains and improves the components regularly. This means that we release new versions of the components frequently, and a component's new version numbers follow the <abbr title="Semantic Versioning">semver</abbr> specification.

<aside>You can find more information in the <a href="http://semver.org/" class="o-typography-link--external"><abbr title="Semantic Versioning">semver</abbr> specification</a></aside>

## How components are versioned

The version numbers are in the following format: `1.2.3`, which is representative of `MAJOR.MINOR.PATCH`.
- `MAJOR`: When a major is released, we refer to it as a breaking change. This usually means that we have made a drastic visual change, or a change that breaks backwards compatibility. When this changes, we will communicate the change and offer help with migration.
- `MINOR`: When this number changes , we'll have made an improvement, added a feature or made a noticeable design tweak, for example.
- `PATCH`: When we release patches, we are usually releasing a bug fix that does not affect the components overall functionality.

_When a new `MAJOR` release affects many dependent components and projects we call this a [major cascade](/docs/components/major-cascade/). It may require [extra consideration and support](/docs/components/major-cascade/) before release._

## How to request a versioned component

We recommend requesting an Origami component by requesting a particular version range, which is indicated by a caret (`^`). That syntax will specify a version but will also fetch minor and patch releases in the future. So if you request `o-message@^2.3.0`, you will get `v2.3.0`. But when we release a minor (`v2.4.0`) of that component further down the line, it means you'll automatically get that, too.

<aside>With <abbr title="Semantic Versioning">semver</abbr> you can use different characters to <a href="https://semver.npmjs.com/" class="o-typography-link--external">specify different ranges</a></aside>

By requesting a component's version range, you'll have an up-to-date component as soon as we release it.

## Version conflicts

Almost all Origami components are built on top of other Origami components.

<a href="https://registry.origami.ft.com/components/o-message">o-message</a>, for example, relies on <a href="https://registry.origami.ft.com/components/o-message">o-buttons</a>, <a href="https://registry.origami.ft.com/components/o-colors">o-colors</a>, <a href="https://registry.origami.ft.com/components/o-icons">o-icons</a> and <a href="https://registry.origami.ft.com/components/o-typography">o-typography</a>, which in turn have Origami dependencies of their own, which generates an elaborate dependency tree:

<pre><code class="o-syntax-highlight--bash">o-message
├── o-buttons
│   ├── o-colors
│   ├── o-icons
│   │   ├── fticons
│   │   └── o-assets
│   └── o-normalise
│       └── o-colors
├── o-colors
├── o-icons
│   ├── fticons
│   └── o-assets
└── o-typography
    ├── o-colors
    ├── o-fonts
    ├── o-grid
    └── o-icons
        ├── fticons
        └── o-assets</code></pre>

Let's use `o-colors` as an example.

The full `o-message` dependency tree requires `o-colors` **four** times. In order to avoid downloading four different versions of `o-colors`, we will flatten the dependencies and try to find a version of `o-colors` that all of the components requiring it can use. This is possible because [Origami components use <abbr title="Semantic Versioning">semver</abbr> ranges](#how-to-request-a-versioned-component) to specify the versions of their dependencies.

However, this can also lead to situations where there is no single version that satisfies all <abbr title="Semantic Versioning">semver</abbr> ranges. This happens primarily when different ranges for the same component are specified.

If, for instance, `o-message` requires `o-colors@^2.3.4`, it will be compatible with any version between `v2.3.4` and below `v3.0.0`.

If the `o-typography` dependency required `o-colors@^1.2.3`, any version above and including `o-colors@2.0.0` won't be compatible with the direct `o-colors` dependency (which is `v2.3.4` and above), and will cause a conflict.

The only way to fix these conflicts is to ensure that the dependencies and the dependencies within those dependencies are all requiring the **same ranges**.

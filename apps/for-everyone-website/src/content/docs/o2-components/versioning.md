---
title: Component versioning
description: An explanation of how Origami components are versioned, how to request different versions and resolve conflicts.
sidebar:
  order: 20
---

# Component versioning

The Origami team maintains and improves the components regularly. This means that we release new versions of the components frequently, and a component's new version numbers follow the <abbr title="Semantic Versioning">semver</abbr> specification.

:::note
You can find more information in the <a href="http://semver.org/"><abbr title="Semantic Versioning">semver</abbr> specification</a>
:::

## How components are versioned

The version numbers are in the following format: `1.2.3`, which is representative of `MAJOR.MINOR.PATCH`.

- `MAJOR`: When a major is released, we refer to it as a breaking change. This usually means that we have made a drastic visual change, or a change that breaks backwards compatibility. When this changes, we will communicate the change and offer help with migration.
- `MINOR`: When this number changes , we'll have made an improvement, added a feature or made a noticeable design tweak, for example.
- `PATCH`: When we release patches, we are usually releasing a bug fix that does not affect the components overall functionality.

## How to request a versioned component

We recommend requesting an Origami component by requesting a particular version range, which is indicated by a caret (`^`). That syntax will specify a version but will also fetch minor and patch releases in the future. So if you request `o-message@^2.3.0`, you will get `v2.3.0`. But when we release a minor (`v2.4.0`) of that component further down the line, it means you'll automatically get that, too.

:::note
With <abbr title="Semantic Versioning">semver</abbr> you can use different characters to <a href="https://semver.npmjs.com/">specify different ranges</a>
:::

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

## Releasing

### Plan for and communicate a release

Releasing a new version of a component impacts other projects and teams, as updates may be needed to projects which consume the component .

Before releasing a new major version of a component, notify maintainers of dependent projects. This allows time for feedback and for teams to plan for the migration from one major version to another. This [migration process can be complex](/o2-components/versioning/major-cascade), especially when making a major change to a component which is widely used across many other components and end products. It is therefore important to plan for a release and communicate with stakeholders ahead of time.

For minor or patch releases, notify maintainers of dependent projects to encourage adoption of the new fix or feature. A Slack message, blog post, or newsletter is a good way to do this.

### Decide what version to release

- `MAJOR`:
  - Breaking change (i.e. API change which is not backward compatible).
  - Significant visual change which may require action from dependent teams.
  - A new peer dependency or new major version of an existing peer dependency, unless the semver range includes the previous major release (e.g. >=1.2.3 <3).
- `MINOR`:
  - A new feature.
  - A noticeable design change.
  - A minor version bump for a peer dependency.
- `PATCH`:
  - A bug fix that does not affect the components overall functionality.

When a new `MAJOR` release affects many dependent components and projects we call this a [major cascade](/o2-components/versioning/major-cascade). It may require [extra consideration and support](/o2-components/versioning/major-cascade) before release.

### Deprecate a component

Follow these steps to deprecate an existing component:

1. Plan for and communicate a deprecation with users, as outlined above.
1. Collaborate with design to ensure design tooling is also updated, where a representation of the component exists.
1. Modify the component's `origami.json`, change its [supportStatus](/o2-components/technical-guide/origami-json#supportstatus) to either "dead" or "deprecated" – see the [origami.json manifest specification](/o2-components/technical-guide/origami-json#supportstatus) for a definition of each status.
1. Update the component's `README.md` to include a paragraph at the top, outlining the component's deprecation status. Explain what any remaining users should do. Link to any replacement.
1. Make a patch release so Origami services and tooling picks up the updated status and readme.
1. Disable the Github Issues functionality from the deprecated component’s repository.
1. Update the Github URL to point towards the replacement's repository on GitHub, if it exists.
1. If the component is "dead", either delete the component's directory in a mono-repo context or archive the component's individual Github Repository.

### Deprecate a component feature

- Plan for and communicate a feature deprecation with users, as outlined above.
- Collaborate with the design team to ensure the deprecated feature is aligned in design tooling (Figma).
- Where practical, move deprecated code into its own file or to a directory called "deprecated". This way, it will be much easier to work with the new code while maintaining legacy code. It will also be easier to delete when making a future major release. If separating deprecated code into its own deprecated file or directory is not pragmatic, modified code must be appended and prepended with a comment which begins `@deprecated`, followed by text which describes the deprecation.
- Deprecated features should log a warning when used by an engineer, stating is deprecated and offering an alternative when there is one. However, only output a warning if the user can take an action to prevent it. Do not log a warning from a component's main entry point (e.g. primary Sass mixin), as this may log an error even if the user is not using the deprecated feature.
- Note deprecations in the component's README file.
- Create a Jira ticket or Github issue to remember to remove the deprecated feature in a future major release. Label the ticket/issue with the component name.

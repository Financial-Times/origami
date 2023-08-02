---
title: Create A New Origami Component - Part 9 Component Lifecycle
description: A step-by-step tutorial which teaches you how to build and deploy a new Origami component.
cta: Learn how to create an Origami component
collection_listing_display: false
collection_id: tutorials
---

# Create A New Origami Component - Part 9 Component Lifecycle

The "Create A New Origami Component" tutorial is split into nine parts and is intended to be followed sequentially from start to finish:

1. [Intro & Boilerplate](/documentation/tutorials/create-a-new-component-part-1/)
2. [Base Styles](/documentation/tutorials/create-a-new-component-part-2/)
3. [Themes & Brands](/documentation/tutorials/create-a-new-component-part-3/)
4. [Demos](/documentation/tutorials/create-a-new-component-part-4/)
5. [JavaScript](/documentation/tutorials/create-a-new-component-part-5/)
6. [Storybook](/documentation/tutorials/create-a-new-component-part-6/)
7. [Testing](/documentation/tutorials/create-a-new-component-part-7/)
8. [Documentation](/documentation/tutorials/create-a-new-component-part-8/)
9. Component Lifecycle

In part nine we will learn how to publish our component to the Origami registry 🎉, and discuss the lifecycle of a published component.

_We don't actually want to publish an example component `o-example`. If you have been following along so far using `o-example`, rather than working on your own component that should actually be published, read this part of the tutorial as a reference only until you're ready to publish a new component for real._

## Source Control

Origami components are stored in the [Origami monorepo](https://github.com/Financial-Times/origami), under the `components` directory. We will start by committing the boilerplate as an initial commit. Our commit messages use a simplified form of [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/). Origami component's release process is automated using commit messages to identify the next version number to release, so it's important to use conventional commits.

<pre><code class="o-syntax-highlight--bash">
[type]: [description]

[body]
</code></pre>

The `type` can be any of `feat`, `fix`, `docs` or `backstage`.

The prefix is used to calculate the version number to release – according to [semver](https://semver.org/#summary) – and the section of the release notes to place the commit message in.

<pre><code class="o-syntax-highlight--bash">
| type      | when to use                         | release level | release note section |
| --------- | ----------------------------------- | ------------- | -------------------- |
| feat      | a feature has been added            | `minor`       | Feature              |
| fix       | a bug has been patched              | `patch`       | Bug fixes            |
| docs      | a change to documentation           | none          | Documentation        |
| backstage | any changes that aren't user-facing | none          | none                 |
</code></pre>

Indicate a breaking change by placing an `!` between the type name and the colon. We will use `feat!` to do an initial release.

<pre><code class="o-syntax-highlight--bash">git add --all
git commit -m 'feat!: create my o-example component'
git push</code></pre>

After pushing your commits you should be able to open a pull request. If you have never open a PR (pull request) you can read more about it in [github documentation](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)

_To be able to opon a PR you will need to be part of [origami collaborators](https://github.com/orgs/Financial-Times/teams/origami-collaborators) team. If you are not a member already ask [#origami-support](https://financialtimes.slack.com/archives/C02FU5ARJ) to help you._

## Subsequent Releases

After the first release Origami components may be released automatically by using conventional commits. You will need to figure out what counts as a breaking change, and what counts as a feature or patch and use correct commit message.

We use [semver specification](https://semver.org/) for new releases. The [semver specification](https://semver.org/) documents what constitutes a major, minor, or patch release. There are also some [Origami specific considerations](/documentation/components/versioning/#how-components-are-versioned) to keep in mind when versioning a component. For example we may opt to release a major version of a component even with a compatible <abbr title="application programming interface">api</abbr> if it includes drastic visual changes.

## Component Lifecycle

As other teams may depend on Origami components its important to follow the [semver specification](https://semver.org/) when versioning components as discussed previously. It is also important to communicate upcoming changes. The Origami specification includes a section on the [component lifecycle](/specification/v1/components/#component-lifecycle) which includes guidance on how to manage existing components as they mature. The guidance includes how to communicate new releases, the deprecation of component features, and the deprecation of components which are no longer needed.

## Wrapping Up

If you have followed along this far congratulations!

We hope this step-by-step tutorial has helped make you feel more able to contribute to Origami. Both in terms of creating new components, maintaining existing components, and influencing the direction of Origami as a whole.

If you have any questions, bug reports, or feature requests please contact the Origami team &#x1F603;. You can find the team on Slack in <a href="https://financialtimes.slack.com/messages/origami-support" target="_blank">#origami-support</a>.

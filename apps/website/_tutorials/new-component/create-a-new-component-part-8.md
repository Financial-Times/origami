---
title: Create A New Origami Component - Part 8 Component Lifecycle
description: A step-by-step tutorial which teaches you how to build and deploy a new Origami component.
cta: Learn how to create an Origami component
collection_listing_display: false

---

# {{page.title}}

The "Create A New Origami Component" tutorial is split into eight parts and is intended to be followed sequentially from start to finish:
1. [Intro & Boilerplate](/docs/tutorials/create-a-new-component-part-1/)
2. [Base Styles](/docs/tutorials/create-a-new-component-part-2/)
3. [Themes & Brands](/docs/tutorials/create-a-new-component-part-3/)
4. [Demos](/docs/tutorials/create-a-new-component-part-4/)
5. [JavaScript](/docs/tutorials/create-a-new-component-part-5/)
6. [Testing](/docs/tutorials/create-a-new-component-part-6/)
7. [Documentation](/docs/tutorials/create-a-new-component-part-7/)
8. Component Lifecycle

In part eight we will learn how to publish our component to the Origami registry 🎉, and discuss the lifecycle of a published component.

_We don't actually want to publish an example component `o-example`. If you have been following along so far using `o-example`, rather than working on your own component that should actually be published, read this part of the tutorial as a reference only until you're ready to publish a new component for real._

## Source Control

The first step of publishing our component is to introduce source control.

Origami components usually use [git](https://git-scm.com/) for source control. Create a new git repository by running `git init`, and commit the boilerplate as an initial commit. For example:

<pre><code class="o-syntax-highlight--bash">git init
git add --all
git commit -m 'my o-example component'</code></pre>

## Push To Github

The second step of publishing our component to the [Origami Registry](https://registry.origami.ft.com/components/) is to commit our work and push to a new Github repository under the [Financial-Times](https://github.com/Financial-Times/) organisation. There is a [new Github repository tutorial](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-new-repository) which might be helpful if you have never created a Github repository before. Note Origami repositories are usually public and open-source unless there is a reason not to be (for example [o-fonts-assets](https://github.com/Financial-Times/o-fonts-assets/) is private due to our font license).

You may then push this to your remote github.com repository, under the `Financial-Times` organisation or another [supported Financial Times organisation](/spec/v1/components/#source-control).

You might have noticed a `.github` directory already. This directory configures Github to give us some nice features including:
- `ISSUE_TEMPLATE.md`: The contents of this file are used to provide a [template when opening a new Github issue](https://help.github.com/en/github/building-a-strong-community/about-issue-and-pull-request-templates). It helps users report bugs or provide feedback by prompting for useful information.
- `CODEOWNERS`: defines individuals or teams to automatically assign to new Github issues or pull requests ([see the Github code owners documentation](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/about-code-owners)).
- `workflows/*`: the workflows directory configures a number of [Github Actions](https://github.com/features/actions) which will automate component testing and release. We'll look at some of these shortly.

There is also some manual Github configuration left to do. When your new component is pushed to Github [update access in the Github settings of your repository](https://docs.github.com/en/github/getting-started-with-github/access-permissions-on-github). Grant these teams the following permissions:
- `@origami-read-only`: **read** - required, for a team of helpful Origami bots
- `@origami-collaborators`: **write** - so engineers from other teams may contribute
- `@origami-core`: **admin** - so Origami team members can help to the fullest

## Github Actions

Earlier we saw that the `obt init` command creates a directory `.github`. It contains configuration for Github including a nested directory `workflows` which contains configuration for Github Actions.

Origami components use Github Actions for a number of helpful functions including:
- Synchronise github [labels](https://github.com/Financial-Times/origami-labels#labels) for issues and pull requests ([learn about Github labels](https://docs.github.com/en/github/managing-your-work-on-github/about-labels)).
- Run component tests when new commits are made to a pull request.
- Automatically release minor and patch updates to developer dependencies given tests pass.
- Add a [semver](https://semver.org/) git tag to release a component when a pull request with a [release label](https://github.com/Financial-Times/origami-labels#continuous-delivery-labels) is merged.
- Build and publish an [npm](https://www.npmjs.com/) package when a release is made with a git tag, so Origami components may be included via [npm](https://www.npmjs.com/)

To see these Github Actions in practise let's release our component.

## Initial Release

Lets release the first version our new component. This will display our component in the Origami Registry and send a Slack notification to `{{site.data.contact.slack}}`.

Our first release will be `1.0.0` following the [semver specification](https://semver.org/). Origami components [do not release versions lower than 1.0.0](/spec/v1/components/#component-release) but you may choose to release a beta `1.0.0-beta.1` again following the [semver specification](https://semver.org/).

Before we release, this is a good time to update the components [support status](/spec/v1/manifest/#supportstatus) in `origami.json` according to whether this release of the component will be `experimental` (the component is not ready for production use), or `active` (feature development ongoing, bug reports will be gratefully received and acted upon promptly), etc.

To release an Origami component create a git tag named after the semver version but beginning with a `v` e.g. `v1.0.0`. Create the tag either through the [Github release interface](https://docs.github.com/en/github/administering-a-repository/managing-releases-in-a-repository) or through the command line:

<pre><code class="o-syntax-highlight--bash">git tag v1.0.0
git push origin v1.0.0</code></pre>

Within a couple of minutes at most, your component should be visible in the [Origami Registry](https://registry.origami.ft.com/components?module=true&active=true&maintained=true&experimental=true) and should be published to the npm registry](https://www.npmjs.com/~the-ft) 🎉. If not you may want to confirm that the `obt test` and `obt verify` commands pass without error, check the output of the Github Actions under the 'Actions" tab, or contact the Origami team for support in the `#{{site.data.contact.slack}}` Slack channel.

## Subsequent Releases

After the first release Origami components may be released automatically by applying one of the Origami labels `release:patch`, `release:minor`, or `release:major` to pull requests (see [Github instructions on applying labels](https://docs.github.com/en/github/managing-your-work-on-github/applying-labels-to-issues-and-pull-requests)). When a pull request is merged with a release label a Github Action will create a new [semver](https://semver.org/) git tag according to which label was used. A comment on the pull request will let you know what version number was released.

<figure>
	<img alt="" src="/assets/images/tutorial-new-component/hello-world-demo-20-github.png" />
	<figcaption>
        This image shows a component pull request which has been merged and released. The `release:patch` label was first added to the pull request. It was then merged. A Github action responded to the release label on merge. It checked the latest release number `v8.1.1` and, as a patch release, calculated the next version should be `v8.1.2`. The Github action then created a new tag `v8.1.2` to release the new version and posted a comment on the pull request.
	</figcaption>
</figure>

The [semver specification](https://semver.org/) documents what constitutes a major, minor, or patch release. There are also some [Origami specific considerations](/docs/components/versioning/#how-components-are-versioned) to keep in mind when versioning a component. For example we may opt to release a major version of a component even with a compatible <abbr title="application programming interface">api</abbr> if it includes drastic visual changes.

## Component Lifecycle

As other teams may depend on Origami components its important to follow the [semver specification](https://semver.org/) when versioning components as discussed previously. It is also important to communicate upcoming changes. The Origami specification includes a section on the [component lifecycle](/spec/v1/components/#component-lifecycle) which includes guidance on how to manage existing components as they mature. The guidance includes how to communicate new releases, the deprecation of component features, and the deprecation of components which are no longer needed.

## Wrapping Up

If you have followed along this far congratulations!

We hope this step-by-step tutorial has helped make you feel more able to contribute to Origami. Both in terms of creating new components, maintaining existing components, and influencing the direction of Origami as a whole.

If you have any questions, bug reports, or feature requests please contact the Origami team &#x1F603;. You can find the team on Slack in <a href="https://financialtimes.slack.com/messages/{{site.data.contact.slack}}" class="o-typography-link--external" target="_blank">#{{site.data.contact.slack}}</a>.

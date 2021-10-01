---
title: Contributing
description: Guidelines on how Origami users can help us improve our components and services.
cta: Learn how you can help

# Navigation config
nav_display: true
nav_label: Contributing
nav_order: 30
---

# {{ page.title }}

Since Origami is largely open source, we welcome contributions from all of our users. There are a number of ways that you can contribute, and we provide tooling and processes to help you do that.

## Creating new components

The <a href="https://registry.origami.ft.com/components/">Origami registry</a> houses components that the Origami team maintains, as well as components that other teams are responsible for.

### Make a proposal
For the Origami team to oversee a component's maintenance, a proposal needs to be made.
You can find information about that process in the <a href="https://github.com/Financial-Times/origami/blob/master/.github/CONTRIBUTING.md" class="o-typography-link--external">origami</a> project board, where all proposals are logged.

After the team have reviewed and accepted the proposal, according to the project guidelines, we will take responsibility for this component and help build and maintain it.

### Build an independent component
As mentioned, not all Origami components are maintained by the Origami team. Anybody can create and share an Origami component. If you would like to build your own component see the [Create A New Origami Component tutorial](https://origami.ft.com/docs/tutorials/create-a-new-component-part-1/). Before you get started, it’s a good idea to discuss your new component with the Origami team first. The team will be able to make sure there’s not an existing component or component proposal that fulfils the same purpose, and will be available to answer any questions.

## Updating existing components

If there is a new feature, a bug fix or anything else missing from a component that you might need, you can:

- open an issue on the components' repository
- make the change the component yourself and open a PR
- contact the team for support

### Opening an issue

Each component has its own Github repository with issues. For example see [o-table issues](https://github.com/Financial-Times/o-table/issues). Issues are important for Origami, as they provide a place for us to track discussions about changes to components. They allow us to reference past discussions and inform future decisions, and help to stop us from talking about the same thing multiple times.

If there is a change you would like to see but you are not familiar with Github please contact the Origami team to discuss, otherwise a Github issue is a good place to start. We appreciate a detailed description of the problem and your reasoning. Our components have Github issue templates that help us get to the root of the problem, but feel free to be liberal in your explanations and examples when opening a new issue.

### Working on a component

If you've chosen to make changes to a component directly please feel free to contact the Origami team with any questions. To get started you'll need to use the [Origami Build Tools](https://github.com/Financial-Times/origami-build-tools#readme). In addition to building the scaffolding for a component, these command-line tools enable us to install dependencies, build demos locally, test our work and more. The [Create A New Origami Component tutorial](https://origami.ft.com/docs/tutorials/create-a-new-component-part-1/) covers these topics.

We provide details on what commands to use for `obt` in its <a href="https://github.com/Financial-Times/origami-build-tools#readme" class="o-typography-link--external">documentation</a>

When everything is right, open a <abbr title="Pull request">PR</abbr> with your changes to the component.

We appreciate details about your changes and screenshots to illustrate them, where relevant. Make sure to request a review from `Financial-Times/origami-core`, which will notify all members of the Origami team, and we'll take a look at it!

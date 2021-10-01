---
title: Origami Newsletter, May 2020
description: This issue features a big Fastly cost saving, new font formats, and a major release of Origami Build Tools.
author: Lee Moody
tags:
  - Newsletter
---

<abbr title="Too long; didn't read">
	<strong>
	TL;DR:
	</strong>
</abbr> {{page.description}}

## Top Things

These are some of the bigger things we've done over the last month.

### Fastly Cost Saving

This month we updated our Fastly configuration for the Origami Build Service and Origami Image Service. Our new Fastly contract meant that our previous architecture was no longer good from a cost perspective (it used to be fine with our old contract).

With the update we're saving ~£5,000 per month.

Thank you Sam Parkinson for calculating the cost saving and helping this work get prioritised.

### A New Font Format

We made all our fonts available in the `woff2` format, which has a [much smaller file size compared to the original](https://github.com/Financial-Times/o-fonts-assets/pull/19#issue-422025287) `woff` format.

This will help improve the performance of so many of our sites including ft.com, Specialist Titles, internal products and tools.

As we helped fix a [double font loading bug on ft.com](https://github.com/Financial-Times/dotcom-page-kit/pull/826) at the same time, we don't have statistics on how much the new font format improved the performance of ft.com for our readers. But both updates together made a huge improvement:

- Visually complete: 8% faster
- DOM content loaded: 17% faster
- Total page size: 18% smaller

Big thanks to Nick Colley for making the suggestion that we include `woff2`; and for helping us deploy the updates quickly to Customer Products projects!

### Origami Build Tools v10

We released another major of Origami Build Tools. This release includes some significant maintenance work updating a number of outdated or deprecated dependencies. But more excitingly we've made improvements to the workflow for component maintainers too 🎉

_If you contribute to Origami components or your team actively maintains one we recommend upgrading to v10. Please let us know if you have any issues or feedback._

#### Simplified Interface

To help engineers new to Origami components get up and running with component development we simplified the most common command. To start working on a component with Origami Build Tools it was common to run the following command:

```
obt demo --run-server --watch --verbose
```

That's a lot of options to understand at first. Instead we simplified this to:

```
obt develop
```

If you've never used Origami Build Tools before and would like to understand what this command does, [see the Origami Build Tools readme](https://github.com/Financial-Times/origami-build-tools#usage).

#### Speed Improvements

Origami Build Tools now compiles component code faster. It's an important metric for Origami Build Tools as it helps keep the feedback loop short between an engineer making a code change and seeing the result of that change.

As an unscientific example on an FT MacBook Pro laptop: the quickest of three [o-table](https://github.com/Financial-Times/o-table) demo builds is 2.18 seconds over 4.11 seconds -- around a 53% improvement.

We improved the performance of Origami Build Tools by creating two new packages:
- [Financial-Times/scrumple](https://github.com/Financial-Times/scrumple#scrumple): a fast (and scrappy) JavaScript bundler for developing Origami components, based on a now-deleted tool called Pax.
- [Financial-Times/sass](https://github.com/Financial-Times/sass): Prebuilt [dart-sass](https://github.com/sass/dart-sass) binaries available via NPM.

## Special Thanks

This month our special thanks goes to Rowan Manning! In case you missed the news, at the start of May Rowan moved from the Origami team (O&R) to Customer Products. So a big thank you to Rowan for all their work on and leading Origami over the years 😃. Jake Champion is the stand-in Tech Lead, if you have questions about Origami please contact them instead of Rowan.

## Broader Update

A digest of other things that have happened since our last update:

- MAJOR: [Financial-Times/origami-bower-registry](https://github.com/Financial-Times/origami-bower-registry). Upgrade to node 12, drop support for previous versions.
- NEW: [Financial-Times/origami-workshop](https://github.com/Financial-Times/origami-workshop): We created a small tool to help attendees of the Intro to Origami workshop complete [the manual build tutorial](/docs/tutorials/manual-build/). The tool helps attendees focus on building projects with Origami components, instead of setting up build tools which may differ depending on their team.
- NEW: [Financial-Times/stylelint-config-origami-component](https://github.com/Financial-Times/stylelint-config-origami-component): We migrated all our components to use [stylelint](https://stylelint.io) for Sass linting. The previous project we depended on was long since abandoned.
- MINOR: [Financial-Times/o-typography](https://github.com/Financial-Times/o-typography): The latest version includes woff2 fonts, as discussed previously.
- MINOR: [Financial-Times/create-origami-component](https://github.com/Financial-Times/create-origami-component): Updates component boilerplate to make it easier to create new origami components. Adds `.eslintrc.js` and `.stylelintrc.js` configuration, and includes our new Github Actions.
- MINOR: [Financial-Times/polyfill-library](https://github.com/Financial-Times/polyfill-library): Updates the `Intl.PluralRules` polyfill to deliver to Edge <18 (another thanks to an external contributor, Github user glsignal).
- MINOR: [Financial-Times/origami-screencap-service](https://github.com/Financial-Times/origami-screencap-service): We're a small team that have to prioritise work carefully, so we decided to decommission the origami-screencap-service this month. It was a 10% project which allowed us to capture screenshots of any website. Please let us know if this service would be useful to your team, and we'll consider reviving it with a support policy.
- MINOR: [Financial-Times/o-share](https://github.com/Financial-Times/o-share): With the help of the design team, we updated o-share to be inline with the style used on our article pages. For example, o-share now supports icon labels and has no margin at larger sizes. This helps design consistency across projects and allowed us to remove custom overrides from the article page.
- MINOR: [Financial-Times/origami-component-converter](https://github.com/Financial-Times/origami-component-converter): this project helps us process Origami components ready to be published to npm. It used a static last of components before but now uses Origami Repo Data to get the latest list of components dynamically. That's one less thing to think about when creating a new component!
- PATCH: [Financial-Times/o-meter](https://github.com/Financial-Times/o-meter): Fixes styling for Chrome 83 and the latest version of Microsoft Edge.
- MAJOR: [Financial-Times/origami-ci-tools](https://github.com/Financial-Times/origami-ci-tools): We updated our CI tools to use the latest version of Origami Build Tools, which will speed up the testing and deployment or Origami components. We also fixed some bugs related to publishing packages without namespaces or with names that differ from the repository name.
- PATCH: [Financial-Times/origami-build-service](https://github.com/Financial-Times/origami-build-service): Documentation fixes.
- PATCH: [Financial-Times/origami-website](https://github.com/Financial-Times/origami-website): We're always improving our documentation, spec, and tutorials. This month we made quite a few changes representing feedback from workshops and our work on our build tools.
- PATCH: [Financial-Times/origami-image-service](https://github.com/Financial-Times/origami-image-service): as well as the money saving Fastly work discussed previously, we updated the Image Service to convert png image to jpeg if the image has no alpha channel (no transparency). Doing so should result in smaller images, slightly lower storage costs for us, and help keep our sites and apps quick to load for readers.
- PATCH: [Financial-Times/origami-registry-ui](https://github.com/Financial-Times/origami-registry-ui): as Origami Build Tools primary focus is building components not projects, we no longer use Origami Build Tools to build the front end of the registry. Instead we run [a few npm scripts](https://github.com/Financial-Times/origami-registry-ui/blob/c24c85a146ecec9acf4c3fd4b121a5badd0ba034/package.json#L27).
- PATCH: [Financial-Times/o-syntax-highlight](https://github.com/Financial-Times/o-syntax-highlight): o-syntax-highlight no longer errors when a code tag has other CSS classes. In addition it does not error if a a code block has no language defined, as this may prevent other code blocks that are correct from highlighting, instead it provides a warning in the console.
- PATCH: [Financial-Times/o-quote](https://github.com/Financial-Times/o-quote): We updated the o-quote documentation with usage descriptions from the design team (thanks Josh Wade).
- PATCH: [Financial-Times/sass](https://github.com/Financial-Times/sass): We added a missin a build for linux-musl-x64.
- PATCH: [Financial-Times/o-grid](https://github.com/Financial-Times/o-grid): The snappy mode of o-grid has been deprecated. We updated the deprecation notice to output less, once per Sass entry point (warnings should be helpful not annoying).
- PATCH: [Financial-Times/origami-image-service](https://github.com/Financial-Times/origami-image-service): as well as the money saving Fastly work discussed previously, we updated the Image Service to convert png image to jpeg if the image has no alpha channel (no transparency). Doing so should result in smaller images, slightly lower storage costs for us, and help keep our sites and apps quick to load for readers.
- PATCH: [Financial-Times/origami-registry-ui](https://github.com/Financial-Times/origami-registry-ui): as Origami Build Tools primary focus is building components not projects, we no longer use Origami Build Tools to build the front end of the registry. Instead we run [a few npm scripts](https://github.com/Financial-Times/origami-registry-ui/blob/c24c85a146ecec9acf4c3fd4b121a5badd0ba034/package.json#L27).
- PATCH: [Financial-Times/o-comments](https://github.com/Financial-Times/o-comments): Style changes to increase the scan-ability of comment replies (credit to Glynn Phillips and the Content Innovation team!)
- All Components: We added our new stylelint configuration to each Origami component, so engineers may get immediate feedback in their editor when authoring component Sass instead of having to run the Origami Build Tools verify command.
- All Components: We configured all our components to automatically approve and merge development dependency updates when made by Dependabot (during work hours). This saves us manually doing this work for ~90 repositories so we can focus on more important tasks.
- All Components: We added a Github Action to apply the Origami type label to new issues, to help us manage incoming work for components, services, and other project types.

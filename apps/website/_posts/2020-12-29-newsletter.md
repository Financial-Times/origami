---
title: Origami Newsletter, December 2020
description: false
author: chee
tags:
- Newsletter
---

## Top things

Some of the bigger Origami news from the last month:


### Mission and Vision Statements

Looking back over the 7 years of the team and project, we wrote a new mission statement for Origami.

We've posted them on the website here: https://origami.ft.com/docs/principles/vision-and-mission/

#### Mission

> Unifying and documenting the style and experience across the digital products of every FT brand, leveraging the web platform to provide an implementation of the brand guidelines.

We want to ensure our mission statement expresses that Origami is for every person and every product in the whole FT Group.

#### Vision

> Every designer and developer in the FT knows how to use Origami, feels they have the agency to contribute to Origami and that they are an owner of Origami.
>
> Origami is the gold standard of design systems and every FT designer and developer’s favourite way to create digital products.

In Terry Pratchett's Hogfather, Death says "HUMANS NEED FANTASY IN ORDER TO BE HUMAN. TO BE THE PLACE WHERE THE FALLING ANGEL MEETS THE RISING APE". At the Strata Data Conference in 2019, Cait O'Riordan said it's important to find your North Star.

A vision statement is like that. It's where we want to be, it helps guide our choices so that one day it might be where we are.

Right now our focus is on making Origami feel like a project owned by everyone, something everyone wants to use.

We're still some ways off, but we're looking forward.


### An end-of-year clean up

This month we closed around 700 issues on Origami projects on GitHub. It's the first time we've had fewer than 300 things on our team todo list. We'll continue to reduce that number, making it easier to plan our time.

🧹

We have also archived the project `o-gallery`, which was no longer in use and had not received updates in some time. We hope to replace it with a new [carousel component](https://github.com/Financial-Times/origami/issues/23) in the coming year.


### A plan for the year ahead

Work continues on the proposal to modernise Origami by dropping support for [bower](https://bower.io/) and shipping our components only via [npm](https://www.npmjs.com/).

Our current roadmap has us deprecating our bower components at the end of Q2, and putting them in maintenance mode for a year.


## Special thanks

Thank-you everyone for helping each other make it through this year.

[Happy new year.](https://www.youtube.com/watch?v=FmuswTEGF-U)

## Broader update

A digest of other things that have happened this month:


- [Financial-Times/polyfill-service](https://github.com/Financial-Times/polyfill-service)

   - RangeError: Malformed unicode_language_subtag on Intl polyfill

   - Add Intl.Locale and other Intl.* Polyfills

   - [Bug] Chrome/49 - Cannot redefine property: hasInstance

   - [feature] missing String.replaceAll polyfill

   - [Bug] Chrome/49 - Cannot redefine property: isConcatSpreadable

   - Feature Request: list popular polyfills

   - Enable The 'unicorn/no-reduce' rule

   - enable unicorn/no-reduce

- [Financial-Times/polyfill-library](https://github.com/Financial-Times/polyfill-library)

   - Update smoothscroll detect logic

   - Allow getters and setters to be set to undefined and not throw an error

   - fix test polyfill timeout

   - compress test server responses and add test matrix with partial retries

   - fix linter errors

   - TypedArray polyfills are included for every browser target

   - Update targeting for TypedArray polyfills

   - Update yaku version to v1.0.0

   - Feature Request: Navigator.permissions API polyfill?

   - make sure errors contain useful messages

   - Add ability to generate sourcemaps

   - rel=preload support?

   - Feature Request - Add Dialog polyfill

   - [feature-request] lazy loading support

   - [feature-request] Proxy polyfill

   - [Feature Request] Given a browser matrix, output the suite of polyfills per browser for every version that satisfies the matrix

   - add "es2015" to the aliases of String.fromCodePoint

   - update polyfill configs for edge 79 + a few corrections

   - fix Symbol.prototype.description

   - Fetch polyfill is no longer spec compliant

   - Reflect fixes

   - Array fixes

   - isolate test runs with and without polyfill combinations

   - fix URL polyfill by no longer overwriting it in the Blob polyfill

   - fix StringIndexOf

   - Object fixes

   - WeakMap fixes

   - fix unterminated polyfills.

   - Serve DOMRect polyfill to Edge versions < 79

- [Financial-Times/origami-image-service](https://github.com/Financial-Times/origami-image-service)

   - Update troubleshooting section for SVGs to mention it applies to all SVG requests

   - Custom schemes (not including ftcms) should use cloudinary upload instead of fetch

   - Consider using quality:auto

   - Use the explicit API to clear the cache

   - Missing source attribute in prefilled form without image url

   - only delete formData.source if we set it

   - Make the purging endpoint also purge from cloudinary

- [Financial-Times/polyfill-library-node](https://github.com/Financial-Times/polyfill-library-node)

   - Add missing Origami GH Actions and labels

   - Add codeowners, issue template and publishing step

- [Financial-Times/origami-build-service](https://github.com/Financial-Times/origami-build-service)

   - Error if no brand query parameter

   - Backport conflicts work to Build Service v2

   - Feature: add support for spec v2 origami components

   - Issue: ESM module support

   - Error if no source query parameter

   - Disable adding Babel polyfills by default

   - Add v3/files endpoint

   - Do not crash the app if the NPM cache fails to prime.

   - Error page for conflicts is hard to read

   - Wrap error messages in `pre` instead of `p`

   - Add middleware to ensure all requested Origami modules are built using the same Origami Specification version

   - Update website to use o-layout and add v3 endpoints for bundling

- [Financial-Times/origami-imageset-data](https://github.com/Financial-Times/origami-imageset-data)

   - Migrate from CircleCI to GitHub Workflows

- [Financial-Times/origami-labels](https://github.com/Financial-Times/origami-labels)

   - turn off github-label-sync action's deletion of unknown labels

   - Allow arbitrary labels to be added

   - proposal: add an accessibility label

   - add an accessibility label

- [Financial-Times/origami-website](https://github.com/Financial-Times/origami-website)

   - Add the mission and vision statements to the front page

   - Add mission and vision statements to the homepage

   - Add Origami type

   - Avoid "we"/"let's" in tutorials?

- [Financial-Times/origami-build-tools](https://github.com/Financial-Times/origami-build-tools)

   - Bump remark-preset-lint-origami-component version

   - Tidy up test output

   - Automatically run verify before test

   - Require component lint configuration

   -  Only lint files if the component itself contains linting config for those file types

   - pass through the ignore bower flag when building the pa11y demo

- [Financial-Times/remark-preset-lint-origami-component](https://github.com/Financial-Times/remark-preset-lint-origami-component)

   - Remove whitespace from action name

   - Correct package.json version.

   - Add publish to npm workflow

- [Financial-Times/polyfill-useragent-normaliser](https://github.com/Financial-Times/polyfill-useragent-normaliser)

   - move to github actions

   - Move the circleci jobs into github workflows

- [Financial-Times/origami-registry-ui](https://github.com/Financial-Times/origami-registry-ui)

   - Update to npm 7

   - fails to deploy to staging due to a dart-sass shell bug

   - Improve Origami service discoverability

   - Replace origamiType checkboxes with radio buttons

   - Show radio buttons for origamiType instead of checkboxes

   - Work out how we display whether a version of a component builds or not

   - Investigate unreliable demo iframe resizing

   - include services in the default search filter

- [Financial-Times/o-fonts](https://github.com/Financial-Times/o-fonts)

   - Map the `light` font weight to `300`

   - Map a "light" font weight to `300 instead of `200`

- [Financial-Times/origami-brand-images](https://github.com/Financial-Times/origami-brand-images)

   - Can we deprecate this?

   - Deprecate the image set as it is not being used anymore

- [Financial-Times/o-gallery](https://github.com/Financial-Times/o-gallery)

   - Is not silent mode by default (scss)

   - Component redesign

- [Financial-Times/js-features-analyser](https://github.com/Financial-Times/js-features-analyser)

   - How to use with browserlist and a polyfill library

   - Data source of global-static-instance.json

- [Financial-Times/o-buttons](https://github.com/Financial-Times/o-buttons)

   - Right align button icons

- [Financial-Times/o-editorial-layout](https://github.com/Financial-Times/o-editorial-layout)

   - style nested `strong`, `em`, `sup`, `sub` tags within `p` tags.

   - Improve adoption of `o-editorial-layout`.

- [Financial-Times/o-teaser-collection](https://github.com/Financial-Times/o-teaser-collection)

   - o-teaser-collection

- [Financial-Times/origami-navigation-data](https://github.com/Financial-Times/origami-navigation-data)

   - ACC-764 Revert "Revert "ACC-764 add Contact Us to footer""

   - Revert "ACC-764 add Contact Us to footer"

   - ACC-764 add Contact Us to footer

   - Add Work & Careers in place of Graphics

   - remove graphics link from top level navigation

- [Financial-Times/o-ads-embed](https://github.com/Financial-Times/o-ads-embed)

   - Remove unnecessary heavy ads monitoring

   - Attempt to monitor heavy ad interventions by Chrome

- [Financial-Times/origami-specialist-title-logos](https://github.com/Financial-Times/origami-specialist-title-logos)

   - Deprecate `brand-live-ft-logo`

   - Deprecate brand-live-ft-logo

- [Financial-Times/origami-image-set-tools](https://github.com/Financial-Times/origami-image-set-tools)

   - test on node 10, 12 and 14

- [Financial-Times/o-topper](https://github.com/Financial-Times/o-topper)

   - Stop changing background wheat to `oColorsMix($color: 'wheat', $percentage: 40)`

   - Currently fails pa11y tests

- [Financial-Times/github-label-sync](https://github.com/Financial-Times/github-label-sync)

   - Add an option to run for all repositories in a user or organisation

   - Merging labels doesn't seem to work

- [Financial-Times/o-video](https://github.com/Financial-Times/o-video)

   - oVideo to support slot level override of config (mix and match global + data attribute config)

   - We should track buffering events

   - Track `waiting` event

   - iOS doesn't like firing progress events

   - Move o-video advertising code to o-ads

- [Financial-Times/o-icons](https://github.com/Financial-Times/o-icons)

   - Add o-icon-small-icon classes

- [Financial-Times/o-forms](https://github.com/Financial-Times/o-forms)

   - Add better error styles for whitelabel brand in inverse mode

   - Add support for inverse form fields and error messaging

   - Add inverse form support for radios, checkboxes and error states and summaries

   - Improve radio box input given long labels

- [Financial-Times/o-overlay](https://github.com/Financial-Times/o-overlay)

   - Expose the overlay instance on the `oOverlay.ready` event

   - Expose overlay on the ready event detail

   - Remove any characters that aren't valid when generating a heading id.

   - Remove non-ascii alphanumericals when generating heading id

   - Jumping around on iPad

- [Financial-Times/o-tracking](https://github.com/Financial-Times/o-tracking)

   - Question - use of data-trackable with <a> where target is blank

- [Financial-Times/o-share](https://github.com/Financial-Times/o-share)

   - Possible to include sticky behaviour

   - fix the demos so they compile for the internal brand

- [Financial-Times/o-tooltip](https://github.com/Financial-Times/o-tooltip)

   - Add an option to hide when leaving hover

- [Financial-Times/origami](https://github.com/Financial-Times/origami)

   - Enforce accessibility best practices by making some parameters mandatory

   - Expose current release number to the component's own code

   - A Carousel component

   - Provide a way to express that a component is safe to be used with any brand.

   - Review how we manage and deploy component specifc assets

   - Make our whitelabel components easier to theme for build service users

   - Autocomplete

   - New Component: Tag Input

   - feedback component

   - A slider component

   - Opting elements into dark mode via a parent selector

   - Proposal: perform a review of the Origami spec

   - Proposal: npm-only origami components

- [Financial-Times/origami-repo-data](https://github.com/Financial-Times/origami-repo-data)

   - Support NPM(only) Components

   - Add an `origamiVersion` filter to the repos endpoint.

   - Add origami version to version entity

   - Update test expectations for a peer dependency

   - Add `isPeer` to the Dependency Entity.

- [Financial-Times/o-toggle](https://github.com/Financial-Times/o-toggle)

   - Provide the ability to switch the button text at the same time as the display

- [Financial-Times/o-message](https://github.com/Financial-Times/o-message)

   - Correct access annotation

- [Financial-Times/o-meter](https://github.com/Financial-Times/o-meter)

   - Add pa11y demo to tested demos

   - Fix pa11y demo

   - Add back the pa11y demo

- [Financial-Times/origami-ci-tools](https://github.com/Financial-Times/origami-ci-tools)

   - Run pa11y against all supported brands

   - Stop building the pa11y demo separately as obt test builds the pa11y demo now
- Make getDataAttributes ignore data attributes which are not in the component's namespace

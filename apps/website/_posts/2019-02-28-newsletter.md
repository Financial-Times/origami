---
title: Origami Newsletter, Feburary 2019
description: This issue features Origami on npm, a new major release of o-layout, and a new major release of o-header-services.
author: Lee Moody
tags:
  - Newsletter
---

**TL;DR:** This issue features Origami components on npm; the release of o-layout v3, which includes two new layouts to help build internal tools and products; and the release of o-header-services v3, which includes new features, customisation, and a lot of code improvements.


## Top three things

These are some of the bigger things we've worked on or released over the last month.

### Origami Components On NPM

Origami components are now available on the npmjs registry as well as the bower registry. This will help teams who have difficulty using bower in their projects. [Our guide](/docs/tutorials/bower-to-npm) shows how to move a project from bower to npmjs. Outside Origami, it looks like the apps team are going to be the first to migrate a project. Good work!

If you have any queries/questions, the Origami team are ready to help.

### New major version: o-layout

o-layout provides page layouts and typography as a starting point to create internal tools or products. In addition to the documentation layout we already had, v3 introduces a “query” layout for search and filter pages; and a “landing” layout for homepages or category pages. You can view <a href="https://registry.origami.ft.com/components/o-layout">demos for o-layout</a> in the Origami registry.

### New major version: o-header-services

o-header-services is a component currently used by many of our tools, both internal and customer facing, to aid navigation. The new major release follows the beta we announced last issue. It reduces code complexity (both internally and from an Origami user's perspective); introduces optional dropdowns for larger navigation structures; and it is now customisable so our specialist titles may choose to make the most of o-header-services. Big thanks to Tom Dew, Carina Huse, Alex Wilson, and the rest of the team at BlueTel for their time and feedback. <a href="https://registry.origami.ft.com/components/o-header-services">Demos and a migration guide</a> are available via the Origami Registry.


## Special thanks

Special thanks to the Enhanced Experience team who have bought <a href="https://registry.origami.ft.com/components/o-table">o-table</a> to ft.com and the app. Editorial are now able to add tables to stories which are sortable, expandable, and responsive. In no particular order, thanks again to: Emily Quinn, Peter Clarke, Terry Roberts, Gabor Ottlik, Ludovic Robin, Umberto Babini, Luke Kavanagh, and to the apps team for their support. 👏

## Broader update

A digest list of other things that have happened over the last month.

  - MINOR: To publish them to NPM, we released a minor of **all** components supported by Origami (well done Chee Rabbits and Jake Champion 🙌). Plus some widely used components which other teams maintain such as o-subs-card, o-audio, o-ads (shout out to the ads team for their support).
  - MAJOR: <a href="https://registry.origami.ft.com/components/o-date@3.0.0">o-date v3.0.0</a> was released, which removes the ability to use o-date server side. We created the npm package "@financial-times/ft-date-format" as a drop-in replacement <a href="https://github.com/Financial-Times/o-date#migrating-from-v2-to-v3" class="o-typography-link--external">migration guide</a>.
  - MAJOR: <a href="https://registry.origami.ft.com/components/o-teaser@3.2.1">o-teaser v3.2.1</a> was released, which upgrades to to the latest version of o-labels (<a href="https://registry.origami.ft.com/components/o-teaser@3.2.1/readme#upgrade-from-v2xx-to-v3xx">migration guide</a>). The v3 release was quickly followed by other releases which add a speaker icon to audio teasers, and a style improvement for teasers with no tag (thanks to Dawn Budge and Liam Keaton for this).
  - MAJOR: <a href="https://registry.origami.ft.com/components/o-forms@6.0.0">o-forms v6.0.0</a> was released, which upgrades to to the latest version of o-loading (<a href="https://registry.origami.ft.com/components/o-forms@6.0.0/readme#upgrade-from-v5xx-to-v6xx">migration guide</a>).
  - MINOR: <a href="https://registry.origami.ft.com/components/o-table@7.2.1">o-table v7.2.1</a> was released, improving sort and expander performance, and adding a new utility class to apply margin below tables.
  - MINOR: <a href="https://registry.origami.ft.com/components/o-typography@5.10.0">o-typography v5.10.1</a> was released, adding whitelabel brand customisation for specialist titles and fixing the icon colour of custom external links. It also addresses deprecation warnings from dart-sass.
  - MINOR: <a href="https://registry.origami.ft.com/components/o-autoinit@1.5.0">o-autoinit v1.5.0</a> was released, removing support for IE8 and below (which will reduce our JS bundle sizes).
  - MINOR: <a href="https://registry.origami.ft.com/components/o-colors@4.8.4">o-colors  v4.8.4</a> was released, removing some of our more overbearing Sass warnings 🎉.
  - MINOR: <a href="https://registry.origami.ft.com/components/o-tooltip@3.4.0">o-tooltip  v3.4.0</a> was released, which removes the use of deprecated colour usecases and adds support for internal and whitelabel brands.
  - MINOR: <a href="https://registry.origami.ft.com/components/o-overlay@2.6.2">o-overlay v2.6.2</a> adds support for the whitelabel brand.
  - MINOR: <a href="https://registry.origami.ft.com/components/o-layers@2.1.0">o-layers v2.1.0</a> removes o-dom as a dependency to use built-in browser functions instead and reduce bundle sizes.
  - MINOR: <a href="https://registry.origami.ft.com/components/o-tabs@4.3.1">o-tabs v4.3.1</a> also removes o-dom as a dependency.
  - MINOR: <a href="https://registry.origami.ft.com/components/o-techdocs@7.0.10">o-techdocs v7.0.10</a> deprecates o-techdocs. We recommend <a href="https://registry.origami.ft.com/components/o-layout">o-layout</a> instead.
  - MINOR: <a href="https://registry.origami.ft.com/components/o-hoverable@3.2.1">o-hoverable v3.2.1</a> deprecates o-hoverable. We recommend the <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover" class="o-typography-link--external">hover media query</a> instead.
  - MINOR: <a href="https://registry.origami.ft.com/components/o-hierarchical-nav@5.1.1">o-hierarchical-nav v5.1.1</a> deprecates o-hierarchical-nav. We recommend <a href="https://registry.origami.ft.com/components/o-header-services">o-header-services</a> instead.
  - MINOR: <a href="https://registry.origami.ft.com/components/o-labels@4.2.2">o-labels v4.2.2</a> adds a content mixin so labels may be output where o-label CSS classes cannot be used, e.g. within other components.
  - MINOR: <a href="https://registry.origami.ft.com/components/o-banner@2.2.23">o-banner v2.2.23</a> removes deprecated uses of "oButtonsCustomTheme".
  - MINOR: <a href="https://registry.origami.ft.com/components/o-teaser-collection@2.3.1">o-teaser-collection v2.3.1</a> addresses dart-sass deprecation warnings.
  - MINOR: <a href="https://registry.origami.ft.com/components/o-message@3.1.1">o-message v3.1.1</a> addresses dart-sass deprecation warnings.
  - MINOR: <a href="https://registry.origami.ft.com/components/o-header@7.8.3">o-header v7.8.3</a> addresses o-color deprecation warnings.
  - MINOR: <a href="https://registry.origami.ft.com/components/o-video@5.1.1">o-video v5.1.1</a> fixes an issue which prevented o-videos building with dart-sass, and also adds named exports in addition to the default export.
  - MINOR: <a href="https://registry.origami.ft.com/components/o-buttons@5.16.2">o-buttons v5.16.2</a> fixes a bug which prevented o-buttons building with dart-sass.
  - MINOR: <a href="https://registry.origami.ft.com/components/o-grid@4.5.1">o-grid v4.5.1</a> enables named exports as well as the default object <a href="https://github.com/Financial-Times/o-grid/issues/177" class="o-typography-link--external">(see issue)</a>. Thanks Chee Rabbits!
  - MINOR: <a href="https://registry.origami.ft.com/components/node-health-check@1.7.0">node-health-check v1.7.0</a>, new options to check an API that requires authentication (credit to Kiya Gurmesa for this one), plus documentation improvements (nice one, James Loveridge & Charlie Briggs)
  - MINOR: <a href="https://github.com/Financial-Times/polyfill-library/releases" class="o-typography-link--external">polyfill-library v3.30.1</a> now minifies feature detection JS and a fix to support online IDEs such as <a href="https://repl.it/" class="o-typography-link--external">repl.it</a> (credit to Kate Beard, who is currently bootcamping with Origami). Plus <a href="https://github.com/Financial-Times/polyfill-library/releases" class="o-typography-link--external">multiple other minor releases</a> this month have updated and added new polyfills (Jake Chamion 💪). Including, but not limited to:
    - Array.prototype.flat
    - Array.prototype.flatMap
    - Object.isExtensible
    - Object.isFrozen
    - Object.isSealed
    - Object.preventExtensions
    - Object.seal



*[TL;DR]: too long; didn't read

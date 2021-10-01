---
title: Origami Newsletter, July 2021
description: New introduction to Origami sessions and special thanks.
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

Here's a belated July update for you – it's the holiday season! ☀️

We're reaching the end of our [move from Bower to npm](https://origami.ft.com/blog/2021/01/18/deprecating-bower-and-origami-via-npm/), a significant piece of work. Our focus now is on loose ends, bug fixes, and [supporting teams across the organisation through the migration guide](https://origami.ft.com/blog/2021/07/01/origami-on-npm-and-how-to-migrate/). But we're also working on proposals for our next big project(s) – focused on reducing technical complexity, increasing cross-group collaboration, and supporting new product development (super exciting, watch this space).

If you have any feedback or questions about the Bower to npm migration please let us know in our [#origami-support](https://financialtimes.slack.com/messages/origami-support) Slack channel or with an email to origami.support@ft.com.

### New Introduction To Origami Sessions

We’ve scheduled new Introduction To Origami Sessions ✨

The first session is useful for anyone who works in Product and Technology – we cover things at a high level rather than diving into too many technical details. Come along if you’d like to learn more about Origami projects, their goal, the team, and how to get involved.

- Origami History
- Origami Components
- Origami Services
- Origami Collaboration

A second session explores components in more depth and includes technical details. It will be of particular interest to engineers and designers, although anyone is welcome:

- Documentation
- Languages & Tools
- Structure
- Versioning
- Origami Build Service / Manual Build

If you’d like to hang back at the end to put some of what we learn into practice there will be an opportunity to run through a practical tutorial with some of the team on hand to answer any questions (optional)

We'll be running the sessions Tuesday, 17th August from 10:30am (London time). Ask for an invite in the [#origami-support](https://financialtimes.slack.com/messages/origami-support) Slack channel or with an email to origami.support@ft.com. 🙌

## Special Thanks

Our special thanks this week goes to the Operations & Reliability team! The team have been working through the [Bower to NPM / Build Service v3 migration](https://origami.ft.com/blog/2021/07/01/origami-on-npm-and-how-to-migrate/) and have been very helpful by asking questions, raising any issues, and giving feedback along the way. Thanks for helping us improve the migration experience for other teams 🎉

## Broader Update

A digest of other things that have happened this month:

- DEPRECATED: [o-layers](https://github.com/Financial-Times/o-layers) was not widely used and therefore did not meet its aim of managing the z-index between components and projects. There is no direct replacement for `o-layers`. Instead fire component specific events to indicate that a new "layer" such as an overlay has been opened.
- DEPRECATED: [origami-navigation-data](https://github.com/Financial-Times/origami-navigation-data) has been merged with [origami-navigation-service](https://github.com/Financial-Times/origami-navigation-service) to reduce the complexity of our technical estate and speed up the release of changes to ft.com's navigation.
- DEPRECATED: [scrumple](https://github.com/Financial-Times/scrumple) was helpful when we needed to build bower components, but those days are now behind us. We recommend trying [esbuild](https://esbuild.github.io/) instead.
- MAJOR: [o-footer](https://github.com/Financial-Times/o-footer) introduces a new layout to support new Community & Events links (thanks for your work on this Ahmad Youssef and Max Bladen-Clark).
- MINOR: [o-autocomplete](https://github.com/Financial-Times/o-autocomplete) has had a number of features enabled to support suggestions with more complex data structures and provide a callback function to action a users selection (thanks for the feedback and review Oliver Turner).
- MINOR: [o-table](https://github.com/Financial-Times/o-table) based on feedback we've improved the demos and documentation for filterable tables; and we've added support for sorting tables with multiple header rows (thanks for raising and helping build a fix Emma Lewis).
- MINOR: [origami-build-service](https://github.com/Financial-Times/origami-build-service) has received a number of bug fixes and improvements since the release of v3 last month, including an improved ["url updater" migration guide](https://www.ft.com/__origami/service/build/url-updater).
- MINOR: [polyfill-library](https://github.com/Financial-Times/polyfill-library) received a number of updates (thanks to our open source contributors!)
    - Fixed a bug where iOS 12 and above would be detected as iOS 11 and we would over-polyfill the browser.
    - Updated `URL.prototype.toJSON` to now serve to Safari <12 and Edge <18.17134
    - Added `MediaQueryList.prototype.addEventListener` and `MediaQueryList.prototype.removeEventListener`.
    - Added `Intl.DateTimeFormat.~timeZone.all` and `Intl.DateTimeFormat.~timeZone.golden`. The two polyfills can be used to load time-zone data into the `Intl` polyfills - more information can be found at [formatjs.io](https://formatjs.io/).
- PATCH: [js-features-analyser](https://github.com/Financial-Times/js-features-analyser) fixes a bug where analysing code with destructing assignment would error (thanks to our open source contributors!)
- PATCH: [o-colors](https://github.com/Financial-Times/o-colors), [o-forms](https://github.com/Financial-Times/o-forms), and [o-fonts](https://github.com/Financial-Times/o-fonts) have updated migration guides based on feedback.
- PATCH: [o-tracking](https://github.com/Financial-Times/o-tracking) makes a number of small improvements but notably fixes a bug where click events were lost moving from one page which uses v2 of `o-tracking` and the next page which uses v3.

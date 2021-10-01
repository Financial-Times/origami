---
title: Origami Newsletter, February 2020
description: A new component, a project board and a post-mortem.
author: Chee Rabbits
tags:
  - Newsletter
---

<abbr title="Too long; didn't read">
	<strong>
	TL;DR:
	</strong>
</abbr> {{page.description}}


## Top three things

Here's the big stuff we've done this month:

### Origami Project Board

In our [continued](/blog/2020/01/31/newsletter/) efforts
towards openness we've created a [GitHub project
board](https://github.com/orgs/Financial-Times/projects/83?fullscreen=true) that
has a card for everything we're currently working on.

When an issue is opened on any of our projects, it's added to the incoming
column automatically by [a GitHub
action](https://github.com/Financial-Times/origami-project-board-action/).

We started with 348 things to do. We haven't yet seen that number drop below
three hundred, but we've done 534 of them and we're working on the rest.

![capture of Newman from Seinfeld with the caption "the mail never stops" ](https://www.ft.com/__origami/service/image/v2/images/raw/https://origami.ft.com/assets/images/2020-02-28-newsletter/the-mail-never-stops.png?source=origami)

### Layout post-mortem

The latest version of Chrome made some unexpected changes to how they rendered
things, and it broke the layout on a few of our internal projects. We reacted
fast and got it fixed, and Lee wrote a great breakdown on how it happened and
what we changed.

Read it here: [CSS Grid in Chrome
80](/blog/2020/02/17/o-layout-chrome-80/)

### Meter component

We've created a new component that was in high demand, the
[Meter](https://registry.origami.ft.com/components/o-meter?brand=internal).

Similar components had been in use on internal and O&R products for a while, and
now we've made this which helps increase consistency across all our teams and
all their products.

![the o-meter component in action](https://www.ft.com/__origami/service/image/v2/images/raw/https://origami.ft.com/assets/images/2020-02-28-newsletter/o-meter.png?width=1200&quality=highest&source=origami)

Isn't it beautiful?

## Special thanks

Our thanks this month goes to Olga Averjanova for diving all the way in and
creating a new component
([o-meter](https://registry.origami.ft.com/components/o-meter?brand=internal)), and [a
polyfill](https://github.com/Financial-Times/polyfill-library/pull/461)!

A remarkable level of contribution for two weeks on the team! Thanks, Olga! 😊


## Broader update

A digest list of other things that have happened:

- Most of the team got one year older 🎂
- We created a [JSON schema representation](https://github.com/Financial-Times/origami-manifest-specification-schema) of [the manifest specification](/spec/v1/manifest/)
- We added `origami.json` to many more of our repos, so they'll be provided in repo data
- Jake merged a billion pull requests and there are fewer than 10 on polyfill-library and polyfill-service combined!
- The polyfill.io library tests [now](https://github.com/Financial-Times/polyfill-library/pull/455) complete in a fraction of the time they used to, thanks to a new custom runner
- Label's font weight has been updated to semibold, so we can remove a font from ft.com to improve performance
- Grid's `snappy mode` is deprecated!
- Banner's customization options were [greatly improved](https://github.com/Financial-Times/o-banner/pull/95) for teams like Envoy and Accounts.
- We added a [new animal](https://www.ft.com/__origami/service/image/v2/images/raw/https://origami.ft.com/assets/images/2020-02-28-newsletter/honker.png?source=origami). They tell everyone about our new releases in #origami-support on Slack.
- We decommissioned origami-webhooks
- Polyfill.io documentation was improved

*[TL;DR]: too long; didn't read

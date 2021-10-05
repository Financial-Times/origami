---
title: Origami Newsletter, September 2021
description: undefined
author: chee
tags:
- Newsletter
---

<abbr title="Too long; didn't read">
<strong>
TL;DR:
</strong>
</abbr> {{page.description}}

## Top things

Some of the bigger Origami news from the last month:


### the Origami Component System

The biggest thing we've done this month is move all of our components into a single repository.

Each component used to live in a separate code base, and that meant a lot of extra work when we want to make changes that affected more than one component. This work doesn't change a lot by itself beyond how we work on components, but it is the foundation from which we'll build a better component system.

#### How does this affect me?

How this change affects you depends on how you interact with Origami

##### Origami contributors

If you want to open an issue or a pull request on an Origami component, you should do it in the [Origami Component System repository](https://github.com/Financial-Times/origami). The testing in CI is so fast now, any change runs the test on every single component and for most changes it finishes in about 2 minutes. Everything else should be about the same.

Documentation is a little light at the moment, but if you run into any trouble you can always talk to us in #origami-support or #origami-chat on Slack.

##### Origami consumers

This work itself doesn't affect end-users of Origami, but later changes it unlocks (design tokens, better documentation, sass modules) will make your life better, I promise.

##### Designers

This change won't affect you yet, but the work we're going to build on top of this will give you better insight into how a change to one component affects the others. And it's the first step to Origami being the reference implementation of the design system.

##### Everyone else

The sites that depend on Origami have a bright future of performing better and being more accessible.


### Origami has a new team member

Since we last spoke, the team has grown! We're very happy to welcome aboard Kamran Muniree who is now serving as Origami's delivery manager. He's already made a big difference, and the team are very excited about the future.

We're also still hiring for an engineering role, so make sure you apply if you've ever wanted to work on Origami. There has never been a better time to be part of the team.


### Origami Office Hours

Every week on a Friday at 2p.m. (London time) the team are available On-Line at a meeting called [Origami Office Hours](https://calendar.google.com/event?action=TEMPLATE&tmeid=MWVzZDgzMmhtcXZhYTVvNmlyZXZyNm5tNjdfMjAyMTEwMDhUMTMwMDAwWiBjaGVlLnJhYmJpdHNAZnQuY29t&tmsrc=chee.rabbits%40ft.com&scp=ALL).

If you ever have any questions that you'd prefer talking through in person, you can pop by there and we'll be available.

Thanks to Kamran Muniree it is now available in the P&T calendar.


## Special thanks

leaf rogers 🍃 for helping out Jake in an emergency when an unexpected large video found its way into the image service and ate all the memory and it crashed

## Broader update

A digest of other things that have happened this month:

- [The Origami Component System](https://github.com/Financial-Times/origami)
  - Update o-editorial-typography h4 for a "features xhead" heading (opened by: notlee, closed by: notlee, updated at 2021-10-05T09:49:09Z)
  - Add initital storybook config for o-buttons (opened by: chee, closed by: chee, updated at 2021-10-04T14:09:13Z)
  - Add Origami website to monorepo (opened by: chee, closed by: chee, updated at 2021-10-02T20:16:42Z)
  - Add script which logs out what releases will be made for which packages (opened by: JakeChampion, closed by: JakeChampion, updated at 2021-09-27T13:20:03Z)
  - Use IntersectionObserver instead of scroll event with throttling to improve performance of o-layout (opened by: JakeChampion, closed by: JakeChampion, updated at 2021-09-24T18:06:05Z)
  - Add wheat-100 to o-colors master brand palette (opened by: notlee, closed by: notlee, updated at 2021-09-24T16:09:57Z)
  - bring n-notification into the monorepo (opened by: chee, closed by: chee, updated at 2021-09-22T16:03:20Z)
  - bring sass exes inside obt (opened by: chee, closed by: chee, updated at 2021-09-21T16:49:19Z)
  - Update the `package.json` and `origami.json` urls to point at the monorepo (opened by: chee, closed by: chee, updated at 2021-09-21T09:33:00Z)
  - Add homepage, bugs and support email to the package.json (opened by: chee, closed by: chee, updated at 2021-09-21T09:33:01Z)
- [Financial-Times/o-editorial-layout](https://github.com/Financial-Times/o-editorial-layout)
   - Backport: Update header spacing and h4 "features xhead" style (opened by: notlee, closed by: notlee, updated at 2021-10-05T11:57:50Z)
   - v1 Backport: Increase the bottom margin of h2 and h3 editorial headings. (opened by: notlee, closed by: notlee, updated at 2021-09-09T10:31:23Z)
   - Increase the bottom margin of h2 and h3 editorial headings. (opened by: notlee, closed by: notlee, updated at 2021-09-09T10:01:49Z)
- [Financial-Times/o-editorial-typography](https://github.com/Financial-Times/o-editorial-typography)
   - Backport: Update o-editorial-typography h4 for a "features xhead" heading (opened by: notlee, closed by: notlee, updated at 2021-10-05T11:29:39Z)
- [Financial-Times/origami-image-service](https://github.com/Financial-Times/origami-image-service)


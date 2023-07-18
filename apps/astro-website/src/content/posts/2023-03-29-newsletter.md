---
title: Origami Newsletter, March 2023
description: Featuring FT Professional updates; front-end technology tooling maps; TSX templates and Storybook demos; and the bit where we failed to deliver around 9k image requests each day due to a confusing and unprompted error, affecting pretty much every FT Group product.
author: Lee Moody
publishDate: 2023-03-29
tags:
  - Newsletter
---

## Top things

Some of the bigger Origami news since our last update:

### FT Professional

We're getting ready to support the rollout of FT Professional's rebrand! This month Origami has been working with FT Professional to gather requirements and identify which Origami components require a new professional theme, ahead of a Q2 rollout.

As part of that work Thomas Moody has been designing Professional themed Origami components and adding them to our shared Figma UI Kit – this allows designers to pull reusable components into a design, rather than have to design everything from scratch all the time. We partnered on button updates (these are surprisingly complex, with many states) and made a bunch of other improvements at the same time.

<details>
  <summary>
    Latest o-buttons updates to our Figma UI Kit.
  </summary>
    <ul>
    <li>We replaced the boolean "Primary" variant with a "Type" variant which can be “Primary”, “Secondary”, or “Ghost” button types. This aligns design tooling with the Origami component engineers pull into production applications.</li>
    <li>We deleted the separate ghost button Figma component, now that we can switch the type of button as above.</li>
    <li>We deleted a “custom” theme. It's possible to use o-buttons to generate buttons for a custom colour, but what was this specific example in design tooling for? We don’t want to encourage use of that particular theme do we..?</li>
    <li>We fixed the inverse focus state of buttons so designs more accurately reflect what an engineer will produce with Origami's o-buttons component.</li>
    </ul>
</details>

It was fun pairing with Tom on that and picking up a few more Figma tricks as an engineer: designers and engineers unite!

These changes are aimed at increasing design team efficiency and improving designer/engineer hand over by aligning our design tooling and implementation. We have a lot more to do here, as many components are missing or difficult to work with design side. An engineer can't engineer with a re-usable capability if we don't design with them in mind.

### Technology Tooling Maps

Origami as a project started over 9 years ago. We've come a long way since then with all sorts of new components, tools, and services. Yet the technologies we use within Origami components themselves have stayed largely the same. This kind of adaptable stability is, I think, pretty remarkable and to be celebrated.

However the technology landscape within and outside the FT has changed substantially. Front-end frameworks are mature, we no longer need to support IE11, and there's a whole ecosystem around design systems which didn't exist before. What opportunities are we missing to help the FT scale? Wouldn't it be great if a designer could move from Internal to Specialist teams, or vice-versa, and get up and running quickly with a familiar suite of tools; if a designer in Professional could select a portion of their ft.com design and apply the Professional sub-brand with a click? If they could hand over to an engineer who could see at a glance which re-usable component to pull in, and what options to apply, instead of asking in a back-and-forth conversation or scrabbling around documentation for a few hours? Finally, what if the developer experience for the most used, most recommended technology choices at the FT were prioritised – no more figuring out how to integrate an Origami component with [insert framework of choice] for the 100th time?

Having a thorough understanding of the technology landscape at the FT will help us make technical decisions to achieve such things. Of course, we have our reckons – our assumptions – but we'll also be reaching out to teams to ask. We would be super grateful for your time. We'll be looking to put together a front-end technology tooling map which can answer:

- What tools and techniques FT Group engineers use today.
- Any plans teams have to migrate to new technologies in the near future.
- What tools and techniques teams would be keen to explore.

We'll use this to make decisions about how we author Origami components in the future – expect a Request For Comment 😊

### TSX templates and Storybook demos

As you may know, the Origami team has been working on re-creating [Origami component](https://registry.origami.ft.com/components) demos in [Storybook](https://origami.ft.com/storybook/). We've been working at it slowly around competing priorities for forever, having first started talking about Storybook in a [Nov 2021 blog post](https://origami.ft.com/blog/2021/11/05/newsletter/) – it's been a turbulent time for the team during this period, having lost and regained headcount, which slowed down projects outside Business As Usual (BAU) significantly. This isn't a moan, it's an excuse.

Anyhow, now we're a healthier team again at 3 engineers, we're still trying to do too much. We've decided not to work on any more Storybook or TSX templates during Q2 – though we will come back to it, eventually, else maintain multiple systems which make up our custom component registry forever.

For now, our focus will be on supporting the rollout of the new FT Professional sub-brand (excited eek!) and working on a technical architecture proposal for modern Origami components (amazed and curious oooooohhh!) – so we can much more effectively scale to support new brands and sub-brands in the future and better support collaboration across groups.

We've created Storybook demos and TSX templates for 26 of our components which need them – most recently this month, o-table 🎉 There are 14 left which we'd like to do, tracked in Epic [OR-15](https://financialtimes.atlassian.net/browse/OR-15) now [we're on Jira](https://origami.ft.com/blog/2023/03/03/newsletter/#jira). If you're keen to have a particular interactive demo in Storybook which isn't already there, or you would benefit immediately from a TSX template rather than copy-pasting and noodling around with HTML attributes, let us know and we'll get that prioritised especially for you ❤️ One off pull requests, bootcamps, and secondments are also very welcome!

## Special Thanks

Speaking of BAU. The Origami Image Service surprise <strike>exploded</strike> experienced a technical malfunction this month, resulting in many thousands of errors (around 9k over 24 hours), with each error representing a failure to deliver a requested image to a reader – impacting pretty much every FT Group product that displays images. We hadn't made any changes and struggled to identify a cause. Thankfully, a bunch of excellent people across the FT offered to help. It's a path which lead me to a conversation about [ciphers](https://en.wikipedia.org/wiki/Cipher) – way out of my comfort zone, I thought I was a humble, front-end focused engineer.

Anyhow, that's all resolved now so don't fear, reader! We mitigated the issue reasonably swiftly and subsequently found a fix – there's an [incident summary in Slack](https://financialtimes.slack.com/archives/C04S3UGD8HL/p1678452906995959) and a [PR with technical details](https://github.com/Financial-Times/origami-image-service/pull/826) if you're interested.

My point is, what a wonderful, supportive culture we have here at the FT. A huge special thanks this month goes to everyone who took time out of their day to help in the [#engineering channel](https://financialtimes.slack.com/archives/C03TWD9G1/p1677843126578639), the [incident channel](https://financialtimes.slack.com/archives/CKULLGWQ1/p1677863674600469), and in subsequent pairing over video call. I want to give a particular shout out to Alex Muller 🙇 and Rowan Manning 🙇, if it wasn't for the time we spent pairing I'm sure it would have taken much longer to get to a proper resolution.

## Broader update

A digest list of some other things that have happened in March:

- NEW [o-multi-select](https://registry.origami.ft.com/components/o-multi-select@1.0.0): As promised in our [previous newsletter for February](https://origami.ft.com/blog/2023/03/03/newsletter/#new-component--o-multi-select), we have released a new new component, o-multi-select! Thanks Will Renny for your proposal and design work on that, we're looking forward to seeing this rollout in Spark first 👏 Note that we’ve released this component experimentally for now as we await an accessibility review by a Digital Accessibility Centre (DAC) representative, but we’ve done our own research and you should feel free to use now – with the caveat that we may need to make changes depending on DAC’s feedback.
- MAJOR [ft-date-format](https://registry.origami.ft.com/components/ft-date-format@3.0.0/readme): Introduces `t` symbol support for formatting for time following FT's Editorial style.
- MAJOR [o-date](https://registry.origami.ft.com/components/o-date@6.0.0): Introduces the latest version of `ft-date-format` to support formatting time following FT's Editorial style. To upgrade see the [o-date migration guide](https://github.com/Financial-Times/origami/blob/main/components/o-date/MIGRATION.md#migrating-from-v5-to-v6) – nice one, Chee Rabbits and Leigh-Ann Gant!
- MAJOR [o-topper](https://registry.origami.ft.com/components/o-topper@6.0.3): o-topper no longer includes JavaScript to select the correct topper for JSON-formatted FT articles and flags. This helper was deeply tied to the FT.com content store, and included hardcoded UUIDs and business logic beyond the scope of Origami. Origami components focus on providing reusable user interfaces – without business logic assumptions which could limit their use outside specific groups or use-cases. Juan Sanchez and the StoryTelling team have also since updated the Deep Portrait topper style for improved readability 🎉 To upgrade see [o-topper migration guide](https://github.com/Financial-Times/origami/blob/main/components/o-topper/MIGRATION.md#migrating-from-v5-to-v6).
- MINOR [o-forms](https://registry.origami.ft.com/components/o-forms@9.7.0): Adds a `GenericInput` TSX template, to use custom form inputs within an o-forms field – which includes label and related layout styles.
- MINOR [o-table](https://registry.origami.ft.com/components/o-table@9.3.0): As mentioned, o-table includes TSX templates and [interactive Storybook demos](https://origami.ft.com/storybook/brands/core/?path=/story/components-o-table-responsive--table-with-responsive-scroll).
- MINOR [github-label-sync](https://registry.origami.ft.com/components/github-label-sync@2.3.1/readme) we accepted a couple of [Open Source contributions](https://github.com/Financial-Times/github-label-sync/releases) for github-label-sync this month. These improve Github label name and description validation as well as add an optional "delete" flag which allows managed Github labels to be deleted.
- MINOR [o-icons](https://registry.origami.ft.com/components/o-icons@7.6.0): adds a new preferences (/filter) icon, another shout out to Thomas Moody for that contribution 🔥
- PATCH [o-typography](https://registry.origami.ft.com/components/o-typography@7.3.5): o-typography links which open in a new window/tab no longer cause unwanted overflow, [this was a fun problem which caused a whole bunch of excess whitespace](https://financialtimes.slack.com/archives/CSH1XFM5W/p1678978026106699) at the bottom of our "FT 1000: the seventh annual ranking of Europe’s fastest-growing companies". Hey Storytelling! When you have time, pull in the latest version of o-typography to fix that ☺️
- PATCH [o-teaser](https://registry.origami.ft.com/components/o-teaser@6.2.6): Nothing much, just uses the latest version of o-date in its demos.

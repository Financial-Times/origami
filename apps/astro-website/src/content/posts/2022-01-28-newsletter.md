---
title: Origami Newsletter, January 2022
description: A belated happy new year to you! The Origami team are off to a flying start. This feature includes many accessibility improvements; app team collaboration; Storybook Stories and JSX templates for components; and ongoing bower to npm migration support.
author: Lee Moody
publishDate: 2022-01-28
tags:
- Newsletter
---

## Top things

Some of the bigger Origami news from the last month:

### Bower To npm / Origami Build Service migration update

Back in July 2021 we announced Origami components had moved from the Bower to npm package manager. That means there is 6 months remaining until we turn off the Origami Bower Registry and Origami Build Service V2.

Teams using Bower need to migrate to npm, and teams using V2 of the Origami Build Service need to migrate to V3. Your team has scheduled migration work right? Right? If not fear not. We're continuing to reach out to teams and offer support, please let us know in the [#origami-support](https://financialtimes.slack.com/archives/C02FU5ARJ) Slack channel if you have any questions. 😊

To learn more about the changes see the original [announcement and guides on how to migrate products](https://origami.ft.com/blog/2021/07/01/origami-on-npm-and-how-to-migrate/). We also have a [migration tracker](https://docs.google.com/spreadsheets/d/1Pem5e6cR0aiuKpYa7VD08AnSSynzjRtWt_VAHAoyhPQ/edit#gid=1513272952) you may use to identify whether any of your systems are affected.


### Accessibility audit

Accessibility audits for ft.com help Origami identify issues in components and distribute fixes to other projects which use Origami, from 3rd party maintained products to internal tools. But Origami components have never been audited proactively and in isolation, until now!

We received our first accessibility audit by DAC (Digital Accessibility Center) and it's a whopping 237 pages. This month the team have triaged the issues and begun releasing fixes. I'm pleased to report we've resolved 25% so far.

One great example is [o-tabs v8](https://registry.origami.ft.com/components/o-tabs@8.0.0) which now implements the [wai-aria tabs design pattern](https://www.w3.org/TR/wai-aria-practices/#tabpanel). Improvements include keyboard support for moving between tabs using arrow keys, relationships between tabs and their associated tab-panel, and more ([o-tabs@8 pull request](https://github.com/Financial-Times/origami/pull/571)).

<figure>
    <blockquote>
        <p>that tab panel looks pretty much prefect to me!</p>
    </blockquote>
    <figcaption>- Digital Accessibility Center representative</figcaption>
</figure>

In case you missed Guy Powell's email last week, you might like to know "DAC are now engaged 10 hours per week, every week to provide audits, reviewing new products and services, provide suggestions for improvements and answer any accessibility related questions". It has been incredibly helpful to get quick and iterative feedback on our improvements. 🙏 If you are thinking about organising an accessibility audit for your project, contact Rich Lewis or Guy Powell in the [#accessibility-improvements Slack channel](https://financialtimes.slack.com/archives/C02NW8G3VPD).

### App team collaboration

This month the Origami team collaborated with the Apps team to investigate ways the article page font resizing setting in the app could be improved using a little known [relative typography and spacing feature in Origami](https://registry.origami.ft.com/components/o-typography@7.1.0/sassdoc?brand=core#variable-o-typography-relative-units). Our aims were to:

- **Improve the app’s article font size feature for users**, only some aspects of the article page resize correctly, other aspects do not respond and look somewhat broken – not a quality offering.
- **Improve the app’s design consistency**, some Origami components cannot be used on the article page without significant work and ongoing maintenance of style overrides for the font size feature. This requires more work to re-implement UI in the app and reduces consistency across FT products.
- **Reduce cost of new article page features / maintenance**, specific font size overrides currently need to be considered and maintained for any new article page feature.

<figure>
	<img alt="Left: FT APP article page with pull quote. The pull quote text is strangely smaller in size than the main article copy, with a large line height that makes it awkward to read. Right: FT APP article page with large, correctly scaled pull quote." src="https://www.ft.com/__origami/service/image/v2/images/raw/https://origami.ft.com/assets/images/2022-01-28-newsletter/ft-app-font-size-quote.png?source=origami" />
	<figcaption>
        Right: FT App article page with a large font size setting chosen. The pull quote does not scale correctly, lowering its impact and making it more difficult to read. Left: A proposed solution would allow all app elements to scale in proportion without targeted overrides – improving reliability and reducing implementation costs for new article features.
	</figcaption>
</figure>

<figure>
	<img alt="Left: FT APP article page with table. Table data is displayed larger and out of proportion compared to the main article copy. Right: FT APP article page with correctly scaled table data." src="https://www.ft.com/__origami/service/image/v2/images/raw/https://origami.ft.com/assets/images/2022-01-28-newsletter/ft-app-font-size-table.png?source=origami" />
	<figcaption>
        Right: FT App article page with a small font size setting selected. The table content does not scale in line with article body content, it looks out of place and means the user can't evaluate more table data without scrolling back and forth. Left: As before, a proposed solution would allow fix this. Since all components scale with this method without further targeted overrides components aren't missed and don't look out proportion, improving the perceived quality of the app.
	</figcaption>
</figure>

By the end of the week we had 5 possible approaches to recommend, ranging in scope from "delete the feature" to "modernise all the things", in-between a very clever and pragmatic solution – if we do say so ourselves.

See the [ft-app font size feature spike document](https://docs.google.com/document/d/1JpAxWOzUTn1sD3hAj_9yWS_FMaKcxKECk_tiXUfjO-E/edit#heading=h.5a2d438n46du) to learn more.

The spike was a lot of fun and a great way to share knowledge between our teams. Massive shout out to Charlotte Payne from the apps team for her excellent work on this!

### Storybook Stories & JSX templates

We mentioned in our [previous blog post](/blog/2021/11/05/newsletter/#storybook) that we are working on an [Origami Storybook](https://origami.ft.com/storybook/) which we see as an eventual replacement to our very custom [Origami component registry](https://registry.origami.ft.com/components?active=true&maintained=true). We're making progress and adding new components each week.

This is very exciting because it will allow us to make the most of a large ecosystem of tools to help speed up design and development at the FT ([see details and screenshots in previous blog post](/blog/2021/11/05/newsletter/#storybook)). It's also exciting because we're writing JSX templates for our components for the first time, which we may make public in the near future. For teams who also use JSX templates, this could hugely reduce the complexity of implementing Origami components in a project and make our most tricky kind of migration (markup changes) simple when upgrading from one major version of a component to another.

You can get a sneak peak at [origami.ft.com/storybook](https://origami.ft.com/storybook) and track our progress on our [component demos / storybook issue](https://github.com/Financial-Times/origami/issues/522).

## Special thanks

Special thanks this month goes to Guy and Rich, and the Digital Accessibility Center, for their support in the [#accessibility-improvements Slack channel](https://financialtimes.slack.com/archives/C02NW8G3VPD) 🙇‍♂️

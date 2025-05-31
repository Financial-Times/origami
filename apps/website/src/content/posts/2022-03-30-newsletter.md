---
title: Origami Newsletter, March 2022
description: A new Origami component ft-concept-button (:blobaww:); more accessibility fixes (:blob-hype:); an update on the Bower and Origami Build Service v2 migration (:blobhelp:).
author: Lee Moody
publishDate: 2022-03-30
tags:
  - Newsletter
---

## Top things

Some of the bigger Origami news since our last update:

### A new component, ft-concept-button

We have a new component, [ft-concept-button](https://origami.ft.com/storybook/?path=/story/components-ft-concept-button--follow-button)! ft-concept-button was added to support the Accounts team build the new newsletters signup page. This component represents a number of exciting firsts. Nice work chee 👏

1. The first new component to be added to the [design team's Figma UI Library](https://www.figma.com/file/MyHQ1qdwYyek5IBdhEEaND/FT-UI-Library?node-id=156%3A669) ahead of implementation in Origami – big thanks to Ajai! 💪 We think this workflow is the correct way around. Origami aims to be the reference implementation of our design guidelines.
2. The first component to be developed from scratch within Storybook.
3. The first component to release public JSX templates for consuming projects to use.

You won't find ft-concept-button in the [Origami component registry](https://registry.origami.ft.com/components/) right now. Instead take a look at our work in progress [Storybook demos](https://origami.ft.com/storybook/?path=/story/components-ft-concept-button--follow-button). We continue to add new demos for existing components there. Read our previous newsletter to learn [why Storybook and JSX templates are an exciting addition to Origami components.](/blog/2022/01/28/newsletter/#storybook-stories--jsx-templates).

### More accessibility improvements

We continue to work away at accessibility improvements to address [issues raised by our Digital Accessibility Centre (DAC) audit](https://github.com/Financial-Times/origami/issues/498). Jake has led on this work and shared his learnings along the way, which has been great. For example I've enjoyed using MacOS Voice Control to test an issue in [o-forms](https://registry.origami.ft.com/components/o-forms) demos where the form inputs [accessible name and visible label do not match](https://www.w3.org/WAI/WCAG21/Techniques/general/G211).

In case you haven't seen it already the [#accessibility Slack channel](https://financialtimes.slack.com/archives/C2LMEKC6S) is a great place to ask questions and share tips and articles.

If you are thinking about organising an accessibility audit for your project, contact Rich Lewis or Guy Powell in the [#accessibility-improvements Slack channel](https://financialtimes.slack.com/archives/C02NW8G3VPD). DAC provide the FT with 10 hours per week for new audits and reviews, they can also provide suggestions for improvements and answer any accessibility related questions.

### Update on the Bower and Origami Build Service v2 migration

There are only _3 months left_ to migrate from Origami Build Service V2 to V3 and migrate from the Bower to npm package manager. Apps which fail to migrate will break in July, a year after [our initial announcement](https://origami.ft.com/blog/2021/07/01/origami-on-npm-and-how-to-migrate/).

To learn more about the changes see the original [announcement and guides on how to migrate products](https://origami.ft.com/blog/2021/07/01/origami-on-npm-and-how-to-migrate/). We also have a [migration tracker](https://docs.google.com/spreadsheets/d/1Pem5e6cR0aiuKpYa7VD08AnSSynzjRtWt_VAHAoyhPQ/edit#gid=1513272952) you may use to identify whether any of your systems are affected. I'm seeing a lot of projects from FT Core, FT Creative, FT Specialist there 👀 We're continuing to reach out to teams and offer support, please let us know in the [#origami-support](https://financialtimes.slack.com/archives/C02FU5ARJ) Slack channel if you have any questions!

## Special Thanks

Special thanks this week goes to Joanna Kao from the data journalism team for her work migrating the [g-audio](https://registry.origami.ft.com/components/g-audio@2.0.1) component from Bower to npm, and making a number of other improvements to bring it inline with current Origami standards. Thanks Joanna!

## Broader update

A digest list of some other things that have happened recently:

- [o-tracking](https://registry.origami.ft.com/components/o-tracking): now has an option to always use a queue instead of using the Beacon API, which only works when the device is online. This will allow ft-app to upgrade to the latest version of Origami components. Thank you Charlotte Payne for reviewing, and clearly communicating the apps requirements!
- [g-audio](https://registry.origami.ft.com/components/g-audio): has migrated from bower to npm, thanks again Joanna.
- [o-forms](https://registry.origami.ft.com/components/o-forms): toggles and standard checkboxes may now include a label and longer description, this was added to support the acquisition team make improvements to consent options on article sign up and register pages; also toggles have been updated with iconography to indicate on/off state; and finally the colour of inverse toggles for dark background has been fixed.
- [ft-concept-button](https://origami.ft.com/storybook/?path=/story/components-ft-concept-button--follow-button): as mentioned, we have a new ft-concept-button component! Added to support the Accounts team build the new newsletters signup page.
- [o-fonts-assets](https://github.com/Financial-Times/o-fonts-assets): we're continuing to work on rolling out variable fonts, so our digital products can have more typographic design choices available – strengthening the FT brand – without hindering performance. We have the commissioned fonts from our type foundry Klim, and are working to verify they work as expected. Watch this space.
- [useragent_parser](https://github.com/Financial-Times/useragent_parser): now detects iOS >=11 in-app webview, this project is used by [polyfill.io](https://polyfill.io/).
- [polyfill-library](https://github.com/Financial-Times/polyfill-library): [gets a number of fixes](https://github.com/Financial-Times/polyfill-library/releases/tag/v3.111.0)
- [o-table](https://registry.origami.ft.com/components/o-table): has received a fix which ensures table rows are displayed correctly when a filter is applied more than once.
- [o-typography](https://registry.origami.ft.com/components/o-typography): external links no longer display an icon. During the Origami accessibility audit we discovered some people think the icon indicates the link will open in a new window, when in-fact we mean it to indicate an external link. The [Government Digital Services (GDS) team came to the same conclusion in their user testing](https://designnotes.blog.gov.uk/2016/11/28/removing-the-external-link-icon-from-gov-uk/). After discussing with the broader design team we followed GDS and removed the icon entirely from external links.
- [o-buttons](https://origami.ft.com/storybook/?path=/story/components-o-buttons--ghost-button): has a new button type, the ghost button 👻 It's useful when many buttons are used together, for example rows in a table with repeated action buttons. We've also added pagination and button group Storybook stories. The pagination [Storybook demo](https://origami.ft.com/storybook/?path=/story/components-o-buttons--pagination) is interactive, much more helpful than our [current pagination demo](https://registry.origami.ft.com/components/o-buttons@7.5.0#demo-pagination-layout).
- [o-visual-effects](https://registry.origami.ft.com/components/o-visual-effects): gets new CSS Custom Properties so Origami Build Service users may match shadow styles e.g. `--o-visual-effects-shadow-high`
- [origami-vscode-extension-pack](https://github.com/Financial-Times/origami-vscode-extension-pack): Is an extension pack for VSCode to make working with Origami components a smoother experience. It now includes Prettier.
- [o-header](https://registry.origami.ft.com/components/o-header): Now shows the entire focus ring within the drawer, improving accessibility for keyboard users.
- [o-cookie-message](https://registry.origami.ft.com/components/o-cookie-message): Now supports a configurable "manage cookies page" url, so non-ft projects can use it.
- [o-banner](https://registry.origami.ft.com/components/o-banner): has a number of accessibility improvements, e.g. the close button label is not repeated and it now appears in the navigation tree to allow users of assistive technology to jump straight to the banner.
- [o-quote](https://registry.origami.ft.com/components/o-quote): now has [o-quote Storybook demos](https://origami.ft.com/storybook/?path=/story/components-o-quote--editorial-quote).
- [o-tabs](https://registry.origami.ft.com/components/o-tabs): now has [o-tabs Storybook demos](https://origami.ft.com/storybook/?path=/story/components-o-tabs--big).

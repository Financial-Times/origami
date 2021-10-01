---
title: Accessibility
description: Information on how Origami prioritises Accessibility when building components.
cta: Read more about Origami's accessibility guidelines

# Navigation config
nav_display: true
nav_label: Accessibility
nav_order: 30
---

# {{ page.title }}

Accessibility is an important aspect of web development at the Financial Times and within Origami. The <abbr title="Financial Times">FT</abbr> website has an AA level <abbr title="Web Content Accessibility Guidelines">WCAG</abbr> accessibility accreditation. This means that we have met certain criteria to make our website more accessible to people with disabilities, according to the <a href="https://www.w3.org/TR/UNDERSTANDING-WCAG20/conformance.html" class="o-typography-link--external"><abbr title="Web Content Accessibility Guidelines">WCAG</abbr> conformance standards</a>.
<aside> You can find more information about our accreditation <a href="https://www.ft.com/accessibility" class="o-typography-link--external">on the <abbr title="Financial Times">FT</abbr> website</a></aside>

Since FT.com uses Origami extensively, it is also our responsibility to uphold the standards of accessibility that the company has been accredited with. In order to do that, we follow a few essential guidelines when building our components.

## Base Guidelines

- We maintain tools and implement processes to help build accessible experiences. Among them are a <a href="https://registry.origami.ft.com/components/o-colors#demo-contrast-ratio-checker">contrast ratio checker</a> that uses our colour palette, and SASS testing to error if there have been stylistic violations.
- We test our work with screen readers, to assess how well our disabled users interact with our components.
- We use `pa11y`, an <a href="http://pa11y.org/" class="o-typography-link--external"> open source tool</a> that enables us to test the validity and accessibility of our markup.
- We aim to use <a href="https://www.w3.org/TR/WCAG20-TECHS/G115.html" class="o-typography-link--external">semantic markup</a> where possible. This means that the elements we use in our components reflect their actual meaning.
- We avoid using JavaScript to generate content where possible, and provide text content to describe visual elements in our components—we want our work to be machine readable.

The <a href="https://www.w3.org/TR/WCAG20/" class="o-typography-link--external"><abbr title="Web Content Accessibility Guidelines">WCAG</abbr> 2.0</a> covers all of the details regarding accessibility, including implementation and more detailed guidelines. We recommend you look through these when buildling something new. If you need help, please get in touch with us via <a href="https://financialtimes.slack.com/messages/origami-support" class="o-typography-link--external">Slack</a> or [Email](origami.support@ft.com).

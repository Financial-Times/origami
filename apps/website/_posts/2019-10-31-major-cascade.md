---
title: Major Cascade 2019
description: We are working on a major release of low level components like o-typography. In this post we'll discuss what improvements are being made and how they further our aims to help bring design consistency and reduce the time teams spend repeating work.

author: Lee Moody
---

The Origami team maintain around 52 front end components. A component is a shared piece of user-interface which, along with other components, is used to build a webpage.

We are working on a major release of low level components including [o-typography](https://registry.origami.ft.com/components/o-typography), [o-buttons](https://registry.origami.ft.com/components/o-buttons), and [o-colors](https://registry.origami.ft.com/components/o-colors) which will require a major release of dependent components which use them, and components which use those components, and so on. This is a process we call a major cascade.

In this blog post we'll discuss what a major cascade looks like; what high-level improvements have been made; and how they further our aims to help bring design consistency and reduce the time teams spend repeating work.

## The Major Cascade

Some components are low level &#8212; fundamental building blocks used to build many other components and end products. [o-typography](https://registry.origami.ft.com/components/o-typography) is an example of a low level component.

Other components are high level &#8212; complex components which are used in end products and rarely used to build other components. [o-table](https://registry.origami.ft.com/components/o-table) is an example of a high level component.

As low level components are used to build other components there are more projects between them and the end product. To make major changes to a low level component means upgrading each project in-between step by step.

<figure>
	<img alt="" src="/assets/images/2019-10-31-major-cascade/all-graph.svg" />
	<figcaption>
        An example graph of product dependencies. Low level components o-colors and o-typography branch out; they are included in final products directly and indirectly via other components including o-table. In reality the graph is much more complex because many projects comprise "ft.com".
	</figcaption>
</figure>

<figure>
	<img alt="" src="/assets/images/2019-10-31-major-cascade/typography-graph.svg" />
	<figcaption>
        Dependencies on o-typography, a low level dependency, are a large portion of the overall graph. Components in-between including o-buttons and o-table must be upgraded before the end products can be upgraded.
	</figcaption>
</figure>

<figure>
	<img alt="" src="/assets/images/2019-10-31-major-cascade/table-graph.svg" />
	<figcaption>
        Dependencies on o-table, a high level dependency, are a small portion of the overall graph. If a major version of o-table is released the end products may be updated immediately.
	</figcaption>
</figure>

## Typography

As a low level component [o-typography](https://registry.origami.ft.com/components/o-typography) is used by every group in Product & Tech in some way. It includes fundamental typographical styles including fonts, font scales, and tools to customise them for more unique projects. But it also includes more specific styles to present Financial Times articles. This creates a huge dependency graph and makes releasing major changes tricky &#8212; it requires coordination between many groups and impacts over 167 projects across the Financial Times Group.

If we want to make major changes to our article typography across "master brand" projects such as those which power ft.com, amp pages, interactive graphic pages, the app, and our content management systems, that should not impact other teams &#8212; like Operations and Reliability, Internal Products, Specialist Titles (or this blog).

So we're splitting specific styles used by ft.com and other "master brand" products from o-typography into two new components:

- **o-typography (updated)**: Fundamental typographic tooling and user interface styles.
- **o-editorial-typography (new)**: Editorial styles including headlines, tags, and bylines.
- **o-editorial-layout (new)**: Styles to layout editorial typography within an article.

Splitting o-typography into smaller, simpler, higher level components means:

- Faster iteration of editorial styles.
- Faster websites (through smaller CSS bundle sizes).
- Smaller migration paths when major changes are made, impacting fewer teams.
- A reduced learning curve for developers and designers.

Along with the Product Design team we also audited existing users of editorial styles. Where we discovered design divergence between projects we merged an updated version back into o-editorial-typography to improve design consistency and quality when moving between Financial Times experiences.

<figure>
	<img alt="" src="https://www.ft.com/__origami/service/image/v2/images/raw/https://origami.ft.com/assets/images/2019-10-31-major-cascade/blockquote-1.png?source=origami" />
	<figcaption>
        Unique blockquote-like style one.
	</figcaption>
</figure>

<figure>
	<img alt="" src="https://www.ft.com/__origami/service/image/v2/images/raw/https://origami.ft.com/assets/images/2019-10-31-major-cascade/blockquote-2.png?source=origami" />
	<figcaption>
        Unique blockquote-like style two.
	</figcaption>
</figure>

<figure>
	<img alt="" src="https://www.ft.com/__origami/service/image/v2/images/raw/https://origami.ft.com/assets/images/2019-10-31-major-cascade/blockquote-3.png?source=origami" />
	<figcaption>
        Unique blockquote-like style three.
	</figcaption>
</figure>

This process of design rationalisation fed into Origami components and our new [Sketch UI Kit](https://medium.com/ft-product-technology/ft-design-basics-1-why-we-finally-built-a-ui-kit-850e98b127bf), to help the design team prototype new experiences more efficiently without recreating existing elements.

With editorial styles moved, we also made a host of other changes to simplify o-typography for developers. See more details in the [o-typography v6 proposal](https://github.com/Financial-Times/o-typography/issues/203).

## Buttons

[o-buttons](https://registry.origami.ft.com/components/o-buttons) is another low level component, with broad use across Financial Times Groups. We're making changes to simplify the developer interface, encourage style reuse for faster websites, and make custom buttons created by projects consistent with default buttons.

<figure>
	<img alt="" src="https://www.ft.com/__origami/service/image/v2/images/raw/https://origami.ft.com/assets/images/2019-10-31-major-cascade/buttons-before.png?source=origami" />
	<figcaption>
        o-buttons currently. In the right column "primary" buttons of different themes. In the left column "secondary" buttons. The rows show the different states of each button, for example when hovered, focused with the keyboard, or pressed. Each button has its own quirks, especially the final two rows.
	</figcaption>
</figure>


<figure>
	<img alt="" src="https://www.ft.com/__origami/service/image/v2/images/raw/https://origami.ft.com/assets/images/2019-10-31-major-cascade/buttons-after.png?source=origami" />
	<figcaption>
        o-buttons after. There is consistency between "primary" and "secondary" buttons, improved accessibility checks, and better contrast between each button state.
	</figcaption>
</figure>


We worked with the design team to generate custom buttons in the same way as default Origami buttons. This simplifies maintenance, improves design consistency, and was added to the [Sketch UI Kit](https://medium.com/ft-product-technology/ft-design-basics-1-why-we-finally-built-a-ui-kit-850e98b127bf) to support future design work.

The colours for each state are automatically chosen based on design rules and [WCAG 2.1](https://www.w3.org/TR/WCAG21/) recommendations for colour contrast, to maintain our [commitments to accessibility](https://www.ft.com/accessibility) and <abbr title="Digital Accessibility Centre">DAC</abbr> accreditation.

We also simplified the developer interface for new button themes, which may be created by specifying a single colour. Developers can find out more about upcoming changes in the [pre-release migration guide](https://github.com/Financial-Times/o-buttons/blob/d5d4e15e060aa897e3c870f717840ce1b48b4828/MIGRATION.md).

## Colours

[o-colors](https://registry.origami.ft.com/components/o-colors) (yep, we use [British English for documentation and American English in our code](/docs/principles/tone-and-language/#use-british-english-for-documentation)), one of our lowest level components, also has some updates.

These are mostly developer focused updates but also remove technical debt from our introduction of [component brands](/docs/components/branding/) (master, internal, and whitelabel); reduce the CSS bundle size for some users (for faster websites); and make changes to reduce the chance that visual errors make it to production. See more details in the [o-colors v5 proposal](https://github.com/Financial-Times/o-colors/issues/198).

## Dependants

Because of the major cascade, we've taken the opportunity to implement more recent Origami proposals across all our components. These include [consistent ways to customise components](https://github.com/Financial-Times/origami/issues/14), so Origami can better support products with a unique look; [removing CSS class name modification](https://github.com/Financial-Times/origami/issues/4), to encourage style reuse and faster sites; [primary Sass mixins](https://github.com/Financial-Times/origami/issues/6), so developers can work with Origami more efficiently; and [moving from CommonJS JavaScript modules to browser native ECMAScript modules](https://github.com/Financial-Times/origami-build-tools/issues/609), to support modern methods and tools of bundling up and delivering our websites and apps to customers.


## Release

We will start to release betas for these changes next week, with an announcement and full releases following soon after. We've discussed our plans with groups across the Financial Times and are planning a time to support Customer Products directly with their more complex upgrade path. If you have any questions, concerns, or feedback please reach out to the team &#8212; we're here to help. 😊

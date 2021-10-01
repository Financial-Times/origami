---
title: Origami Site Update
description: We re-launched the Origami website and Origami component registry.
author: Lee Moody
---

**TL;DR:** We re-launched the [Origami website](/) and [Origami component registry](https://registry.origami.ft.com/components) with a unified design; overhauled documentation; refined specifications; and a new site structure to bring it all together.

## Motivation &amp; Goals

Our main site [origami.ft.com](/) introduces the Origami team, components, and services. It hosts our documentation, which helps people use Origami in their projects; our specifications, which helps teams contribute to Origami; and links out to our [component registry](https://registry.origami.ft.com/components), which hosts documentation and demos specific to each Origami compatible component, service, and imageset available.

Our component registry and main site were presented as separate sites, which made moving between the documentation and a specific component or service a clunky experience. This has been especially the case recently, as our component registry has adopted new FT styles whilst our main site has not been updated.

In addition, the content of our sites has grown organically over time as new tools, approaches, and components have come and gone. This meant some outdated content was left in place, the structure of the site became less clear, and the UI was added to as needed and not always considered as a whole.

With this in mind, our aims were to:
- Bring the Origami website and component registry together with a unified design.
- Update the site structure, to help all people find the information they need.
- Overhaul our documentation, with our principles and latest best practises in mind.
- Refine our specifications, by reducing verboseness and removing less relevant requirements.

## Homepage

On our homepage we've removed detail and instead focus on pointing people in the right direction. We've also increased the prominence of our contact details. As a services team we want to encourage any questions, feedback, and collaboration.

<figure>
    <img alt="" src="https://www.ft.com/__origami/service/image/v2/images/raw/https://origami.ft.com/assets/images/2019-03-11-site-update/home-before.png?source=origami&width=1240" />
    <figcaption>The Origami homepage before. There's a lot of text.</figcaption>
</figure>
<figure>
    <img alt="" src="https://www.ft.com/__origami/service/image/v2/images/raw/https://origami.ft.com/assets/images/2019-03-11-site-update/home-after.png?source=origami&width=1240" />
    <figcaption>The Origami homepage after. There's less text and more clear calls to action, such as to contact the team.</figcaption>
</figure>

## Documentation

We've rewritten our documentation to cover our latest recommendations. As part of the rewrite we have introduced new sections like "[tone and language](/docs/principles/tone-and-language/)" -- a great reference whilst writing documentation. Some sections have been removed, often where the documentation can be found elsewhere (e.g. we shouldn't repeat <abbr title="Web Content Accessibility Guidelines">WCAG</abbr> recommendations).

Perhaps the most striking change is how we have restructured and presented the documentation under "principles", "components", "services", and "tutorials". Each section is now explicitly highlighted with a heading and content list.

<figure>
    <img alt="" src="https://www.ft.com/__origami/service/image/v2/images/raw/https://origami.ft.com/assets/images/2019-03-11-site-update/docs-before.png?source=origami&width=1240" />
    <figcaption>The Origami documentation before. Content types are not seperated very clearly, although the body of the page explains where to find what documentation.</figcaption>
</figure>
<figure>
    <img alt="" src="https://www.ft.com/__origami/service/image/v2/images/raw/https://origami.ft.com/assets/images/2019-03-11-site-update/docs-after.png?source=origami&width=1240" />
    <figcaption>The Origami documentation after. We use headings and lists to make the page more easy to scan.</figcaption>
</figure>

## Specifications

As with our documentation, the Origami specifcation has also been reviewed and simplified where possible.

<figure>
    <img alt="" src="https://www.ft.com/__origami/service/image/v2/images/raw/https://origami.ft.com/assets/images/2019-03-11-site-update/specs-before.png?source=origami&width=1240" />
    <figcaption>The Origami specification before. The navigation bar is larger than present, e.g. "Third party components" has been removed.</figcaption>
</figure>
<figure>
    <img alt="" src="https://www.ft.com/__origami/service/image/v2/images/raw/https://origami.ft.com/assets/images/2019-03-11-site-update/specs-after.png?source=origami&width=1240" />
    <figcaption>The Origami specification after. The navigation bar more clearly points to our three specifications: component, service, and origami.json specification.</figcaption>
</figure>

## Registry

Our component registry is now in line with our main site and other internal tools from the FT.

The right hand sidebar is where we have made the most content changes. We found in qualitative user research many people don't make use of all the sidebar content whilst some ignore it entirely. So we decided to leave detailed usage instructions to our improved documentation site and use the sidebar for key component-wide details and helpful links.

We maintained the link to GitHub as that is often used. The component version is also useful to copy and paste, so we kept that under "install component". New sections in the right hand sidebar include an issue/contact section, again to encourage our users to give feedback or ask for help. We also moved the brand switcher into the sidebar along with the version selector. These options exist in the right hand sidebar across component demos, READMEs, SassDocs and JSDocs. Hopefully this will minimize context switching and will make choosing a different brand, version or visiting GitHub more intuitive.

<figure>
    <img alt="" src="https://www.ft.com/__origami/service/image/v2/images/raw/https://origami.ft.com/assets/images/2019-03-11-site-update/registry-before.png?source=origami&width=1240" />
    <figcaption>The Origami registry before. The style does not match our main site or other internal products from the FT, and there is a lot of detail which detracts from the main content of the page.</figcaption>
</figure>
<figure>
    <img alt="" src="https://www.ft.com/__origami/service/image/v2/images/raw/https://origami.ft.com/assets/images/2019-03-11-site-update/registry-after.png?source=origami&width=1240" />
    <figcaption>The Origami registry after. The design matches our main site and other internal FT products, secondary content is less verbose, and our contact details are more discoverable.</figcaption>
</figure>

## Conclusions

We're excited to have released updated documentation and specifications, especially alongisde the improved site structure and unified design. We hope the changes we've made make it easier to work with Origami, and easier to reach out to the team. If you have any feedback please let the team know. &#x1F603;

---
title: Origami Newsletter, October 2021
description: test
author: lee & chee
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

### Image sets have moved home

Origami image sets have moved. You used to be able to find image sets maintained by the Origami team under the [Origami registry](https://registry.origami.ft.com/components). Now image sets are listed directly within [Origami Image Service](https://www.ft.com/__origami/service/image/v2/docs/image-sets) documentation. No more jumping between the Origami registry and the Origami Image Service URL Builder!

Behind the scenes we've moved the images from multiple separate git repositories and S3 buckets into the Origami Image Service repository itself, using [Git Large File Storage (LFS)](https://git-lfs.github.com/). This is a more simple architecture that allows us to publish new images and logos more quickly. Finally, author headshots were moved from being owned by Origami to being Editorial owned a couple years ago. However, many projects were still using the Origami Image Service to request (stale) author headshots. So we have now updated the Origami Image Service to no longer return an old headshot but to instead fetch an up-to-date image from our Content API.

What's the [Origami Image Service](https://www.ft.com/__origami/service/image/v2/)? It's a service used to optimise, resize, and transform images. It works with FT images from an Origami image set, our Content APIs, or any image url. The quickest way to get started is to experiment with the [URL builder](https://www.ft.com/__origami/service/image/v2/docs/url-builder).

### The "master" brand is now the "core" brand

Origami components currently support 3 brands:

- master: FT branding for public ft.com sites and affiliates.
- internal: Style suitable for tools, documentation, and internal products.
- whitelabel: Base, structural styles only to add support for new brands.

To [address offensive and objectionable technology terms](https://docs.google.com/document/d/1v6z7_NkLFeYAFotTYB8C1OguO5iMHHLpAOv_yG5EKHI/edit#heading=h.tzfu5ukd61s) we opened a [proposal to rename the master brand](https://github.com/Financial-Times/origami/issues/243), our brand team agreed we should rename the brand and decided with other stakeholders to rename the "master" brand to the "core" brand.

We're in the process of rolling out the rename. The "master" brand will become the "core" brand. This change will be reflected across Origami components, services, and documentation.

#### How Does The Brand Rename Affect Your Project?

**It doesn't!** For now Origami components and services will continue to recognise the "master" brand.

However, if your project is using the latest version of Origami components we suggest setting the "core" brand in your Sass.

```diff
-$o-brand: 'master';
+$o-brand: 'core';
```

And if your project uses v3 of the Origami Build Service, we recommend setting "core" instead of "master" as your brand query parameter.

```diff
-https://www.ft.com/__origami/service/build/v3/bundles/css?components=o-layout@^5.0.6&brand=master
+https://www.ft.com/__origami/service/build/v3/bundles/css?components=o-layout@^5.0.6&brand=core
```

We're rolling out documentation changes next week. Keep a look out for that!

### Storybook

Origami and Storybook sitting in a tree. K. I. S. S. I. N. G. Fist comes love, then comes...

We've working on an [Origami Story](https://origami.ft.com/storybook/). We see it as an eventual replacement to our very custom [Origami component registry](https://registry.origami.ft.com/components?active=true&maintained=true). Why? Because we can maintain less code and take advantage of the substantial Storybook ecosystem. Let me tell you some of the reasons why that's super exciting.

Our current component demos are static. Take the [o-button demos](https://registry.origami.ft.com/components/o-buttons@7.0.1) as an example. What you see is what you get. You can't experiment by changing the type of button, the icon, or button text. However in the [o-buttons Storybook](https://origami.ft.com/storybook/?path=/story/button--big) you can try updating a demo with your own content right in the browser under the "controls" tab.
<img alt="" src="/assets/images/story-controls.png/story-controls.png" />

We've made use of the Storybook plugin system to add a custom HTML tab, similar to the existing registry, where Origami users can copy HTML from when building web products. Unlike our existing component registry this html changes when you toggle demo controls. This should make it much easier to experiment with a component, find the feature/variants you're looking for, then copy the HTML to implement it in your project.
<img alt="" src="/assets/images/story-html.png/story-html.png" />

Storybook could also help us implement new components and keep in sync with the design team. We created a "design" tab to see a component's Figma design right alongside its actual working implementation.
<img alt="" src="/assets/images/story-design.png/story-design.png" />

In addition we've been hard at working bringing over our existing documentation alongside demos, such as component readme, migration guides, and changelog.
<img alt="" src="/assets/images/story-migration.png/story-migration.png" />

We're also exited to make use of the existing plugin ecosystem. Checkout the accessibility tab which will check for issues such as colour contrast.
<img alt="" src="/assets/images/story-accessibility.png/story-accessibility.png" />

Our next steps are to add more components and missing features such as Codedocs. We'll also be looking for user feedback. We'd love to know what you think. 🙂

## Special thanks

Special thanks this week goes to Mo Shawwa! Mo contributed to Origami to [fix a low level accessibility issue in o-normalise](https://github.com/Financial-Times/origami/pull/346) that could prevent readers with Voice activation software from filling out forms. Thanks for that! 💛

## Broader update

A digest of other things that have happened this month:

- o-normalise: Mo [improved o-normalise](https://github.com/Financial-Times/origami/pull/346) for users of voice control software like Dragon. Thanks, Mo!
- o-date: We [improved consistency and accessibility](https://github.com/Financial-Times/origami/issues/203) by deprecating options for abbreviated date formats e.g. "1d ago" over "1 day ago". This format was [only used on myft topic cards](https://github.com/Financial-Times/origami/issues/203), which we opened a PR to change.
- o-editorial-layout: The spacing between some article headings has been increased.
- o-no: lots of other small things, we didn't update this very thoroughly through the month.
- Design token investigation continues steadily. We have a proof of concept to distribute design decisions (brand assets, colour palette, typographic scale, spacing, etc) across web, native platforms, and design tooling. We need to gather more feedback from designers and engineers and investigate possible workflows for the design team to make updates. To learn more see the [tech all hands recording](https://drive.google.com/file/d/12NykJZZy8VgvB4lEbwacjqXsZowI7QhM/view) (36 minutes in).

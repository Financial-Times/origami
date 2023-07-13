---
title: CSS Grid In Chrome 80
description: Users of Google Chrome may recently have seen a broken layout for many of our internal tools and products which use the o-layout component. Users of Firefox, Safari, and other browsers were not affected. In this post we'll discuss what changed in Chrome 80.

author: Lee Moody
---

Users of Google Chrome may recently have seen a broken layout for many of our internal tools and products. Users who did not upgrade Chrome, users of Firefox, Safari, and other browsers were not affected.

In this blog post we'll take a brief look at what changed in Chrome 80 and how it affected us.

## What Happened?

Many of our internal tools such as [bizops](https://biz-ops.in.ft.com/), [sos](https://sos.in.ft.com/), [people finder](https://people-finder.in.ft.com/), the [Origami registry](registry.origami.ft.com/), and even this blog displayed with a visually broken layout for Google Chrome users who upgraded to Chrome 80. Although content was still visible, it made using these sites pretty difficult. Users who did not upgrade Chrome, users of Firefox, Safari, and other browsers were not affected.

All these sites are built with our [o-layout](https://registry.origami.ft.com/components/o-layout) component. `o-layout` uses [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout) to position headers, footers, sidebars, and other key areas of the page at different screen sizes. CSS Grid is great at this. It enables a developer to flexibly position content in columns and rows, a little like a fancy table.

The World Wide Web Consortium (W3C), who help define the web standards which browsers implement, proposed a change to how CSS grid layouts are calculated in a [draft CSS Grid specification](https://github.com/w3c/csswg-drafts/commit/25e3f631310207ed83746530b4066b6278c3234f).

The draft updates how the length of flexible rows or columns, which grow or shrink according to available space, are calculated in certain circumstances. _(More context including why the change was proposed can be found in the [CSS Working Group drafts issue](https://github.com/w3c/csswg-drafts/issues/2177).)_

## How Did That Break o-layout?

The content of our layouts need to keep within the contained width of our header component [o-header-services](https://registry.origami.ft.com/components/o-header-services). To achieve this `o-layout` uses a horizontally centred CSS Grid with a max width to match our header.

<figure>
	<img alt="" src="https://www.ft.com/__origami/service/image/v2/images/raw/https://origami.ft.com/assets/images/2020-02-17-o-layout-chrome-80/firefox-1.png?width=1200&source=origami" />
	<figcaption>
        A basic CSS Grid with a max width. There is a header on one row, a fixed width sidebar on the second row, and also a main content area with flexible size on the second row.
	</figcaption>
</figure>

Using a grid with a max width like this means we can create new layouts with different columns and rows, and have them all contained within the width of our header content more easily.

But [o-header-services](https://registry.origami.ft.com/components/o-header-services) has a background which bleeds to the edge of the screen. To achieve this we set the header width to 100% the browser width. So the header went beyond the width of our grid. We then positioned the header to the left.

<figure>
	<img alt="" src="https://www.ft.com/__origami/service/image/v2/images/raw/https://origami.ft.com/assets/images/2020-02-17-o-layout-chrome-80/firefox-2.png?width=1200&source=origami" />
	<figcaption>
        The grid container with its max width is still centred the same but the header now goes off the edge of the screen.
	</figcaption>
</figure>

<figure>
	<img alt="" src="https://www.ft.com/__origami/service/image/v2/images/raw/https://origami.ft.com/assets/images/2020-02-17-o-layout-chrome-80/firefox-3.png?width=1200&source=origami" />
	<figcaption>
        Now the header is positioned to the left and takes up the full screen width. The grid container is still centred in the same way, with the sidebar and main content area contained in its max width.
	</figcaption>
</figure>


Our sidebar has a fixed width and the main content area is flexible to fill the remaining space in our grid container. In the current [Candidate Recommendation](https://www.w3.org/2019/Process-20190301/#candidate-rec) of the CSS Grid specification our header overflow does not increase the width of the main area. In the draft version of the CSS Grid specification, the main area grows to match the width of our spanning header element and overflows the grid container also. For `o-layout` this caused a wide, misaligned grid with horizontal page scroll.

<figure>
	<img alt="" src="https://www.ft.com/__origami/service/image/v2/images/raw/https://origami.ft.com/assets/images/2020-02-17-o-layout-chrome-80/chrome-2.png?width=1200&source=origami" />
	<figcaption>
        In Chrome 80 the main content area also expands beyond the edge of the screen. The page is now horizontally scrollable.
	</figcaption>
</figure>

<figure>
	<img alt="" src="https://www.ft.com/__origami/service/image/v2/images/raw/https://origami.ft.com/assets/images/2020-02-17-o-layout-chrome-80/chrome-3.png?width=1200&source=origami" />
	<figcaption>
        When the header is positioned to the left, and the page scrolled left, things are looking even worse in Chrome 80.
	</figcaption>
</figure>

## What Was The Solution?

We weren't the only ones who experienced layout issues and it [looks like Google Chrome plan to revert this change](https://bugs.chromium.org/p/chromium/issues/detail?id=1051039) for now. In the meantime we avoided the issue by calculating our CSS Grid Column widths with a `calc` function rather than relying on an overall grid container ([see the PR](https://github.com/Financial-Times/o-layout/pull/127)).

`o-layout` now renders correctly for Chrome 80 users and for both versions of the specification, should the new draft be adopted. Plus, as an added benefit, this change also prevents some annoying horizontal scroll for users who have scrollbars visible at all times. 🎉

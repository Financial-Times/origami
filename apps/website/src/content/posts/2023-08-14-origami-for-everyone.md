---
title: Introducing "Origami for Everyone"
description: Origami For Everyone will support the FT to create differentiated products, targeting different audiences, by scaling Origami to support more brands and platforms.
author: Rhys Evans
publishDate: 2023-08-14
tldr: Origami For Everyone will support the FT to create differentiated products, targeting different audiences, by scaling Origami to support more brands and platforms.
---

**Re-post: This post was [originally published in May, internally, on Confluence](https://financialtimes.atlassian.net/wiki/spaces/OR/blog/2023/05/18/8064925807/Introducing+Origami+for+Everyone).** We decided to publish publicly in the interests of working in the open and sharing our plans more easily with our Nikkei colleagues.

Origami is great, isn’t it? You just read some clear documentation, install a component, write a few lines of code and voila! - your feature is on brand, accessible and on its way to production. You really can’t fault Origami. This is totally your experience right? …right??

![Anakin and Padme 4-Panel meme: Origami is a perfect system, right?](/assets/images/2023-08-14-origami-for-everyone/origami-is-perfect-meme.png?width=500&quality=highest&source=origami)

Unless you work in a team that delivers a product that doesn’t use either the core brand (“FT Pink”) or Internal Products brands (and Internal Products’ coverage is patchy to be perfectly honest). Or you’re a designer and lack clear guidance on which component to use for what, and constantly have to wrangle poorly implemented Figma files into ones you can use in your prototypes. Or you’re working on one of the FT’s new mobile apps and have to basically make it up as you go along, using origami as inspiration to inform your modifications to native app components.

So Origami isn’t great for everyone… but wouldn’t it be nice if it was.

## Why does it matter?

A central theme of the [FT’s product and growth strategy (internal link)](https://inside.ft.com/home/knowledge-base/Product-strategy-2023) is the need to create differentiated products targeting different audiences. Complementing this, the FT’s tech strategy has a focus on delivering more reusable capabilities that can be put together in different combinations in order to create this diverse range of products. Without this approach, each product would need to expend a lot of expensive time and effort reinventing and rebuilding many wheels… which is a right pain if all you want to do is assemble a flashy new car product.

Origami is both a good and bad example of a reusable capability. It’s reused by dozens of different products already, and its small team of 3 engineers delivers an excellent return on investment. Almost everything you see on [ft.com](http://ft.com), other FT pink microsites and many internal products uses Origami to some degree, and those interfaces are (compared to each team building from scratch) extremely high-quality, consistent and quick and easy to build.

However, there are several areas where Origami is not as reusable as it could be. The most obvious one is that we don’t support FT Professional\* or FT Specialist. We’re also not very good at native apps; the FT App (built using web technologies) uses Origami a great deal, but the feedback is that the interactions often feel inferior to other native apps. Our new native apps such as the FT Edit can only make extremely limited use of Origami.

In order to support the product and tech strategies we want to address these limitations, hence Origami for Everyone :raised_fist:

\*well, we do a little, but in a hacky unsustainable way

## What do we mean by “Origami for Everyone”?

The vision for the Origami for Everyone project is that

The Origami design system enables the discovery, design and build of every user-facing product the FT and its partners delivers.

There are three ways we can make Origami more integral to the delivery of every product.

### For every brand

Currently there is a lot of work involved in making a component look right in a product that uses a different brand. Our goal is that once the work is done to build a component for one brand, then we can sustainably extend it, with relatively little effort, to make it usable everywhere else too.

### For every discipline

The documentation and implementation of components for engineers is far more complete and of far higher quality than that for designers. We aim to produce resources of a similar high standard for designers, closely coordinated with the engineering tooling. This will make designing and prototyping with Origami easier, improve the discovery process for product managers, and also result in quicker and more accurate handover to engineering.

### For every platform

At present Origami delivers a single implementation of components for use in websites. We want to build out from this foundation to support completely different platforms, such as iOS and android, but also to provide closer integrations with commonly used web development frameworks such as React.

## How are we going to make it happen?

Can you keep a secret? - we’ve already started!!!

We’re actively recruiting a new designer to lead on the design side of Origami. This is big news, meaning for the first time we can really take a strategic approach to design decisions in Origami, and will be far less reliant on ad hoc contributions from designers who support Origami but have other jobs to do. It also means the resources that designers use - Figma components and design guidance - will be far better maintained.

We’ve been conducting a lot of research into design tokens (the emerging industry standard for synchronising design decisions across multiple platforms and themes), and you can read more in two blog posts by Ben Freshwater ([Internal Post 1](https://financialtimes.atlassian.net/wiki/spaces/OR/blog/2023/04/20/8047034476/Origami+Team+Trials+Design+Tokens), [Internal Post 2](https://financialtimes.atlassian.net/wiki/spaces/OR/blog/2023/04/26/8049524875/Conventions+for+Origami+Design+Tokens)). Design tokens will almost certainly form the backbone of the new implementation of Origami, and we’re already pleased with the results of our experiments.

> new implementation of Origami?

Yes - the changes needed to make this happen will be quite fundamental, and extremely challenging to roll out in the existing set of origami components. We will be working on new experimental versions of low level components such as buttons over the next few months. We’ll be blogging more about this soon and are really keen to get your input on all sorts of tricky decisions.

Finally, we’re talking to product and tech leads in each group to both feed into our delivery roadmap and make sure everyone’s expectations are aligned. We have a few ideas for things we could deliver early on that will hopefully be useful to all our users, but as we’re still exploring I’ll leave that to the other team members to announce when we’re closer to delivering them.

## What does this mean for you?

In order to free up time to pursue the strategic work on Origami for Everyone we will have reduced capacity for adding new components and features to the existing Origami implementation (old-igami?). It’s still always worth a conversation with us to discuss your needs though, and we will be proactively working with people in every group to flag up requirements well in advance and schedule time to help you get the most important features shipped. We’ll be introducing a new feature request process to help us manage that and prioritise the most important things to work on.

We will also be seeking feedback on our proposals for the new origami architecture as it applies to both technology and design. One thing that’s clear from speaking to design system teams at other companies is that design systems are very tricky to do well, and there are lots of trade-offs in the patterns chosen; we’re going to need your input to make sure we make the right choices for the FT.

## Where we’re going with all this

I’ve talked a lot about the reasons for pursuing this project, the impact on different types of users, and some of the approaches we’ll be following. To sum it up crisply, here are a few soundbites on what things are like now and how, with Origami for Everyone’s help, we think they’ll be in the future.

<div class="o-table-container">
	<div class="o-table-overlay-wrapper">
		<div class="o-table-scroll-wrapper">
			<table class="o-table o-table--horizontal-lines o-table--responsive-overflow" data-o-component="o-table" data-o-table-responsive="overflow" data-o-table-sortable="false">
				<thead>
					<tr>
							<th>Now</th>
							<th>Future</th>
					</tr>
				</thead>
				<tbody>
					<tr>
							<td>One fully supported brand</td>
							<td>Unlimited brands</td>
					</tr>
					<tr>
							<td>Web only</td>
							<td>Web, native mobile + other platforms</td>
					</tr>
					<tr>
							<td>Discovery held up by slow prototyping</td>
							<td>User-testable experiments in hours</td>
					</tr>
					<tr>
							<td>Inconsistent, untidy UIs</td>
							<td>Premium look and feel everywhere</td>
					</tr>
					<tr>
							<td>Weeks to ship a new UI</td>
							<td>Days to ship</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>

We think that achieving these goals will really have a huge impact on product delivery at FT. And everyone’s invited to the party 🎉.

If you’d like to get involved or follow along come and join the [#design-system-guild](https://financialtimes.slack.com/archives/C01481FKWA2) channel in slack

<figure>
	<img src="/assets/images/2023-08-14-origami-for-everyone/origami-for-everyone.png?width=500&quality=highest&source=origami" alt="Four different arms link together in the shape of the Origami logo.">
	<figcaption>The Origami for Everyone logo (with thanks to Emms Bevan)</figcaption>
</figure>

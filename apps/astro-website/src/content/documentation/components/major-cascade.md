---
title: Major Cascade
description: When releasing major versions of low level components such as o-typography, o-colors, or o-buttons many projects and teams across different Financial Times groups are affected. This we call a Major Cascade. This page explores what we mean by a  Major Cascade in more detail and notes areas to consider when releasing major versions of low level components.
cta: Read more about Major Cascades

collection_listing_display: false

---

# Major Cascade

Major releases of low level components such as o-typography, o-colors, or o-buttons affect many projects and teams across different Financial Times groups. That's because a major release of one project requires a major release of dependent projects that use them, and projects that use those projects, and so on. This is what we call the Major Cascade.

This page explores what we mean by a  Major Cascade in more detail and notes areas to consider when releasing major versions of low level components.

## Definition

<aside>
Some content in the definition section is taken directly from the <a href="https://origami.ft.com/blog/2019/10/31/major-cascade/">2019 Major Cascade blog post</a>.
</aside>

The Origami team maintain around 52 front end components. A component is a shared piece of user-interface which, along with other components, is used to build a webpage.

Some components are low level — fundamental building blocks used to build many other components and end products. o-typography is an example of a low level component.

Other components are high level — complex components which are used in end products and rarely used to build other components. o-table is an example of a high level component.

As low level components are used to build other components there are more projects between them and the end product. To make major changes to a low level component means upgrading each project in-between step by step.

The below is an example graph of product dependencies. Low level components o-colors and o-typography branch out; they are included in final products directly and indirectly via other components including o-table. In reality the graph is much more complex because many projects comprise "ft.com".

<img alt="" src="/assets/images/2019-10-31-major-cascade/all-graph.svg" />

Dependencies on o-typography, a low level dependency, are a large portion of the overall graph. Components in-between including o-buttons and o-table must be upgraded before the end products can be upgraded.

<img alt="" src="/assets/images/2019-10-31-major-cascade/typography-graph.svg" />

Dependencies on o-table, a high level dependency, are a small portion of the overall graph. If a major version of o-table is released the end products may be updated immediately.

<img alt="" src="/assets/images/2019-10-31-major-cascade/table-graph.svg" />


When we talk about "The Major Cascade" we are referring to the process of organising and rolling out new major component releases through the graph step-by-step. Starting with other components, through intermediary projects, until end products are on the latest version.

## Things To Consider

For the last Major Cascade (November, 2019) we communicated upcoming changes via Slack announcements, email newsletters, a blog post, and meetings with principle engineers and delivery teams in the months prior to releasing upgraded Origami components.

For some of our users communication of the upcoming changes with an open offer of support seemed sufficient for them to upgrade their projects at a time appropriate for their team. For the Customer Products group, who maintain a large number of interconnected projects of varying ages, an upgrade of low level components was more challenging.

To upgrade Customer Products projects first they had to figure out what projects were involved and the order of migration which can be [seen in this Google Sheet](https://docs.google.com/spreadsheets/d/1cmxGQp5ZgtAwSkS8Rww_4vk8xvN-GB9iAhNQf9iwcYs/edit#gid=1320807547) (made using a modified version of [origami-migration-guru](https://github.com/financial-times/origami-migration-guru)). With the support of the delivery team a group of engineers then worked on the migration over two weeks (around 10-12 in all, although not all for the full two weeks), with a long tail and few engineers to finish as we ran out of time and the end of December approached. The Origami team also supported directly with migration work. It's this part particularly that makes updating low level components challenging. Why did we approach the Customer Products Major Cascade this way?

### Order

The reason we have to upgrade step by step through dependent projects is that two versions of the same component cannot be used at the same time. In other words we enforce a flat dependency tree, because:
- Design consistency (e.g. if o-colors removes a colour usecase, we should stop using it not include two versions of o-colors).
- Performance (e.g. only one version of a component should be downloaded / parsed by a client).
- We don't support otherwise (e.g. it's likely to cause errors if two versions of a component are initialised on a page).

As a real world example at the time of the last Major Cascade (November, 2019): To upgrade `next-article` to use a new major version of `o-colors` we first had to upgrade its dependency `n-ui`, but to upgrade `n-ui` we had to upgrade its `n-handlebars` dependency first, to upgrade `n-handlebars` we had to upgrade `n-topic-card` first, to upgrade `n-topic-card` we had to upgrade `n-myft-ui` first, etc, etc...

### Speed

When a project is upgraded to a new major version of a component, projects which depend on the upgraded project are blocked from updates until they also upgrade to the new component version. For a complex dependency graph this can block teams from deploying new features until the Major Cascade is complete — unless they maintain two versions of their project (one which depends on the previous component major, and another which has upgraded). Speed in completing the Major Cascade is important to ensure teams are not blocked and can continue to deliver features and bug fixes, without the overhead of duplicating their work by maintaining two versions of their project.

For instance as of the last Major Cascade (November, 2019) `n-myft-ui` was used by `next-search-page` as well as `next-article`. If the Tailored Experiences team upgraded their projects to the latest version of `o-colors` quickly, including `n-myft-ui`, they would not be able to roll out new `n-myft-ui` features to `next-search-page` until it and all of its dependencies are upgraded to the same major version of `o-colors`. This would block the Tailored Experiences team from rolling out new features and bugfixes, unless they duplicated their effort and backported changes to a previous major version of `n-myft-ui`.

### Ownership

Related to [Speed](#speed), if teams upgrade their projects at different rates then they may become blocked by a different team with different pressures/priorities. In addition some projects in the migration chain may not have an owner at all. A dedicated migration team can coordinate and take ownership of such projects for the purposes of completing the Major Cascade quickly.

### Knowledge Sharing And Feedback Loops

A group of people bought together from different teams can share solutions to issues raised by the migration and feedback to the Origami team in real time.

## Summary

- Upgrades must happen in order as Origami requires a flat dependency tree (all project dependencies have to be using the same major version of a component).
- After all Origami components have been upgraded, many teams are able to upgrade at their own convenience, one project at a time.
- Some groups who manage large, complex dependency graphs (like Customer Products) may need a dedicated time and team to coordinate a roll out, with direct Origami support.

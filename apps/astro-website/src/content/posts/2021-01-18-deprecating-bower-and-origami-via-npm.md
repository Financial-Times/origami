---
title: Migrating Origami Components to npm and Deprecating the FT Bower Registry
description: We are migrating Origami Components from Bower onto the npmjs registry, this will be done by the end of Q2. Once the Origami Components are on npm, the versions on Bower will go into a deprecated state where they have no new features added. Products/Projects which want to get new Origami designs and features will need to migrate to npm.
author: Jake Champion
publishDate: 2021-01-18
tags:
- Newsletter
---

We are migrating Origami Components from Bower onto the [npmjs registry](https://www.npmjs.com/), this will be done by the end of Q2. Once the Origami Components are on npm, the versions on Bower will go into a deprecated state where they have no new features added. Products/Projects which want to get new Origami designs and features will need to migrate to npm.

We are also deprecating the [Bower Registry](https://origami-bower-registry.ft.com/), it will be placed into a maintenance only mode for 12 months and then we will look to decommission the service completely.

We recommend that all products/projects which use Bower migrate over to using the [npmjs registry](https://www.npmjs.com/).

## Will the Origami team provide migration support?

Yes, the team has done several migrations of our services and components in the past and know that helping our users migrate is very important.

We will be providing migration guides for every individual Origami component, as we have done in the past.

We will also provide written guidance on how to migrate a project from Origami via Bower to Origami via npmjs.

We are contactable via the Slack channel [#origami-support](https://financialtimes.slack.com/archives/C02FU5ARJ) if you want to speak to the team.

For teams which have too much to migrate on their own, we may be able to help migrate your products for you. If you would like our help migrating your products, please let us know in advance as there are only 3 of us, we won&#39;t be able to help every team.

## What is the timeline for this work?

1st July 2021 - Origami Components moved from Bower to npm and guides to migrate are written

1st July 2021 - Deprecate the FT Bower Registry

1st July 2022 - Decommission the FT Bower Registry

## Who does this affect?

This affects every product/project which uses the FT Bower Registry. We&#39;ve done a search across the entire Financial-Times GitHub account and collated all the projects which are affected and will need to migrate to an alternative Bower registry or off Bower completely. This [google spreadsheet](https://docs.google.com/spreadsheets/d/1Pem5e6cR0aiuKpYa7VD08AnSSynzjRtWt_VAHAoyhPQ/edit#gid=0) contains all the systems which are affected.

## Do I need to do anything right now?

No you do not. If you are using any Origami Components via the Bower Registry then you will need to wait until we have migrated those Origami Components to the npmjs registry, which should be complete by the end of Q2. We will have guides on how to migrate from Bower to npm.

## How much time/effort will I need to allocate to this Q3 onward

The time/effort varies drastically across products.

We know this will be a very big effort for Customer Products because they have many things on Bower themselves as well as having abstractions on top of Origami which will need to be migrated before they can migrate their products.

For Internal Products the effort should be smaller than Customer Products because they don&#39;t have extra abstractions to migrate first before migrating their products.

For FT Professional the effort should be the same as Internal Products.

Below is a breakdown of how many systems and repositories will need to be migrated, split by group:

<div class="o-layout__main__single-span">
    <table class="o-table o-table--row-headings o-table--horizontal-lines" data-o-component="o-table">
    <thead>
        <tr>
        <th>Group</th>
        <th>Systems to migrate</th>
        <th>Repositories to migrate</th>
        </tr>
    </thead>
    <tbody>
        <tr>
        <td>Customer Products</td>
        <td>25</td>
        <td>74</td>
        </tr>
        <tr>
        <td>FT Core</td>
        <td>2</td>
        <td>10</td>
        </tr>
        <tr>
        <td>FT Professional</td>
        <td>4</td>
        <td>6</td>
        </tr>
        <tr>
        <td>Internal Products</td>
        <td>4</td>
        <td>2</td>
        </tr>
        <tr>
        <td>Operations &amp; Reliability</td>
        <td>3</td>
        <td>41</td>
        </tr>
    </tbody>
    </table>
</div>

## How are you tracking the migration progress?

We can detect when the relevant repos have been updated to remove Bower. Using that data, once a week we will update:

- This [google spreadsheet](https://docs.google.com/spreadsheets/d/1Pem5e6cR0aiuKpYa7VD08AnSSynzjRtWt_VAHAoyhPQ/edit#gid=0), which contains the data for the table above.
- The associated [entry in the Risk Register](https://biz-ops.in.ft.com/Risk/origami-components-via-bower) which is linked to all the affected systems that we know of.

## Why is this happening?

The front-end community at large has already moved away from using Bower for their projects and has moved to using npm. This change can also be seen within the FT, as some individual teams have already moved onto npm. Due to fewer projects using Bower, the amount of infrastructure and tooling which exists that supports Bower has been decreasing or not been kept up-to-date with the advancements in the rest of the front-end industry. Origami has had to invest lots of time and energy into creating new tools and infrastructure to support Bower.

The Origami project was stuck using Bower due to other software registries not having the features that Origami required. This is no longer the case with the latest release of npm. With the Origami project migrating off Bower and onto npm, it enables us to deprecate the Bower Registry and accompanying infrastructure and tooling which has become a large piece of technical debt we have.

## What benefits does this give the FT?

- Saving £1,200 per month from our Heroku bill
- This will align the FT&#39;s front-end practices with those now most commonly used across the industry which will help improve the onboarding of new hires to projects.
- The Origami project will be able to use many of the 1.5 million packages which exist on the npmjs registry, greatly reducing the amount of code/features we currently have to write ourselves.
- The Origami team will be able to invest more time on the Origami project and services, which are used across many of the FT Group&#39;s products.
- It will be easier for our engineers to get started using or contributing to the Origami project.

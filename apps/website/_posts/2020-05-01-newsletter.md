---
title: Origami Newsletter, April 2020
description: This issue features the Origami Component Survey, Automating Visual Testing of Origami Components and moving from CircleCI to GitHub Actions
author: Jake Champion
tags:
  - Newsletter
---

<abbr title="Too long; didn't read">
	<strong>
	TL;DR:
	</strong>
</abbr> {{page.description}}

## Top Things

These are some of the bigger things we've done over the last month.

### Origami Components Survey

This quarter we are aiming to find out what our users know about Origami, how much of Origami they use and how we can improve our products for all of our users.

Our first survey has already gone out, it was to find out how we can help teams build their own Origami Components. You can read more about the survey results [on our blog](/blog/2020/04/20/origami-survey-results/).

### Automated Visual Regression Testing

When reviewing changes made to an Origami Component, we have to view the component in multiple browsers, at mulitple resolutions and mulitple different configurations for the component. This is to check if any visual bugs have been introduced accidentally as part of the change. It is a rather taxing and manual piece of work.

We've automated all of that manual work now. Now when a change is made to an Origami Component, if the change has caused any of the visual aspects of the component to be different we are made aware of those changes and can quickly review and approve the work.

This work has already proved to be useful by immediately finding a visual regression for a change in o-teaser, which we were able to fix before it went live on any website.

<img width="980" alt="Screenshot which shows the visual regression tooling working on the o-teaser component" src="https://user-images.githubusercontent.com/1569131/80602987-bc8df900-8a27-11ea-84b2-1329c45a3d3b.png">

### Moved from CircleCI to GitHub Actions

We've moved all of our automated tooling which was on CircleCI to GitHub Actions. This should shorten the size of the CircleCI queue for every FT project, making everyone's feedback loop shorter.

Moving to GitHub Actions has helped us manage all our repositories by making it simple to automate types of work such as releasing changes and adding tickets to our project board.

As part of this work we've also made a [GitHub Action for the Operations & Reliability Change API](https://github.com/Financial-Times/change-api-action/).


## Special Thanks

This months special thanks goes to all the people who filled in our first survey. You all are helping to improve Origami, thank you.

## Broader Update

A digest of other things that have happened since our last update:

o-share got a new design built for a small variation which will be used on live blogs <img src='https://user-images.githubusercontent.com/10405691/78160045-4f447380-743b-11ea-88c7-62660222f125.png' alt='the new o-share small variation' />

o-share also got improved accessbility and analytics support thanks to Glynn Phillips in Customer Products.

o-quote now has an editorial style thanks to Josh from the Content Innovation team.
<img src='https://user-images.githubusercontent.com/10405691/78697295-82ce4480-78f8-11ea-99af-278ea5eae152.png' alt='the new o-quote editorial design' />

o-editorial-layout uses the new editorial quote style from o-quote <img src='https://user-images.githubusercontent.com/10405691/80201001-5ebe7300-861b-11ea-98c1-8c4448db4f25.png' alt='new editorial quote style in o-editorial-layout' />

o-teaser uses a new design which updated the spacing thanks to Eray and Mark from the Apps team.

polyfill-library fixed a bug for `Map` support in Internet Explorer

polyfill-library also added `Object.fromEntries` support in Internet Explorer

polyfill-library fixed a bug in `HTMLCanvasElement.prototype.toBlob` for Edge

polyfill-library added `URLSearchParams.sort` and `CSS.Supports` support for all browsers


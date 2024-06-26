---
title: Origami Newsletter, February 2021
description: This issue is a big one. It covers our progress toward the recently announced npm migration; a new Origami Image Service placeholder image feature; a new Origami Build Service feature to help teams keep components up to date; and a whole bunch more.
author: Lee Moody
publishDate: 2021-03-02
tags:
- Newsletter

custom_email_slug: 2021-01-01-newsletter

---

## Top Things

Some of the bigger Origami news since our last issue:

### Dropping Bower Support

We've been making excellent progress towards migrating Origami components from Bower to the npmjs registry. Origami tooling has been updated, and services such as the Origami Build Service are almost ready too.

With the release of npm7 [we think now is a good time to drop Bower support](/blog/2020/10/28/newsletter/#new-proposal-to-drop-bower-support). To find out what it means for your team, and what benefits we hope to achieve, see [last month's announcement](/blog/2021/01/18/deprecating-bower-and-origami-via-npm/).


### Placeholder Images

The [Origami Image Service](https://www.ft.com/__origami/service/image/v2/) can now generate placeholder images at specified dimensions and quality. It's a super useful feature to support prototypes and testing. 🎉

Here's an example placeholder request, for an image that's 500px square, of maximum quality:

```
https://www.ft.com/__origami/service/image/v2/images/placeholder/?width=500&height=500&quality=lossless&source=test
```

![A placeholder image which displays the width, height, format, and quality of the image requested as text within the image.](https://www.ft.com/__origami/service/image/v2/images/placeholder/?width=500&height=500&quality=lossless&source=test)



### Build Service Updater

The [Origami Build Service](https://www.ft.com/__origami/service/build/) helps teams include [components](https://registry.origami.ft.com/components) in projects quickly, without having to worry about setting up potentially complicated build steps. However it can be tricky to know when a Build Service request is out of date, and including old versions of components which could be upgraded. Now the Build Service has a [URL updater page](https://www.ft.com/__origami/service/build/url-updater) which can check a Build Service URL and let you know which of your components are out of date.

![The Build Service updater. For a given Build Service URL it displays a table of requested components which shows the requested version, the latest version, whether it is out of date or not, and where to find migration guides to upgrade as required.](https://www.ft.com/__origami/service/image/v2/images/raw/https://origami.ft.com/assets/images/2021-03-02-newsletter/build-service-updater.png?quality=highest&source=origami)

## Special Thanks

Huge thanks to Erin Ferguson for helping us write [last month's announcement](/blog/2021/01/18/deprecating-bower-and-origami-via-npm/) and for organising training for the team, we can’t wait and look forward to sharing what we learn!

## Broader Update

A digest of other things that have happened since our last issue:

- DEPRECATED: [o-assets](https://github.com/Financial-Times/o-assets) has been deprecated since it is not used widely and will no longer work for npm only components. There is a new [proposal for how we could build with unique component assets](https://github.com/Financial-Times/origami/pull/102) in the future.
- MAJOR: [o-test-component](https://github.com/Financial-Times/o-test-component) has been updated to follow V2 of the Origami Specification, which drops support for Bower. It will support the testing of Origami tools and services as we migrate.
- MINOR: [o-footer-services](https://github.com/Financial-Times/o-footer-services) adds "a Nikkei company" brand strip, similar to `o-footer`.
- MINOR: [o-icons](https://github.com/Financial-Times/o-icons) adds a label, label outline, and restore icon.
- MINOR: [o-share](https://github.com/Financial-Times/o-share) adds a new "corporate" share icon to support an experimental enterprise feature, super-gifting.
- MINOR: [o-tracking](https://github.com/Financial-Times/o-tracking) improves efficiency when multiple calls are made to `oTracking.click.init`.
- MINOR: [origami-build-service](https://github.com/Financial-Times/origami-build-service) has had some significant updates. First, we identified and fixed a [cross site scripting](https://owasp.org/www-community/attacks/xss/) vulnerability in the demos endpoint — did you know [Github adds references for forked pull requests to your repository](https://git-scm.com/book/id/v2/GitHub-Maintaining-a-Project)? Second, we have an experimental V3 api (a work in progress) which will support [npm only Origami components](/blog/2021/01/18/deprecating-bower-and-origami-via-npm/) and drop features we no longer require. Third, we added the URL Updater discussed above.
- MINOR: [origami-image-service](https://github.com/Financial-Times/origami-image-service) adds a new placeholder feature, as discussed above.
- MINOR: [origami-labels](https://github.com/Financial-Times/origami-labels) adds support for beta releases (when working on an Origami component you can now add a `release: beta` github label to release a beta version on merge).
- MINOR: [origami-specialist-title-logos](https://github.com/Financial-Times/origami-specialist-title-logos) adds FT Forums logos.
- MINOR: [Polyfill Service](https://github.com/Financial-Times/polyfill-library) has seen a number of improvements since our last update.
   - Improvements in CI: Dramatically reduced the time it takes to complete by only testing the polyfills which have changed. Updated to test against the latest versions of all browsers.
   - New polyfills: `Element.prototype.getAttributeNames`, `HTMLSelectElement.prototype.selectedOptions`, `URL.prototype.toJSON`
- PATCH: [o-colors](https://github.com/Financial-Times/o-colors) ensures saturation and luminance values are percentages to stop Sass deprecation warnings from being emitted.
- PATCH: [o-cookie-message](https://github.com/Financial-Times/o-cookie-message) prevents [back/forward cache](https://web.dev/bfcache/) from showing the cookie message after a reader has already accepted or rejected cookies (credit to Oliver, nice!)
- PATCH: [o-grid](https://github.com/Financial-Times/o-grid) is less annoying. Did this Sass warning get you down?  "WARNING: The 'snappy' grid mode is deprecated and will be removed in the next major version of o-grid..." We've removed the warning since the snappy grid is still used on the stream and article pages of ft.com, with no immediate plans to redesign them for the default, fluid grid which new projects use. Warnings should be useful, not frustrating.
- PATCH: [o-layout](https://github.com/Financial-Times/o-layout) fixes overflow on viewports smaller than the max container width, where content may wrap or scroll instead.
- PATCH: [o-topper](https://github.com/Financial-Times/o-topper) has received a number of visual improvements and bug fixes. Thanks Keran (😭🇨🇦), Gus, and Nick for your work on that.
- PATCH: [o-video](https://github.com/Financial-Times/o-video) fixes a bug which caused video playback to hang when ads failed to load (thanks again to Gus for that one).
- To support the switch to npm more Origami tools and services have been updated or received major/beta releases, including:
   - [create-origami-component](https://github.com/Financial-Times/create-origami-component)
   - [origami-build-tools](https://github.com/Financial-Times/origami-build-tools)
   - [origami-bundle-size-cli](https://github.com/Financial-Times/origami-bundle-size-cli)
   - [origami-ci-tools](https://github.com/Financial-Times/origami-ci-tools)
   - [origami-percy](https://github.com/Financial-Times/origami-percy), Origami's visual regression tester
   - [origami-version](https://github.com/Financial-Times/origami-version)
   - [remark-preset-lint-origami-component](https://github.com/Financial-Times/remark-preset-lint-origami-component)


---
title: Origami Newsletter, March 2021
description: Updated Origami workshops. Work has begun to migrate Origami to npm. Reminder, we deprecate FT's Bower Registry in July. 2021 and plan to decomission in July 2022.
author: Jake Champion
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


### Update on the migration to npm (dropping Bower support)

During January we announced our plan to [decommission the FT Bower Registry and migrate to the public npm registry](https://origami.ft.com/blog/2021/01/18/deprecating-bower-and-origami-via-npm/#who-does-this-affect).

Work has now started on migrating the Origami components onto npm, 8 out of 66 of our component are now migrated, ready to be released. We aim to have all components, including documentation/guidance for how to migrate your products, complete by the start of Q3.

As a reminder, below is a copy of our planned timeline to decommission the FT Bower Registry.

1st July 2021 - Origami Components moved from Bower to npm and guides to migrate are written

1st July 2021 - Deprecate the FT Bower Registry

1st July 2022 - Decommission the FT Bower Registry



### New “Introduction to Origami” dates

Please join us on 26th April for updated Introduction to Origami sessions! ✨

Part 1 is useful for anyone who works in Product and Technology – we cover things at a high level rather than diving into too many technical details, including:

- Origami History
- Origami Components
- Origami Services
- Origami Collaboration

Part 2 will explore components in more depth, including some technical details. It will be of particular interest to engineers and designers, although anyone is welcome:

- Documentation
- Languages & Tools
- Structure
- Versioning
- Origami Build Service / Manual Build
- Practical Tutorial (optional)

We'll be running these on the 26th April, at a time suitable for London and Sofia. We'll share a recording for those who can't make it, but it would be great to see you there! Please let us know if you or someone on your team would like an invite.


### Guidance on how to customise an Origami component

We now have a page to help our users decide if they need to customise an Origami component, and if so, how to go about it in a safe, supported way which should reduce the chance of the customisation breaking in the future.

Please [have a read through the page](https://origami.ft.com/docs/components/customisation/) and let us know of any feedback you may have or suggestions for other topics we could write guidance for.


## Special thanks

We recently had an uptick in the amount of security researchers wanting to submit reports about potential issues on [polyfill.io](https://polyfill.io). We'd like to thank the Cyber Security team for communicating with the security researchers and reviewing their reports for us.

## Broader update

A digest of other things that have happened this month:

- [Financial-Times/o-fonts](https://github.com/Financial-Times/o-fonts)
   - FinancierDisplayWeb was added to support Specialist Titles

- [Financial-Times/o-layout](https://github.com/Financial-Times/o-layout)
   - To support the ongoing microsite project, o-layout now support the master brand for default, bleed, documentation layouts.
      - Support was also added for the `figure` element in the `o-layout-typography` wrapper.

- [Financial-Times/o-tracking](https://github.com/Financial-Times/o-tracking)
   - A couple of bugs were found and fixed which were sending invalid or duplicate events to Spoor:
      - Duplicate click events from multiple browser contexts
      - Fix bug where loading spoor-id from the cookie would silently fail

- [Financial-Times/origami-build-service](https://github.com/Financial-Times/origami-build-service)
   - Several updates were made in preparation for origami components being on npm:
      - Added autoprefixer for css and using the same browser config as origami-build-tools.
      - Only allows @financial-times namespaced components to be requested in v3.
      - Renamed the modules and module query parameters to components and component in v3.
      - Implemented the /v3/demo and /v3/demo/html endpoints.
   - A security vulnerability was found and fixed by the Origami team:
      - Deprecated the use of `modules` for anything that's not in the allow-list.

- [Financial-Times/origami-build-tools](https://github.com/Financial-Times/origami-build-tools)
   - Make `obt test --debug` watch for changes and rebuild tests.
   - Several updates were made in preparation for origami components being on npm:
      - Add validation for package.json.browser field
      - Add validation for package.json.name field
      - Improve tests for verify-package-json
      - Remove unused component fixture
      - Verify package.json manifest has description and keywords
      - expect origamiVersion to be the "2.0" string

- [Financial-Times/origami-repo-data](https://github.com/Financial-Times/origami-repo-data)
   - Several updates were made in preparation for origami components being on npm:
      - Only read `keywords` property from the package.json manifest and not origami.json or bower.json
      - Allow origami version to be the "2.0" string
      - use v3 of the build service for spec v2 components
      - Correct the languages property of spec v2 component versions

- [Financial-Times/create-origami-component](https://github.com/Financial-Times/create-origami-component)
   - Several updates were made in preparation for origami components being on npm:
      - Moved description and keywords to the package.json instead of origami.json

- [Financial-Times/polyfill-library](https://github.com/Financial-Times/polyfill-library)
   - Added a polyfill for Element.prototype.getAttributeNames

- [Financial-Times/o-message](https://github.com/Financial-Times/o-message)
   - Match padding left and right given a close button and centred message
   - Align feedback notices centre when there is one line of copy.

- [Financial-Times/o-forms](https://github.com/Financial-Times/o-forms)
   - Allow multi-line box-style radio button copy, making them taller.
   - Transparent radio buttons can make them look inactive
   - Add a white background to internal brand radio inputs.

- [Financial-Times/o-topper](https://github.com/Financial-Times/o-topper)
   - Include default link style for toppers with colour

- [Financial-Times/o-share](https://github.com/Financial-Times/o-share)
   - Make the new corporate icon from fticons available in o-share

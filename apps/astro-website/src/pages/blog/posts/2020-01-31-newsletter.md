---
title: Origami Newsletter, January 2020
description: This issue features some changes to our Slack channels, a replacement for the Origami Open Meeting, an update on the Major Cascade, and a number of polyfill.io improvements including a new nodeJS library.
author: Rowan Manning
tags:
  - Newsletter
---

<abbr title="Too long; didn't read">
	<strong>
	TL;DR:
	</strong>
</abbr> {{page.description}}


## Top three things

These are some of the bigger things we've worked on since our last update at the end of November.

### Slack Channels

We've reorganised our Slack channels in an attempt to be more open and transparent about the way we work, more welcoming, and to make it clear where you can ask for help and support. We now have several channels that you can join for different purposes:

  - [#origami-support](https://app.slack.com/client/T025C95MN/C02FU5ARJ) (previously #ft-origami) is a place to come and ask questions if you need our help. No question about Origami is too small, we're always happy to lend a hand
  - [#origami-chat](https://app.slack.com/client/T025C95MN/CSW6B2VAN) (previously a private channel) is where we'll be discussing work happening in Origami, sharing proposals, and working on our longer-term goals. Anyone's free to join in and help shape Origami going forward
  - [#origami-standup](https://app.slack.com/client/T025C95MN/CT0HFCKQX) for those who are _super_ interested in what we're doing day-to-day, this is where we share our morning update. Probably too much information for most, but we're doing this publicly now to be more transparent


### Origami Office Hours (ooh?)

The Origami Open Meeting has been around since the team originally formed (I couldn't find the exact date for the first one, but it was in 2013). One of its original purposes was to discuss Origami's progress with people from other areas of Product and Tech, but it has slowly evolved into more of a support forum.

We've been reassessing this meeting and have made some changes. Introducing Origami Office Hours! We'll be hosting an hour-long session weekly but from now on it will be in the 3rd Floor breakout area of Bracken House. We'll have a hangout link for our colleagues in Sofia and will make sure the meeting is accessible to people who prefer to dial in.

The agenda will be public and editable, and the session will be split in two: the first part will be dedicated to helping people who prefer to speak to the team at a set time, the second part will be a backlog grooming session for us which anyone is free to attend and contribute to.

We'll be setting up invites soon and hope to see some of you there! Keep an eye on Slack and your calendars (also feel free to respond to this email and ask to be included).


### Major Cascade

At the end of last year a lot of Origami's time was spent working in Customer Products on the Major Cascade. This is where Origami release new major versions for each of our components, and it has an impact on teams using these components (for those interested in what a Major Cascade is and why we were doing it, [Lee wrote a blog post](/blog/2019/10/31/major-cascade/)).

Now that the work to migrate Customer Products is largely finished, we're available to help out in other areas of Product and Tech for anyone who needs it. If you're having difficulty migrating, then please give us a shout and we'll arrange something.


## Special thanks

We have a few people to thank, especially as we didn't send a December newsletter!

So special thanks go to everyone from Customer Products who helped with the Major Cascade, particularly Edd Sowden who coordinated engineering effort, and Allison Bayer who helped with delivery. It was nice to work more closely with you all, and although it was a bit of a slog we got there in the end!

We'd also like to say thanks to everyone who's attended or is attending an Introduction to Origami session. Your feedback is really useful and we're able to keep improving it thanks to your input!


## Broader update

A digest list of other things that have happened:

  - NEW: [polyfill-library-node](https://github.com/Financial-Times/polyfill-library-node). An FT alternative to core-js for nodeJS environments. Loads all ECMAScript-262 (excluding annex-B) polyfills into nodeJS.
  - MAJOR: [polyfill-service-url-builder](https://github.com/Financial-Times/polyfill-service-url-builder) now works with browserslist configuration.
  - MINOR: [polyfill.io](https://polyfill.io/) polyfill targeting was updated for Edge and other browsers so our users can all expect slightly faster load times.
  - MAJOR: All Origami maintained components have been updated as part of the [major cascade](/blog/2019/10/31/major-cascade/)), with some follow up releases to fix bugs or improve documentation &#8212; thanks to everyone who contributed.

*[TL;DR]: too long; didn't read

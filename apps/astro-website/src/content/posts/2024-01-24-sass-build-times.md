---
title: Sass Build Times
description: Sass build times got you down? Let us know.
author: Lee Moody
publishDate: 2024-01-24
---

We've heard some teams at the FT are struggling with slow Sass build times. Friction between making a change and seeing the result can be pretty painful, right! It slows down our ability to iterate and deliver, and gives ample opportunities for distraction... and doom scrolling... as we wait.

We can't blame Sass too much, it's wonderful, but we have a large estate of complex Sass that has become slow. In our view, now is the time to migrate away from Sass.

## What Origami is doing

1. We presented a [Sass to CSS proposal](https://docs.google.com/document/d/1RuGduWdX0zGsgsp9C7lIhXgqEia6sWK900_3XVwYDIM/edit#heading=h.1f3yolavobef) which is endorsed by our technology governance group (TGG).
1. We're working on [a new suite of "o3" Origami components](https://origami-for-everyone.ft.com/components/buttons/), so Origami won't require you to use Sass in the future.
1. We've implemented Sass build time monitoring across key Customer Products projects – including local builds. This will help us make a case to invest in migrating away from Sass more quickly.

![A console log within a terminal, sharing that the person has in total waited 2.7 hours for Sass to compile.](/assets/images/2024-01-24-sass-build-times/sass-css.png?width=500&source=origami)


## How you can help

1. Share your experience in [#sass-to-css](https://financialtimes.enterprise.slack.com/archives/C06FD4DSBQB)! Feel free to have a good moan. If you're using a project with Sass monitoring in place, share your total build time and we'll see who is waiting the longest 😬
1. Become an early adopter of our [new Origami components](https://origami-for-everyone.ft.com/components/buttons/), which don't use Sass. Let us know you're interested in [#origami-chat](https://financialtimes.enterprise.slack.com/archives/CSW6B2VAN) and we'll help you get started.
1. Write less Sass yourself and refactor custom variables, functions, or mixins. Our [Sass to CSS proposal](https://docs.google.com/document/d/1RuGduWdX0zGsgsp9C7lIhXgqEia6sWK900_3XVwYDIM/edit#heading=h.1f3yolavobef) includes examples of FT Sass and modern CSS alternatives.

## Big thanks to

- Joel Carr and the CP Platforms team for supporting us to use PageKit to roll out Sass monitoring to key Customer Products projects.
- Kiya Gurmesa, Rhys Evans, and Engineering Insights for support using the [Biz-Ops Metrics API](https://github.com/Financial-Times/biz-ops-metrics-api). This is how we plan to aggregate local build times.
- Ben Holmes and Developer Automation for working on Origami Sass to CSS migration tools (codemods). Watch this space for more information!

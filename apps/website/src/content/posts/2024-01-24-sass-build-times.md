---
title: Sass Build Times
description: Sass build times got you down? Enable Sass monitoring in your project and let us know.
author: Lee Moody
publishDate: 2024-01-24
---

We've heard many teams at the FT are struggling with slow Sass build times. Friction between making a change and seeing the result can be pretty painful, right! It slows down our ability to iterate and deliver, and gives ample opportunities for distraction... and doom scrolling... as we wait.

We can't blame Sass too much, it's wonderful, but we have a large estate of complex Sass that has become slow. In our view, [now is the time to migrate away from Sass](https://docs.google.com/document/d/1RuGduWdX0zGsgsp9C7lIhXgqEia6sWK900_3XVwYDIM/edit#heading=h.1f3yolavobef).

## Enable Sass Monitoring

If you're working on a project which builds with Page Kit ([dotcom-build-sass](https://github.com/Financial-Times/dotcom-page-kit)), please [setup remote Sass monitoring](#remote-sass-monitoring). This will help us make a case to invest in migrating away from Sass more quickly.

![A console log within a terminal, sharing that the person has in total waited 2.7 hours for Sass to compile.](/assets/images/2024-01-24-sass-build-times/sass-css.png?width=500&source=origami)

### Remote Sass monitoring

1. Upgrade your project to [dotcom-build-sass@9.3.2](https://github.com/Financial-Times/dotcom-page-kit/releases/tag/v9.3.2) or above.
1. Add the following environment variables to Doppler for `dev`, we want these during local development.
   - `FT_SASS_STATS_MONITOR` – `on`, to enable remote logging to [biz-ops-metrics](https://github.com/Financial-Times/biz-ops-metrics-api/blob/main/docs/API_DEFINITION.md#authentication)
   - `FT_SASS_BIZ_OPS_API_KEY` - Generate a **prod** [Biz Ops Metrics API key](https://apigateway.in.ft.com/key-form/system) for your system.
   - `FT_SASS_BIZ_OPS_SYSTEM_CODE` - The [biz-ops](https://biz-ops.in.ft.com/) system code for your project, so we know where to attribute Sass build times.
1. Prepend your local front-end build script in `package.json` to fetch Doppler secrets, `doppler run --project [your-project] --config dev --`. This may vary depending on your project. E.g:

```diff
- "build": "dotcom-tool-kit build:local",
+ "build": "doppler run --project [your-project] --config dev -- dotcom-tool-kit build:local",

- "watch": "webpack --progress --mode=development --watch",
+ "watch": "doppler run --project [your-project] --config dev -- webpack --progress --mode=development --watch",
```

Now, each time Sass is built, [the duration is sent to biz-ops](https://biz-ops.in.ft.com/api-explorer?query=%7B%0A++teams%28where%3A+%7B+code%3A+%22customer-products-subscriber-growth%22+%7D%29+%7B%0A++++delivers%28where%3A+%7B+code%3A+%22next-newsletter-signup%22+%7D%29+%7B%0A++++++code%0A++++++metric%28name%3A+%22sass-build-time%22%29+%7B%0A++++++++value%0A++++++++timestamp%0A++++++%7D%0A++++%7D%0A++++metricRollup%28path%3A+%22delivers.metric%22%2C+method%3A+sum%29+%7B%0A++++++value%0A++++++timestamp%0A++++%7D%0A++%7D%0A%7D&title=Custom+Biz+Ops+report).

### Local Sass monitoring

After your project has updated to [dotcom-build-sass@9.3.2](https://github.com/Financial-Times/dotcom-page-kit/releases/tag/v9.3.2) or above, you will periodically see a log showing your cumulative Sass build time. Like this:

![A console log within a terminal, sharing that the person has in total waited 2.7 hours for Sass to compile.](/assets/images/2024-01-24-sass-build-times/sass-css.png?width=500&source=origami)

Whilst remote monitoring will prove very useful, this local report is more for fun. Or, motivation. It highlights the total time you have spent waiting for Sass in all – at least since the temporary file it's stored in was last deleted by your operating system.

Set the `FT_SASS_STATS_NOTICE` environment variable to configure how often you see the port on on your machine. One of `throttle`, `never`, or `always`.

E.g. to see your cumulative Sass build time after every build `FT_SASS_STATS_NOTICE=always npm run build`

## More ways for you to help

1. Share your experience in [#sass-to-css](https://financialtimes.enterprise.slack.com/archives/C06FD4DSBQB)! If Sass build times have you down, feel free to have a good moan. We'd also love to see your cumulative Sass build time – let's we'll see who gets the high score! 😬
1. Become an early adopter of our [new Origami components](https://origami-for-everyone.ft.com/components/buttons/), which don't use Sass. Let us know you're interested in [#origami-support](https://financialtimes.slack.com/messages/origami-support) and we'll help you get started.
1. Write less Sass yourself and refactor custom variables, functions, or mixins. Our [Sass to CSS proposal](https://docs.google.com/document/d/1RuGduWdX0zGsgsp9C7lIhXgqEia6sWK900_3XVwYDIM/edit#heading=h.1f3yolavobef) includes examples of FT Sass and modern CSS alternatives.
1. Praise Ben Holmes and the Developer Automation team ([#developer-automation](https://financialtimes.enterprise.slack.com/archives/C05RVF48VPF)). They're working on automated Origami Sass to CSS migration tools (codemods). Checkout this prototype, how cool! More news to follow.
   ![Running a codemode to automate swapping a Sass mixin for CSS Custom Properties](/assets/images/2024-01-24-sass-build-times/origami-codemod.gif?width=500&source=origami)

## Big thanks to

- Joel Carr and the CP Platforms team for supporting us to use PageKit to roll out Sass monitoring to key Customer Products projects.
- Kiya Gurmesa, Rhys Evans, and Engineering Insights for support using the [Biz-Ops Metrics API](https://github.com/Financial-Times/biz-ops-metrics-api). This is how we plan to aggregate local build times.
- Ben Holmes and Developer Automation for working on Origami Sass to CSS migration tools (codemods). Watch this space for more information!
- Andy Gout for helping us test this out, and for rolling out so quickly to [next-newsletter-signup (PR)](https://github.com/Financial-Times/next-newsletter-signup/pull/685/files).

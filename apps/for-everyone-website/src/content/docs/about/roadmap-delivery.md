---
title: Roadmap & delivery
description: Where we are going
---

## Scheduled work by activity

<strong>Last updated: Feb 2024</strong>

### Q1 2024
  1. <strong>Foundations</strong>
      - <strong>Colour palette (done)</strong>: Our colour palette lacks guidance on when to use what colour, making it tricky to produce a consistently on-brand product. E.g. "sky" is used for opinion pieces, but we have never documented that.
      - <strong>Colour use cases (in progress)</strong>: Reaching for colours by use-case "page background", "link", allows us to find the colour we need more quickly, and roll out global updates from a central place.
      - <strong>Colour tinting</strong>: We have a range of colour tints available but no guidance on how to apply them.
      - <strong>Spacing scale (done)</strong>: We're aligning our spacing scale across brands and moving to an easier to remember t-shirt naming.
      - <strong>Typography scale (done)</strong>: We're aligning our typography scale across brands.
      - <strong>Product typography (in progress)</strong>: Non-editorial headings and other typography styles are poorly adhered to, undermining our products. A design audit to identify needs, with new written guidelines, will help designers make consistent choices going forward.
      - <strong>Editorial typography (in progress)</strong>: Multiple brands and sub-brands are working on Spark for Everyone, a shared content management system. We want to be ready to support with front-end components for article pages.
  1. <strong>Components</strong>
      - <strong>Buttons (done)</strong>: Surprisingly complex and commonly used. An excellent test of design tokens to support multiple brands.
      - <strong>Tooltip (in progress)</strong>: We know of 3 use-cases where our [legacy o-tooltip](https://registry.origami.ft.com/components/o-tooltip@5.3.1) is used, in ways it was not designed for. This often creates an inaccessible and inconsistent experience. Tooltip is therefore a great way for us to demonstrate our new, design guideline led approach. It also gives us an opportunity to explore technical decisions around building interactive components for our new architecture.
      - <strong>Labels – basic</strong>: We see this as a quick win. Our core brand's labels are simple, and Sustainable Views' use of labels could be improved. Right now they conflict in style with buttons and feel like they should be clickable.
      - <strong>Labels – badge/live (postponed)</strong>: We have decided to postpone to better align with Customer Products' roadmap.
  1. <strong>Patterns</strong>
      - <strong>Pagination (done)</strong>: Previously part of our [legacy o-buttons](https://registry.origami.ft.com/components/o-buttons@7.9.0) component, it was never widely adopted. Documenting pagination as our first pattern and adding to our Figma library makes this much more discoverable than before. A design audit will also allow us to make improvements for mobile.
  1. <strong>Onboard contributors (in progress)</strong>: The Origami team are partnering with contributors in other teams so we can deliver a modern Origami design system, including design guidelines, new Figma libraries, and components for engineers. To support that we're working on pairing, documentation, and workshops for onboarding to our new architecture.
  1. <strong>Publish</strong>
        -  <strong>Review & publish new Figma libraries</strong>: We have new Origami Figma libraries for each brand, but these aren't released for designers to use today.
        -  <strong>Publish web components (in progress)</strong>: Experimental components are out. We'd like to enhance React support, improve technical documentation, and make our first maintained release. We're working with Sustainable Views as our first adopters.
        - <strong>Expand the brand support of this website (done)</strong>: We want to add the Internal brand and Sustainable Views to this website, as we intend to provide a level of support to those brands.
  1. <strong>Archive the [Origami Registry](https://registry.origami.ft.com/components)</strong>: We will migrate any remaining demos or documentation to Storybook, giving users one less source of design system demos. This is the first step to replacing the main Origami website with this, design guideline orientated website.

### Q2 2024

1. Replace [origami.ft.com](https://origami.ft.com/) with this design guideline orientated website.
1. Continue to build out foundations, components, and patterns according to design priorities.
1. Origami Image Service & Origami Build Service work to save costs and improve monitoring.

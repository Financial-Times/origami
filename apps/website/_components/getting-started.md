---
title: Including Components In Your Project
description: How you choose to include Origami components in your project will depend on your projects' requirements. There are two options, the Origami Build Service or the npm package manager.
cta: Get started using Origami components in your project.

# Redirect from legacy URLs
redirect_from:
  - /docs/developer-guide/modules/initialising-modules/
  - /docs/components/initialising/

# Navigation config
nav_display: true
nav_label: Getting Started
nav_order: 10
---

# {{ page.title }}

How you choose to include Origami components in your project will depend on your projects' requirements:

## Origami Build Service

The Build service is best for quick projects or static sites or things where performance is less of a concern. This build method will fetch the Origami <abbr title="Cascading Style Sheets">CSS</abbr> and JavaScript as external files for your webpage. Be aware that this will indiscriminately fetch all stylistic variations of a component, which will increase your file size.


If you would like help with this, you can visit the [Origami Build Service tutorial](/docs/tutorials/build-service/).


## Package Manager (npm)

In order to customise your page and have more granular control over a components stylistic and behavioural features build Origami components manually. We currently do this by installing Origami components from the command line via the npm package manager. This process relies on a build step, which you may already have in your project.

If you would like help with this, you can visit the [Package Manager (npm) tutorial](/docs/tutorials/manual-build/).

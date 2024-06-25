---
title: Compatibility
description: Documentation about how Origami ensures compatibility across different browsers and devices, and how you can write code in a way that supports this.
sidebar:
  order: 30
---

## Core & enhanced experiences

`core` and `enhanced` are definitions we have for 'experiences' that we serve to a browser. The experience we serve depends on the presence of some features within the browser.

Generally, older browsers that don't support newer JavaScript features will get a `core` experience, and modern browsers will get the `enhanced` experience.

Origami components contain fallback styling for the browsers that fail to load JavaScript. We’ll always assume that the experience we will be served is core, until proven otherwise.

## Browser support

Origami follow the <a href="https://docs.google.com/document/d/1z6kecy_o9qHYIznTmqQ-IJqre72jhfd0nVa4JMsS7Q4/"><abbr title="Financial Times">FT</abbr> Browser Support Policy document</a> available to <abbr title="Financial Times">FT</abbr> staff.

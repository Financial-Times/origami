# next-expander
Simple, fairly unopinionated widget for expanding and collapsing content

Proposed api
``` javascript
expander(el/selector, {
  toggle: el/selector // defaults to finding e.g. .next-expander__toggle within the main el
  shrinkToHeight: 100 // height in pixels to collapse to
  shrinkToCount: 3 // number of els to show when collapsed
  countSelector: 'li'
}
```

JS will

- add/remove `[aria-expanded]` to the container 
- when in shrinkToHeight mode will do some height measuring and setting
- hide toggle when content fits comfortably in the shrunk mode

SASS will

- provide styles for the toggle button
- provide mixins for the expanded and collapsed state including maxHeight helper
- possibly facilitate interacting with o-grid's respondTo
- Have 'push content down' and 'sit on top of other content' modes

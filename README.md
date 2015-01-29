# next-expander
Simple, fairly unopinionated widget for expanding and collapsing content

Proposed api
``` javascript
expander(el/selector, {
  shrinkTo: 3 // 'height' in pixels to collapse to, or number of items
  countSelector: 'li' // selector for identifying items to count
  opts.expandedToggleText: 'less';
  opts.collapsedToggleText: 'more'
}
```

All these can be set as data attributes too

JS will

- add/remove `[aria-expanded]` to the container
- hide toggle when content fits comfortably in the shrunk mode
- fires events and listens to viewport changes

SASS will

- provide styles for the toggle button
- Have 'push content down' and 'sit on top of other content' modes (??? think this should be descoped probably )

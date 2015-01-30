# o-expander
Simple, fairly unopinionated widget for expanding and collapsing content

## Markup

```html
<div data-o-component="o-expander" class="o-expander items">
    <h2>Preamble content (optional)</h2>
    <div class="o-expander__content"></div>
    <button class="o-expander__toggle"></button>
</div>
```

## Options

All the following can be passed in an options object in the second parameter of `oExpander#init()` or as data-attributes (hyphenated and prefixed by `o-expander` e.g. `data-o-expander-shrink-to="height"`)

* `shrinkTo` [`'height'`]: A number, indicating the number of items to show when collapsed, or the string `'height'`, which will collapse to a height defined in the CSS
* countSelector: 'li' // selector for identifying items to count
* opts.expandedToggleText: 'less';
* opts.collapsedToggleText: 'more'

### Configuration available via markup/CSS
 - aria expanded shouldn't be false
  - height

Proposed api
``` javascript
expander(el/selector, {

}
```


add demo how to do 'sit on top of other content' modes (??? think this should be descoped probably )

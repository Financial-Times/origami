# o-expander
Widget for expanding and collapsing content

## Markup

```html
<div data-o-component="o-expander" class="o-expander">
    <p>Preamble content (optional)</p>
    <div class="o-expander__content"></div>
    <p>Midamble content (optional)</p>
    <button class="o-expander__toggle"></button>
    <p>Postamble content (optional)</p>
</div>
```

## API

### `o-expander#init(el, opts)`
This generally sticks to the [usual origami convention](http://origami.ft.com/docs/syntax/js/#initialisation). If el is an HTMLElement with the attribute `data-o-component="o-expander"` a single instance will be created for that element and returned, otherwise an expander will be created for each `o-expander` element found within `el`, and an array of instances returned.


## Options

All the following can be passed in an options object in the second parameter of `oExpander#init()` or as data-attributes (hyphenated and prefixed by `o-expander` e.g. `data-o-expander-shrink-to="height"`)

* `shrinkTo` [`'height'`]: A non-negative integer, indicating the number of items to show when collapsed, or the string `'height'`, which will collapse to a height defined in the CSS
* `countSelector` [`'li'`]: Selector for identifying items to count
* `expandedToggleText` [`'less|fewer'`]: Text to show on toggle button when expanded (defaults to fewer when in count mode, or less when in height mode);
* `collapsedToggleText` [`'more'`]: Text to show on toggle button when collapsed

## Events
o-expander fires the following events, which always fire before any repainting/layout occurs

* `oExpander.init` - fires when the expander has initialised
* `oExpander.expand` - fires when the expander expands
* `oExpander.collapse` - fires when the expander collapses

## Configuration using markup/CSS
* By default o-expander will collapse content on initialisation. To prevent this add the attribute `aria-expanded="true"` to `.o-expander__content`
* Maximum height should be set using css. Be mindful that when js doesn't run you may want to default to showing all the content e.g.

    ```scss
    .o-js .o-expander__content { // ensures all content is shown when js doesn't run
        max-height: 50px;
    }

    .o-expander__content { // collapses content when js doesn't run
        max-height: 50px;
    }
    ```

* Animation and other fancy behaviour can be added using css and by listening to events. See the demos for examples



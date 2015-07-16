# o-expander
Accessible, content-aware widget for expanding and collapsing content

## Markup

```html
<div data-o-component="o-expander" class="o-expander">
    <div class="o-expander__content"></div>
    <button class="o-expander__toggle o--if-js"></button>
</div>
```
`o-expander__toggle` and `o-expander__content` can be put anywhere within `o-expander` as long as `o-expander__toggle` is not contained within `o-expander__content`. There are no restrictions on sibling markup.

## API

### Static methods

#### `init(el, opts)`
This generally sticks to the [usual origami convention](http://origami.ft.com/docs/syntax/js/#initialisation). If el is an HTMLElement with the attribute `data-o-component="o-expander"` a single instance will be created for that element and returned, otherwise an expander will be created for each `o-expander` element found within `el`, and an array of instances returned.

### Instance methods

#### `destroy()`
Destroys an o-expander instance and removes all event listeners



## Options

All the following can be passed in an options object in the second parameter of `oExpander#init()` or as data-attributes (hyphenated and prefixed by `o-expander` e.g. `data-o-expander-shrink-to="height"`)

* `shrinkTo` [`'height'`]: A non-negative integer, indicating the number of items to show when collapsed, or the string `'height'`, which will collapse to a max-height defined in the CSS, or `'hidden'` which will use `aria-hidden` (rather than `aria-expanded`) to completely hide the content when collapsed
* `countSelector` [`'.o-expander__content > li'`]: Selector for identifying items to count, relative to `.o-expander`
* `expandedToggleText` [`'less|fewer'`]: Text to show on toggle button when expanded (defaults to fewer when in count mode, or less when in height mode). Accepts empty strings
* `collapsedToggleText` [`'more'`]: Text to show on toggle button when collapsed. Accepts empty strings
* `toggleSelector`[`'button.o-expander__toggle'`]: Selector for expand/collapse toggle button. When using the default selector some styling, with an arrow icon, will come for free. If the selector matches more than one element they will all have the ability to expand/collapse the expander
* `toggleState`[`'all|aria|none'`]: Do you want the epxander to update the button's text and `aria-pressed` attribute, just the aria attribute or neither (defaults to `all`)

## Events
o-expander fires the following events, which always fire before any repainting/layout occurs

* `oExpander.init` - fires when the expander has initialised
* `oExpander.expand` - fires when the expander expands
* `oExpander.collapse` - fires when the expander collapses

## Configuration using markup/CSS
* By default o-expander will collapse content on initialisation. To prevent this add the class `.o-expander__content--expanded`
* Maximum height (when collapsed) should be set using css. Be mindful that when js doesn't run you may want to default to showing all the content e.g.

    ```scss
    .o-js .o-expander__content { // ensures all content is shown when js doesn't run
        max-height: 50px;
    }

    .o-expander__content { // collapses content when js doesn't run
        max-height: 50px;
    }
    ```

* Animation and other fancy behaviour can be added using css and by listening to events. See the demos for examples

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

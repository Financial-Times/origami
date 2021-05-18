# Allow A Component To Output The CSS Of Another

Allow one component to output the CSS of another component. This is currently disallowed implicitly in the Origami component specification (v1) as it requires that a component outputs namespaced CSS. E.g. a component `o-foo` only outputs CSS classes which begin with `o-foo`, and therefore couldn't output the styles of a dependency with classes which begin with `o-bar`.

https://origami.ft.com/spec/v1/components/sass/#css-selectors

## motivation

Allowing one component to output the styles of another will make it easier to author, document, and use components which depend on other complex components.

## explanation

This example shows component Sass for a component `o-no` outputting CSS from a dependent component `o-forms`, this is currently not allowed, which means a user has to include `o-forms` CSS in their project themselves to use `o-no`:
```scss
// o-no/main.scss
@mixin oNo() {
    @include oForms();
    .o-no {
        // o-no styles here
    }
}
```
```html
<!-- o-no/demos/main.mustache -->
<div class="o-no" data-o-component="o-no">
    <div class="o-forms">
    <!-- o-forms markup here -->
    </div>
</div>
```

Examples where this happens:
- [o-autocomplete (work in progress)](https://github.com/Financial-Times/o-autocomplete/blob/da3c62a460f5ddd6ba099533e8a52f5d50a9b103/demos/src/custom-sort/custom.mustache),
- [o-table with a filter](https://github.com/Financial-Times/o-table/blob/master/demos/src/base.mustache#L12),
- [o-layout](https://github.com/Financial-Times/o-layout/blob/c76e652a78acf3ec70f4cfbf53d93ddd2fdab171/demos/src/shared/header.mustache#L2)
- [o-comments](https://github.com/Financial-Times/o-comments/blob/158b0c256b1a6e8970854e30a111312292c7c5d4/README.md#additional-dependencies)

Where depending on less complex components, styles are usually output in a new class name to avoid outputting the dependent component's CSS selectors:
```scss
// o-no/main.scss
@mixin oNo() {
    .o-no {
        // o-no styles here
        .o-no__button {
            @include oButtonsContent($opts: (
                'type': 'primary'
            ));
        }
    }
}
```
```html
<!-- o-no/demos/main.mustache -->
<div class="o-no" data-o-component="o-no">
    <button class="o-no__button">an o-no button</button>
</div>
```

Here are a lost of benefits/negatives of allowing one component to output the CSS of another component.

## benefits

1. Easier to document and use complex components/patterns. [o-comments](https://github.com/Financial-Times/o-comments/blob/158b0c256b1a6e8970854e30a111312292c7c5d4/README.md#additional-dependencies) states that other component CSS has to be included in the readme. Other components document this elsewhere, like in demo comments, or not at all, making it more difficult for a user to include components in their project correctly.
2. Smaller bundle sizes as the component will only output styles for the features it uses, whereas a user may output all styles of a dependency. We can rely on minification to remove duplicate CSS declaration blocks.

Although Origami has multiple examples, point one is more prominent for non-Origami components which are more likely to compose complex components and augment them with custom styles as new UI patterns.

## drawbacks

I think most of these are minor or can be avoided with guidance:

1. Potential to break CSS splitting. Customer Products used to split CSS [based on the position of Sass comments](https://github.com/Financial-Times/next-stream-page/blob/db7f420266fe1482d52772ad97e0aff09699a3d6/client/main.scss#L8) which could break if the order of CSS changes, e.g. minification removing duplicate CSS declaration blocks. This also caused issues with placeholder use. Customer Products no longer do that.
2. Potential for less stylistic flexibility. In the button example above, the type of the button can be changed in a patch release as button markup has not been used. If button markup had been used, and o-button CSS output by the parent component, then it would be a breaking change.
3. Potential for increased bundle sizes. If the CSS for a dependent component is nested within a selector for the parent component CSS minification will be less effective, including many selectors for each declaration block.
4. Minor risk of users relying on CSS styles implicitly, leading to visual bugs / migration difficulties. E.g. component `o-foo` outputs styles for `o-bar`, project `a` includes component `o-foo` but also uses `o-bar` without outputting `o-bar` styles explicitly. A future release of `o-foo` removes `o-bar` styles/markup, which breaks `a` when it upgrades.

## work required

Update the component specification (v2), wording tbd.

## alternatives

- Do nothing. What we have works, but components which compose other components can be difficult to use.

## notes

- This proposal is all about CSS. What about initialising the dependencies JavaScript? A component could use a dependencies JavaScript to initialise markup for a dependency already which could cause users errors if `data-o-component="o-dependency"` markup is used.

# remove silent mode

Remove the silent mode variable from components and all related documentation. Instead use the "primary" Sass mixin only.

## motivation

Origami component Sass outputs no CSS when imported. There are now a few ways to do that...

Silent mode (discouraged), outputs all css:
```scss
// outputs all o-example css
$o-example-is-silent: false;
@import 'o-example/main';
```

Primary mixin, outputs all css:
```scss
// outputs all o-example css
@import 'o-example/main';
@include oExample();
```

Primary mixin with argument, outputs only required css:
```scss
// outputs only required features of o-example css
@import 'o-example/main';
@include oExample((
    'feature-1',
    'feature-2',
));
```

One of the reasons primary mixins were introduced was because silent mode causes confusion: it's silent by default until made not silent when it's loud.

>Abstracting from silent mode: there will be no need to specify $o-component-is-silent, which causes unnecessary confusion, when we can call the primary mixin to do the same job. There have been discussions about working this into the build service, but that is an extra discussion for further down the line.

https://github.com/Financial-Times/origami/issues/6

However silent mode still exists for backward compatibility and the Origami Build Service, which turns silent mode off by setting the variable to return component CSS. This means we still have to explain what silent mode, along with the primary mixin, and it's sometimes introduced to new projects alongside primary mixin use.

## explanation

Drop the silent mode variable completely from [Origami spec v2](https://github.com/Financial-Times/origami-website/pull/273). Make the [primary mixin a must instead of a should](https://origami.ft.com/spec/v1/components/sass/#primary-mixin). Delete [silent mode documentation](https://origami.ft.com/docs/components/silent-mode/). Then remove existing silent mode variables from all components: by first helping projects replace the silent mode variable with a primary mixin, then releasing a [major cascade](https://origami.ft.com/docs/components/major-cascade/) with silent mode variables removed.

## work required

- Update the v2 component spec draft to make primary mixins a `must` instead of a `should`, remove the silent mode variable requirement entirely.
- Update the `create-origami-component` boilerplate.
- Search `origami-website` site and `origami-registry-ui` to update any other documentation.
- Update `origmai-build-tools` to verify the existence of the primary mixin.
- Update `origami-build-service` to use the primary mixin instead of the silent mode variable.
- Update all components silent mode variable SassDoc to document silent mode, since the global docs have been removed, and note that it is deprecated with `@deprecated`.
```
/// Set to true to output all o-example CSS.
/// @deprecated Use the primary mixin to output component CSS instead.
/// @see {mixin} oExample
/// @type Bool
```
- Remove the silent mode variable from every component for its spec v2 major release, update its migration guide to recommend the primary mixin instead. All Origami maintained components have a primary mixin already but there may be instances of components which need to add one. At its simplest this involves wrapping all the component's Sass in a single mixin of the same name as the component.

Note: the `mixin-exists` Sass function could be used to throw a helpful error in build tools / build service when the component is missing a primary mixin:
```scss
@if not mixin-exists('oComponentName') {
    @error 'Could not compile sass as o-component-name does not have a primary mixin. ' +
    'See the specification [... etc]';
}

@include oComponentName();
```

## alternatives

- Do nothing, continue to document and talk about this pattern alongside the primary mixins. It slows development down with confusion, encourages outputting all component CSS which is inefficient, and it is likely this will come up again if we move to make the most of Sass modules. On the other hand, it would mean one less step for the upcoming npm migration.
- Do this but sooner, as part of the npm migration. It would mean one more step for the upcoming npm migration, but get rid of the silent mode variable from projects more quickly and avoid another cascade.

## notes

### Path to Dart Sass

As well as the benefits highlighted above, removing the silent mode variable would mean Origami components are more aligned with the latest [Sass recommendation to output styles with a mixin](https://sass-lang.com/documentation/at-rules/use#with-mixins). In the future we'd have a path from the primary mixin API to the recommended Sass modules API (this is out of scope of this proposal).

Current Origami API with primary mixin:
```scss
// Import Sass API
@include 'o-table';
@include 'o-header-services';

// Customise
@include oHeaderServicesCustomize((
  'nav-hover-background': hotpink,
  'logo': 'origami'
));

@include oTableCustomize((
  'stripe': hotpink
));

// Output CSS
@include oHeaderServices();
@include oTable();
```

Potential future Origami API, using the recommended Sass modules pattern:
```scss
// Import Sass API
@use 'o-table' as table;
@use 'o-header-services' as header;

// Customise
@include header.configure(
  $nav-hover-background: hotpink,
  $logo: 'origami'
);

@include table.configure(
  $stripe: hotpink
);

// Output CSS
@include header.styles;
@include table.styles;
```

### Major Cascade

We may opt to include other work in the major cascade to remove silent mode variables, for example the above dart sass interface. However, interestingly, a major cascade with little/no changes will let us see [how much effort a major cascade](https://origami.ft.com/docs/components/major-cascade/#things-to-consider) is in terms of process vs. the actual changes — post customer products team changes and our switch to npm. We'll be able to plan future cascades accordingly, and hopefully will be able to do them more frequently with smaller changes.

### Deprecation Notice

This proposal does not include a Sass `@warn` deprecation notice. For many components over multiple entry points, potentially nested a number of projects deep in a given project's dependency tree, this is likely to cause a lot of unhelpful noise.

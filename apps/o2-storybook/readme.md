# Origami 2 Storybook

Demos of Origami 2 components.

## Getting started

Ensure you have installed the dependencies for the project, execute the following in the root of the mono repo:

```shell
npm install
```

Run storybook:

```shell
npm run storybook -w apps/o2-storybook
```

By default, storybook will build demos for the `core` brand, you can change which brand storybook will build for by changing the value of `STORYBOOK_BRAND`:

```shell
STORYBOOK_BRAND=internal npm run storybook -w apps/o2-storybook
```

Origami 2 supports these brands:

- `core`
- `internal`
- `whitelabel`

## Creating stories and structure

Each component folder has a `stories` folder, where we put all stories related to the component. The rough strucutre of the folder will look like this:

```.
└── stories/
    ├── internal/ //or any other brand
    │   └── component.stories.tsx
    ├── component.stories.tsx
    └── component.scss
```

Any story file in the root of `stories/` will be built for all storybook instances. When a brand may need different stories for a specific brand, a directory with the brand's name can be created with stories inside. These will only show for the specified brand.

# Origami 2 Storybook

Demos of Origami 2 components.

## Getting started

Ensure you have installed the dependencies for the project, execute the following in the root of the mono repo:

```bash
npm i
```

Run storybook:

```bash
npm run storybook -w apps/o2-storybook
```

By default, storybook will build demos for the `core` brand, you can change which brand storybook will build for by changing the value of `ORIGAMI_STORYBOOK_BRAND`:

```bash
ORIGAMI_STORYBOOK_BRAND=internal npm run storybook -w apps/o2-storybook
```

Origami 2 supports these brands:
* `core`
* `internal`
* `whitelabel`§

## Creating stories and structure

The storybook is organized by component. Each component has its own folder in components directory. Each component folder has a `stories` folder, where we put all files related to the component. The rought strucutre of the folder will look like this:

```.
└── stories/
    ├── brand-a/
    │   └── component.stories.tsx
    ├── brand-b/
    │   ├── sub-brand-a/
    │   │   └── component.stories.tsx
    │   └── component.stories.tsx
    ├── sb-story-config.ts
    └── story-template.tsx
```

- We create directories for each brand and next sub-brand within it if needed.
- The `sb-story-config.ts` file is the general story configuration file. Such as controls, argTypes and args configurations. This config can easily be overridden on the component level itself, brand level, sub-brand level or even story level.
- The `story-template.tsx` is the template for the story file. That is usually imported by `component.stories.tsx` file, which applies brand specific wrapper.
- The `component.stories.tsx` is the story file for the component for a given brand or a sub-brand.

This setup is giving us flexibility over what controls to display when and even have custom controls for each story if needed

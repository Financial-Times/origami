# Origami

Table of Contents

- [Project Structure](#project-structure)
- [Multiple Brand Support](#multiple-brand-support)
  - [Add A New Brand](#add-a-new-brand)
- [Preview element](#preview-element)
- [Commands](#commands)
- [Want to learn more?](#want-to-learn-more)

---
A new, in progress Origami website. It will:

- Put design guidelines front and centre.
- Document brands, sub-brands, and their unique variation.
- Provide a hub of information to support o2 and o3 component use.

## Project Structure

The Origami website is [![built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build). The project structure looks like the following:

```tree
.
├── public/
├── src/
│   ├── assets/
│   ├── content/
│   │   ├── docs/
│   │   │   ├── professional/
│   │   └── config.ts
│   └── env.d.ts
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

Starlight looks for `.md` or `.mdx` files in the `src/content/docs/` directory. Each file is exposed as a route based on its file name. We use [Starlight's internationalisation features](https://starlight.astro.build/guides/i18n/) to present tailored content dependent on the selected brand. Brand specific content e.g. `src/content/docs/professional` takes precedence over content at `src/content/docs/`.

Images can be added to `src/assets/` and embedded in Markdown with a relative link.

Static assets, like favicons, can be placed in the `public/` directory.

## Multiple Brand Support

We use [Starlight's internationalisation features](https://starlight.astro.build/guides/i18n/) to support documentation for multiple brands. This allows us to share content. In many cases we can switch CSS Custom Properties when changing brand, be reuse the same design guidelines. In other cases we can "translate" content for brand specific cases. E.g. `src/content/docs/professional/components/example.mdx` is served instead of `src/content/docs/components/example.mdx` when the professional brand is selected.

This also means search is brand specific. Typically, this feature relies on the `lang` html attribute to correctly search only content for the selected language. We have applied that to brands using a [private subtag](https://datatracker.ietf.org/doc/html/rfc4646#section-4.5) e.g. `lang="en-GB-x-prof"`. Note that all subtags have a maximum length of 8 characters and whitespace is not permitted, we must therefore appreciate brands here.

### Add A New Brand

- Add a new 'locale' to `astro.config.mjs` for the new brand
- Update `src/components/ContentPanel.astro` to map the 'locale' to brand CSS class.
- Copy content from an existing brand, switching out the brand-specific CSS file import for that component, and updating the Figma and Storybook links.
- Copy other documentation mdx files that contain brand-specific content or styles, and edit according to your brand.

## Preview element

The preview element is a custom element that allows you to preview a component in the context of a brand. It is used in the documentation to show how a component looks and has switcher to provide `JSX` and `HTML` code. The preview element is defined in `src/components/utils/Preview.astro` and takes only one argument.

The argument is a path to a tsx file that exports a component. The path is relative to the current directory. `tsx` file must include `// <preview>` comments around the code that needs to be used in the code snippet section. `tsx` should export preview as `preview`. The preview element will also take are of visual representation of code.

For example if you create a preview tsx file at `src/components/my-component/preview/MyComponent.tsx` with the following content:

```tsx

import { MyComponent } from '@financial-times/o3-my-component';

const MyPreviewComponent = () => {
 return (
  // <preview>
  <MyComponent />
  // </preview>
 );
};

export {
 MyPreviewComponent as preview
};

```

And then use the preview element in `.astro` file like this:

```jsx

const metaDataPath = "src/components/my-component/preview/MyComponent.tsx";


<Preview metaData={metaDataPath} />

```

## Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Want to learn more?

Check out [Starlight’s docs](https://starlight.astro.build/), read [the Astro documentation](https://docs.astro.build), or jump into the [Astro Discord server](https://astro.build/chat).

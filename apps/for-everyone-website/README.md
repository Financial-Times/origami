# Origami For Everyone

A new, in progress Origami website. It will:

- Put design guidelines front and centre.
- Document brands, sub-brands, and their unique variation.
- Provide a hub of information to support o2 and o3 component use.

## Project Structure

The Origami For Everyone website is [![built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build). The project structure looks like the following:

```
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

Starlight looks for `.md` or `.mdx` files in the `src/content/docs/` directory. Each file is exposed as a route based on its file name. We use [Starlight's internationalisation features](https://starlight.astro.build/guides/i18n/) to present tailored content dependent on the selected brand. Brand specific content e.g. `src/content/docs/professional` takes precedence over  content at `src/content/docs/`.

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

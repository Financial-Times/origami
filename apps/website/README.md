# Origami

Table of Contents

- [Project Structure](#project-structure)
- [Multiple Brand Support](#multiple-brand-support)
  - [Add A New Brand](#add-a-new-brand)
  - [Branded Content](#branded-content)
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

Starlight looks for `.md` or `.mdx` files in the `src/content/docs/` directory. Each file is exposed as a route based on its file name. We use [Starlight's internationalisation features](https://starlight.astro.build/foundations/i18n/) to present tailored content dependent on the selected brand. Brand specific content e.g. `src/content/docs/professional` takes precedence over content at `src/content/docs/`.

Images can be added to `src/assets/` and embedded in Markdown with a relative link.

Static assets, like favicons, can be placed in the `public/` directory.

## Multiple Brand Support

We use [Starlight's internationalisation features](https://starlight.astro.build/foundations/i18n/) to support documentation for multiple brands. This allows us to share content. In many cases we can switch CSS Custom Properties when changing brand, be reuse the same design guidelines. In other cases we can "translate" content for brand specific cases (see [Branded Content](#branded-content))

This also means search is brand specific. Typically, this feature relies on the `lang` html attribute to correctly search only content for the selected language. We have applied that to brands using a [private subtag](https://datatracker.ietf.org/doc/html/rfc4646#section-4.5) e.g. `lang="en-GB-x-prof"`. Note that all subtags have a maximum length of 8 characters and whitespace is not permitted, we must therefore appreciate brands here.

### Add A New Brand

- Add a new 'locale' to `astro.config.mjs` for the new brand
- Update `src/components/ContentPanel.astro` to map the 'locale' to brand CSS class.
- Copy content from an existing brand, switching out the brand-specific CSS file import for that component, and updating the Figma and Storybook links.
- Copy other documentation mdx files that contain brand-specific content or styles, and edit according to your brand.

### Branded Content

As much as possible we aim to share design guidelines across brands. For when variation is required, it is possible to translate content for different brands in two ways:

#### Brand whole pages

Serve an entirely different page per brand. Content under `src/content/docs/[brand]` is served by default for the selected brand. If this does not exist, content for the root brand `src/content/docs/` is served as a fallback. E.g. `src/content/docs/professional/components/example.mdx` is served instead of `src/content/docs/components/example.mdx` when the professional brand is selected.

#### Brand page sections

Use the `BrandedContent` astro component within `.mdx` content to conditionally render content for one or more brands.

```mdx
<BrandedContent brands="core, sustainable-views">
### Branded Content

This markdown will only show given the Core or Sustainable Views brand is selected.

</BrandedContent>
```

Note: `BrandedContent` accepts 2 props, the current brand and a comma separated string of brands to render child elements for. However it is not necessary to import `BrandedContent` or pass the current brand, as this is handled automatically using a remark plugin ([plugins/remark-branded-content.mjs](https://github.com/Financial-Times/origami/blob/main/apps/website/plugins/remark-branded-content.mjs)). Any headings used within the branded content will show within in-page navigation for all brands during local development, but is removed via a post-processing script ([remove-branded-headings.mjs](https://github.com/Financial-Times/origami/blob/main/apps/website/remove-branded-headings.mjs)) for the production build.

## Preview element

The preview element is a custom element that allows you to preview a component in the context of a brand. It is used in the documentation to show how a component looks and has switcher to provide `JSX` and `HTML` code. The preview element is defined in `src/components/utils/Preview.astro` and takes only one argument.

- The argument is a Preview component itself that is exported from a tsx file.
- The preview component tsx file also needs to export a path of itself that is relative to the current directory.
- `tsx` file must export relative path as `filePath`.
- `tsx` file must include `<meta  itemProp="@preview" />` tag around the code that needs to be used in the code snippet section.
  - if you want to show two components that have no parent element, you can wrap them in a `Fragment` element.
- `tsx` file should export preview as `preview`.

The preview element will also take are of visual representation of code.

For example if you create a preview tsx file at `src/components/my-component/preview/MyComponent.tsx` with the following content:

```tsx
import {MyComponent, AnotherComponent} from '@financial-times/o3-my-component';

const MyPreviewComponent = () => {
	return (
		<>
			<meta itemProp="@preview" />
			<>
				<MyComponent />
				<AnotherComponent />
			</>
			<meta itemProp="@preview" />
		</>
	);
};

export const filePath = 'src/components/my-component/preview/MyComponent.tsx';

export {MyPreviewComponent as preview};
```

And then use the preview element in `.astro` file like this:

```jsx
import * as Component from './preview/MyComponent.tsx';

<Preview component={Component} />;
```

## Authoring and sending a newsletter

Writing the Origami monthly newsletter extends the instructions for blog posts, as we also publish an email to the FT's Product and Technology department.

The process:

1. Branch off `main` and create the required files. The format for the newsletter is strict, and you should probably copy an older newsletter to make sure it's correct. You need a file in this repo, replacing the date as appropriate (set to the expected published date):

   - `src/content/posts/YYYY-MM-DD-newsletter.md`: for the blog post on the website

2. Write the newsletter. This is best done in the blog post, as this is standard Markdown. Ensure that you include a title and the `Newsletter` tag in the page's frontmatter, otherwise your blog post will not be published with an adjacent email HTML. See an [existing newsletter](https://github.com/Financial-Times/origami/blob/main/apps/website/src/content/posts/2023-05-31-newsletter.md?plain=1#L6-L7) on what to include.
3. Open a pull-request on this repo, and get it approved by another member of the team. Once approved, merge into master. This must be done _on_ or _after_ the publish date indicated by the post file name. The blog post is now published, check it on the live site.

4. Now you'll need send the newsletter as an email. This is done from your machines CLI. To avoid copy/paste errors in the HTML we created [email page template](src/pages/emails/[slug].astro) in Astro. The email also has required front-matter: a `title` which becomes the subject of the email.

5. **It is very important to review the email before sending it**. To review you can visit `emails/newsletter-YYYY-MM` locally or on [deployed site](https://origami.ft.com/). If you want to test the newsletter email prior to publishing, you can send email without `EMAIL_RECIPIENTS` variable defined. This will send email to all origami team members. If you are still developing email locally and want to an email received just by you you can use your personal email for `EMAIL_RECIPIENTS` variable (you will need to add `EMAIL_LOCAL=true` variable and you will also need to be running local development server on localhost:3000) and setting `EMAIL_SEND=true` should send a newsletter to your email.

6. Once reviewed, run the following command to send the email: `EMAIL_SOURCE_HTML=YYYY-MM EMAIL_RECIPIENTS=XX@XX EMAIL_API_KEY=XXXXXX EMAIL_SEND=true npm run send-newsletter`, where `YYYY` and `MM` correspond to the year and month of the newsletter, `XX@XX` is the recipient email, and `XXXXXX` is an email platform API key (you can find this in the Origami team Doppler project).

7. The email is sent! Enjoy

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

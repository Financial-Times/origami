# Origami [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

This is the source code for the Origami website as well as a place to open up issues on Origami as a whole. Please visit [origami.ft.com] if you're looking for the documentation.

## Editing this site

This is a rough guide to editing this site, and where the content lives. The site is built using [Astro](https://docs.astro.build/en/getting-started).

### Pages

Pages live in the [`pages` folder](src/pages). We store them in this folder to avoid cluttering up the root path of the repo. Astro router is based on directory structure. Folder names are used to create the URL path, so `src/pages/documentation/index.astro` becomes `/documentation` on the site.

Providing `index.astro` file in each directory also helps us to generate secondary navigations where needed. We automatically detect ancestor and children navigation items based on the directory structure and pathname of urls to generate breadcrumb navigation.

### Styles

For styling the site we are using [Origami build service](https://www.ft.com/__origami/service/build/v3/). Astro supports using SCSS out of the box but we had performance issues while hot reload updating on local development server. Using build service allows us to use bundled CSS for components, that has better performance and improves developer experience. All the bundled styles are loaded in the [Layout.astro](src/layouts/Layout.astro) file.

### Technical documentation pages

The actual documentation for Origami lives in the [`pages/documentation`](src/pages/documentation/) folder and it includes [`components`](src/pages/documentation/components), [`services`](src/pages/documentation/services), [`principles`](src/pages/documentation/principles), and [`tutorials`](src/pages/documentation/tutorials) folders. This should contain an easier-to-digest version of the Origami specification as well as in depth guides on how to use Origami.

### Racing bar charts

For Origami's ten year anniversary we created a racing bar chart to show the growth of Origami components over time. The data for this chart is stored in the [racing-bar-chart-data.json](src/content/barchart-data/component-data.json) file. The chart is rendered in the [RacingBarChart.astro](src/content/posts/2023-08-02-data-vis.mdx) blog post. The data for racing bar chart does not update manually and if you want to have fresh data for next deployment you will need to run `npm run generate-bar-chart-data` command.

### Blog posts

Blog posts live in the [`posts` folder](src/content/posts) and the file names are prefixed with the post date. Posts can include an `author` frontmatter value to signify who wrote the post, and an array of `tags` which are displayed alongside the post. The `description` frontmatter is particularly important for blog posts as it is displayed as a preview on the blog listing. The `publishDate` frontmatter for a date that newsletter was published. And `tldr` frontmatter is used to display a summary of the post before the main content. If it is omitted the description will be used instead.

Newsletter blog posts must have an accompanying email, this is outlined in the section ["Authoring and sending a newsletter"](#authoring-and-sending-a-newsletter).

## Authoring and sending a newsletter

Writing the Origami monthly newsletter extends the instructions for blog posts, as we also publish an email to the FT's Product and Technology department.

The process:

1. Branch off `main` and create the required files. The format for the newsletter is strict, and you should probably copy an older newsletter to make sure it's correct. You need a file in this repo, replacing the date as appropriate (set to the expected published date):

   - `src/content/posts/YYYY-MM-DD-newsletter.md`: for the blog post on the website

2. Write the newsletter. This is best done in the blog post, as this is standard Markdown. Ensure that you include the `Newsletter` tag, otherwise your blog post will not be published with an adjacent email HTML. See an [existing newsletter](https://github.com/Financial-Times/origami/blob/main/apps/astro-website/src/content/posts/2023-05-31-newsletter.md?plain=1#L6-L7) on what to include.
3. Open a pull-request on this repo, and get it approved by another member of the team. Once approved, merge into master. This must be done _on_ or _after_ the publish date indicated by the post file name. The blog post is now published, check it on the live site.

4. Now you'll need send the newsletter as an email. This is done from your machines CLI. To avoid copy/paste errors in the HTML we created [email page template](src/pages/emails/[slug].astro) in Astro. The email also has required front-matter: a `title` which becomes the subject of the email.

5. **It is very important to review the email before sending it**. To review you can visit `emails/newsletter-YYYY-MM` locally or on [deployed site](https://origami.ft.com/). If you want to test the newsletter email prior to publishing, you can send email without `EMAIL_RECIPIENTS` variable defined. This will send email to all origami team members. If you are still developing email locally and want to an email received just by you you can use your personal email for `EMAIL_RECIPIENTS` variable (you will need to add `EMAIL_LOCAL=true` variable and you will also need to be running local development server on localhost:3000) and setting `EMAIL_SEND=true` should send a newsletter to your email.

6. Once reviewed, run the following command to send the email: `EMAIL_SOURCE_HTML=YYYY-MM EMAIL_RECIPIENTS=XX@XX EMAIL_API_KEY=XXXXXX EMAIL_SEND=true npm run send-newsletter`, where `YYYY` and `MM` correspond to the year and month of the newsletter, `XX@XX` is the recipient email, and `XXXXXX` is an email platform API key (you can find this in the Origami team Doppler project).

7. The email is sent! Enjoy

## Running locally

1. Install dependencies: `npm i`
2. To run dev server: `npm run dev` or `npm run start`
3. Visit <http://localhost:3000/>

[origami.ft.com]: http://origami.ft.com/

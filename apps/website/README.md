# Origami [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

This is the source code for the Origami website as well as a place to open up issues on Origami as a whole. Please visit [origami.ft.com] if you're looking for the documentation.


## Editing this site

This is a rough guide to editing this site, and where the content lives.

### Static pages

Single static pages live in the [`pages` folder](pages). These each have `permalink` frontmatter set to indicate where the rendered page will live on the site. We store them in this folder to avoid cluttering up the root path of the repo.

### Technical documentation pages

The actual documentation for Origami lives in the [`_components`](_components), [`_services`](_services), [`_principles`](_principles), and [`_tutorials`](_tutorials) folders. This should contain an easier-to-digest version of the Origami specification as well as in depth guides on how to use Origami.

### Specification pages

The formal Origami specification lives in the [`_specification-v1` folder](_specification-v1).

### Blog posts

Blog posts live in the [`_posts` folder](_posts) and the file names are prefixed with the post date. Posts can include an `author` frontmatter value to signify who wrote the post, and an array of `tags` which are displayed alongside the post. The `description` frontmatter is particularly important for blog posts as it is displayed as a preview on the blog listing.

Newsletter blog posts must have an accompanying email, this is outlined in the section ["Authoring and sending a newsletter"](#authoring-and-sending-a-newsletter).


## Authoring and sending a newsletter

Writing the Origami monthly newsletter extends the instructions for blog posts, as we also publish an email to the FT's Product and Technology department. The guide here won't cover the content of the newsletter, [see the original proposal for that](https://docs.google.com/document/d/1qFXWl3xcx3MUL7FHGa7eA90TjGxDdLFTItizILKHZ2k/edit).

The process:

  1. Branch off `main` and create the required files. The format for the newsletter is strict, and you should probably copy an older newsletter to make sure it's correct. You need to create two files in this repo, replacing the date as appropriate (set to the expected published date):
	- `_posts/YYYY-MM-DD-newsletter.md`: for the blog post on the website
	- `_emails/newsletter-YYYY-MM.html`: for the email we distribute

  2. Write the newsletter. This is best done in the blog post, as this is standard Markdown. The email newsletter relies on some pretty gross Liquid templating to ensure that we avoid copy/paste errors in the HTML. Sorry. The email also has required front-matter: a `title` which becomes the subject of the email, and `companion_post_url` which is used to link to the blog post and should be the full URL. (when writing the newsletter, see the script `./scripts/project-board-summary.js` to help fill out the broader update section of the newsletter).

  3. Open a pull-request on this repo, and get it approved by another member of the team. Once approved, merge into master. This must be done _on_ or _after_ the publish date indicated by the post file name. The blog post is now published, check it on the live site.

  4. Now you'll need to review and publish the email, this is done in a locally cloned copy of the repo (this step may be automated later when we have confidence in the email format). You'll need to have npm dependencies installed: `npm install`

  5. Run the following command: `EMAIL_SOURCE_HTML=YYYY-MM make email-generate`, where `YYYY` and `MM` correspond to the year and month of the newsletter. This will output details of the email that is to be sent including links to review the conent. **It is very important to review these files, the HTML in-browser and the plain text in a text editor**. If you want to test the newsletter email prior to publishing, you can use the a `EMAIL_LOCAL=true` environment variable, though it is not possible to actually _send_ an email with this variable added.

  6. Once reviewed, run the following command to send the email: `EMAIL_SOURCE_HTML=YYYY-MM EMAIL_RECIPIENTS=XX@XX EMAIL_API_KEY=XXXXXX make email-generate-and-send`, where `YYYY` and `MM` correspond to the year and month of the newsletter, `XX@XX` is the recipient email, and `XXXXXX` is an email platform API key (you can find this in the Origami vault).

  7. The email is sent! Enjoy


## Running locally

You'll need [Ruby], [Bundler] and [Node.js] installed for this.

  1. Install dependencies: `make install`
  2. Build and serve the site: `make serve`
  3. Visit <http://localhost:4000/>



[bundler]: http://bundler.io/
[jekyll]: http://jekyllrb.com/
[node.js]: https://nodejs.org/
[origami.ft.com]: http://origami.ft.com/
[ruby]: https://www.ruby-lang.org/en/

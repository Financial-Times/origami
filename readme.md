# o-ft-forms

FT-branded form elements, including buttons.

## Viewing the demo pages

Run the following at the command line:

	git clone http://git.svc.ft.com:9080/git/origami/o-ft-forms.git

Open `demos/example.html` in a web browser.

## Development

1. `git clone http://git.svc.ft.com:9080/git/origami/o-ft-forms.git`
2. `npm install`
3. `bower install`
4. Edit the code in `src/scss` and `example.mustache` as required.
4. Run `grunt` to rebuild the HTML and CSS in the demos folder.

## Using as a Bower dependency

Include the following in your bower.json's dependencies:

    "o-ft-forms": "http://git.svc.ft.com:9080/git/origami/o-ft-forms.git#{semver}"

Include this in your `main.scss`

    @import "o-ft-forms/main";
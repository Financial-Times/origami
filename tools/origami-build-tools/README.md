# origami-build-tools

Build tools for developing Origami components.

- [Installation](#installation)
- [Usage](#usage)
- [Commands](#commands)
- [API Reference](#api-reference)
- [Migration Guides](#migration-guides)
- [Licence](#licence)

## Installation

1. Install [node.js](http://nodejs.org/)

2. Install the build tools globally:

	`npm install -g origami-build-tools`

## Usage

### Developing Existing Components Locally

First, change to your components directory:
```
git clone git@github.com:Financial-Times/o-table.git
cd o-table
```

Then install its dependencies:

`obt install`

To preview the components demos run the `dev` command. The `dev` command will automatically re-build the demos every time a file changes:

`obt dev`

After making your changes run the linter and check for errors:

`obt lint`

Also run the components tests:

`obt test`

To debug JavaScript test errors with immediate feedback and breakpoints, pass the `debug` flag. This will open the tests in a browser window with logs in the browser console. It will also watch and rebuild tests when you make changes:

`obt test --debug`

Further, JavaScript tests may be run in BrowserStack automatically with the `--browserstack` flag. See the [test command](#test-or-t) for more details.

### Creating A New Component

Origami Build Tools provides boilerplate for creating up a new Origami component. Run `obt init` and follow the prompts.

## API Reference

	Usage
		$ obt <command> [<options>]

	Commands
		install, i             Install npm dependencies required to build the component
		develop, dev           Build demos locally every time a file changes and run a server to view them
		demo, d                Build demos into the demos directory
		init                   Initialise a new component with a boilerplate folder structure
		test, t                Run Origami specification tests and component specific tests
		verify, v, lint, l     Check folder and code structure follows Origami specification

	Options
		-h, --help                 Print out this message
		-v, --version              Print out version of origami-build-tools
		--browserstack             Run tests using Browserstack instead of Chrome Stable
		--demo-filter=<demo-name>  Build a specific demo. E.G. --demo-filter=pa11y to build only the pa11y.html demo.
		--brand=<brand-name>       Build SCSS for a given brand. E.G. --brand=internal to build the component for the internal brand.
		--debug                    Keep the test runner open to enable debugging in any browser.

## Commands

### `install` or `i`

Install npm required to build components.

### `develop` or `dev`

Build demos locally every time a file changes and run a server to view them.

### `init`

Creates boilerplate for a new Origami component.

### `demo` or `d`

Build demos found in the [origami.json manifest](https://origami.ft.com/docs/manifests/origami-json/#demos).

Build a specific demo with the `--demo-filter` option.

Demos consist of HTML, CSS and JS (if Sass & JS exists), and are created in `demos/local/`. These files should not be committed. It is recommended to add _demos/local/_ to your `.gitignore`.

### `verify` or `v` or `lint` or `l`

Lints JavaScript, Sass and configuration files ([see Origami code recommendations](https://origami.ft.com/docs/components/code/)).

### `test` or `t`

Runs JavaScript and Sass tests.

* If `--debug` is set, the test runner will not exit automatically to allow debugging of the tests.

Checks Sass [includes a primary mixin](https://origami.ft.com/docs/components/code/#sass).
If `pa11y.html` demo exists, confirms it is accessible using [Pa11y](http://pa11y.org/).
Runs tests using [Karma](https://karma-runner.github.io) defaulting to Chrome Stable, can be configured to use BrowserStack by using the `--browserstack` flag. You will need the environment variables `BROWSER_STACK_USERNAME` and `BROWSER_STACK_ACCESS_KEY` set. This will run the tests on the minimum version for enhanced experience based on the [FT Browser Support Policy[(https://docs.google.com/document/d/1mByh6sT8zI4XRyPKqWVsC2jUfXHZvhshS5SlHErWjXU).

## Migration Guides

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 11 | N/A | [migrate to v11](MIGRATION.md#migrating-from-v10-to-v11) |
⚠ maintained | 10 | 10.9 | [migrate to v10](MIGRATION.md#migrating-from-v9-to-v10) |
╳ deprecated | 9 | 9.0 | [migrate to v9](MIGRATION.md#migrating-from-v8-to-v9) |
╳ deprecated | 8 | 8.2 | [migrate to v8](MIGRATION.md#migrating-from-v7-to-v8) |
╳ deprecated | 7 | 7.14 | [migrate to v7](MIGRATION.md#migrating-from-v6-to-v7) |
╳ deprecated | 6 | 6.2 | [migrate to v6](MIGRATION.md#migrating-from-v5-to-v6) |
╳ deprecated | 5 | 5.8 | - |
╳ deprecated | 4 | 4.5 | - |
╳ deprecated | 3 | 3.3 | - |
╳ deprecated | 2 | 2.1 | - |
╳ deprecated | 1 | 1.0 | N/A |

## Licence
This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

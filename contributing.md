# How to contribute to o-icons

Thank you for your interest in contributing to o-icons! As our icons are used by a lot of different applications, we have a few constraints for new ones. If you aren't sure if your new icon meets any of these, please [raise an issue](http://github.com/financial-times/o-icons/issues), or ask in the #ft-origami slack channel.
Thank you!

## Adding or updating an icon

If you want to add or update an icon, please open a pull request, making sure the new icon meets the following criteria:

### Design:

1. icons must be a single colour (black)
1. icons should be suitable for reuse in more than 1 application
1. icons must meet a need that is not already met by a pre-existing icon

### Technical:

1. icons must be SVG v1.1
1. icons should have a bounding box of about 128
1. icons must not contain any ClipPaths
1. icons must have been run through an SVG compression service (such as [SVGOMG](https://jakearchibald.github.io/svgomg/))
1. icons must have been tested with the [Responsive Image Service](https://financial-times.github.io/responsive-image-proxy-helper/)'s SVG -> PNG conversion. [How do I do this?](#how-to-test-an-icon-with-the-image-service)

### Naming conventions:

  - all lower case
  - contain only letters, numbers and hyphens (no spaces)
  - end with .svg
  -- **Good**: columnists.svg, back-arrow.svg
  -- **Bad**: RightArrow.svg, linked_in.svg, yahoo!.svg


## How to add a new icon

If your icon meets the design and technical criteria please follow the following steps and then open a Pull Request:

1. Clone the repository and install dependencies:

		git clone https://github.com/Financial-Times/o-icons.git
		cd o-icons
		obt install

1. Add or edit an SVG file to the `svg` folder.
1. Rebuild the demos so people can see the new icon over on http://registry.origami.com/components/o-icons. To do this run:

		gulp

1. Check the rendering locally (on [http://localhost:8080/demos/local](http://localhost:8080/demos/local)):

		obt demo --runServer


## Removing an icon

A lot of people use o-icons in many different ways. To remove an icon completely from o-icons, please [raise an issue](http://github.com/financial-times/o-icons/issues) so that the Origami team can manage the deprecation process.

## How to test an icon with the Image Service

The Image Service provides the ability to convert an SVG to a PNG. This is useful as a fallback for browsers that don't support SVGs.

The Image Service doesn't support clipPaths, so any SVG that has a clipPath in it may not render correctly. To check if your SVG works, upload it somewhere (eg dropbox, or gh-pages) and then run its public url through the Image Service with `format=png` as a parameter. ie:

`https://image.webservices.ft.com/v1/images/raw/{http://path-to-image.svg}?source=test&format=png`

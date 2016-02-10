# Next Video [![Circle CI](https://circleci.com/gh/Financial-Times/n-video.svg?style=svg)](https://circleci.com/gh/Financial-Times/n-video)

Creates a video player and attaches analytics

## Installation

    $ bower install n-video --save

## Usage

Create an element of the format e.g.

    <div data-n-component="n-video"
        data-n-video-source="brightcove"
        data-n-video-id="4165329773001"></div>

Where

 * `data-n-video-source['brightcove']` Source of the video (currently only accepts `Brightcove`)
 * `data-n-video-id` Source's ID of the video

In JS

    var nVideo = require('n-video');
    var opts = {
        optimumWidth: 710,
        placeholder: true,
        classes: ['video'],
        selector: '.js-video'
    };
    nVideo.init(opts);

Where `opts` is an optional object with properties

 * `optimumWidth` [`Number`] The optimum width of the video, used when there are multiple video renditions available to
 decide which to display (the smallest one that's at least as large as this width, if it exists)
 * `placeholder` [`Boolean`] Show just the poster image, load (and play) video on click
 * `placeholderTitle` [`Boolean`] Show just the title as an overlay on the placeholder
 * `classes` [`Array`] Classes to add to the video (and placeholder) element
 * `selector` [`String`] Selector to use to find the `n-video` elements. Appended with
 `:not([data-n-video-js])[data-n-component~="n-video"]`. Defaults to `*`.

 `optimumWidth`, `palceholder` and `classes` can also be set in the markup with an attribute of the form `data-n-video-opts-*`, e.g.
 `data-n-video-opts-optimum-width="300"`. These trump options supplied to the `init` method.

 If the data is available, it can also be passed through in an attribute (e.g. `data-n-video-opts-data="{ "videoStillURL": ... }"`)
 to save the browser an HTTP request

## Development

    $ npm install origami-build-tools
    $ make install
    $ make demo

And then visit [http://localhost:8080/demos/local](http://localhost:8080/demos/local)

Before committing, run

    $ make pre-commit

## Testing

    $ make test

(Requires Firefox)

## TODO

 * Add support for Vimeo(?)

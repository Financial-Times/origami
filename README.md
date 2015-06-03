# Next Video

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
        placeholder: true
    };
    nVideo.init(opts);

Where `opts` is an optional object with properties

 * `optimumWidth` [Number] The optimum width of the video, used when there are multiple video renditions available to decide which to display (the smallest one that's at least as large as this width, if it exists)
 * `palceholder` [Boolean] Show just the poster image, load (and play) video on click
 * `classes` [Array] Classes to add to the video (and placeholder) element

## Development

    $ npm install origami-build-tools
    $ make install
    $ make demo

And then visit [http://localhost:8080/demos/local/brightcove.html]()

Before committing, run

    $ make pre-commit

## Testing

    $ make test

(Requires Firefox)

## TODO

 * Add support for Vimeo(?)

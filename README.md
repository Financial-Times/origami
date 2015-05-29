# Next Video

Creates a video player and attaches analytics

## Installation

    $ bower install n-video --save

## Usage

Create an element of the format e.g.

    <div data-n-component="n-video"
        data-n-video-source="Brightcove"
        data-n-video-id="4165329773001"></div>

Where

 * `data-n-video-source['brightcove']` Source of the video (currently only accepts `Brightcove`)
 * `data-n-video-id` Source's ID of the video

In JS

    var nVideo = require('n-video');
    nVideo.init();

## TODO

 * Add support for Vimeo

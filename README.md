# Next Video

Creates a video player and attaches analytics

## Installation

    $ bower install next-video --save

## Usage

Create an element of the format e.g.

    <div data-next-component="next-video"
        data-next-video-source="Brightcove"
        data-next-video-id="4165329773001"></div>

Where

 * `data-next-video-source['brightcove']` Source of the video (currently only accepts `Brightcove`)
 * `data-next-video-id` Source's ID of the video

In JS

    var nextVideo = require('next-video');
    nextVideo.init();

## TODO

 * Add support for YouTube/Vimeo

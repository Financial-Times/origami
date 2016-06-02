# FT Video [![Circle CI](https://circleci.com/gh/Financial-Times/o-video.svg?style=svg)](https://circleci.com/gh/Financial-Times/o-video)

Creates a video player and attaches analytics

## Usage

Create an element of the format e.g.

    <div data-o-component="o-video"
        data-o-video-source="brightcove"
        data-o-video-id="4165329773001"></div>

Where

 * `data-o-video-source['brightcove']` Source of the video (currently only accepts `Brightcove`)
 * `data-o-video-id` Source's ID of the video

In JS

    var oVideo = require('o-video');
    var opts = {
        optimumWidth: 710,
        placeholder: true,
        classes: ['video'],
        selector: '.js-video'
    };
    oVideo.init(opts);

Where `opts` is an optional object with properties

 * `optimumWidth` [`Number`] The optimum width of the video, used when there are multiple video renditions available to
 decide which to display (the smallest one that's at least as large as this width, if it exists)
 * `placeholder` [`Boolean`] Show just the poster image, load (and play) video on click
 * `placeholderTitle` [`Boolean`] Show just the title as an overlay on the placeholder
 * `classes` [`Array`] Classes to add to the video (and placeholder) element
 * `selector` [`String`] Selector to use to find the `o-video` elements. Appended with
 `:not([data-o-video-js])[data-o-component~="o-video"]`. Defaults to `*`.

 `optimumWidth`, `palceholder` and `classes` can also be set in the markup with an attribute of the form `data-o-video-opts-*`, e.g.
 `data-o-video-opts-optimum-width="300"`. These trump options supplied to the `init` method.

 If the data is available, it can also be passed through in an attribute (e.g. `data-o-video-opts-data="{ "videoStillURL": ... }"`)
 to save the browser an HTTP request

## Testing

    $ npm test

(Requires Firefox)

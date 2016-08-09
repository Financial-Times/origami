# FT Video [![Circle CI](https://circleci.com/gh/Financial-Times/o-video.svg?style=svg)](https://circleci.com/gh/Financial-Times/o-video)

Creates a video player and attaches analytics. Also supports pre roll ads.

## Usage

Create an element of the format e.g.

```html
    <div data-o-component="o-video"></div>
```

In JS

```js
    const OVideo = require('o-video');
    const opts = {
        id: 4165329773001,
        source: "brightcove",
        optimumwidth: 710,
        placeholder: true,
        classes: ['video']
    };
    const video = new OVideo(document.body, opts);
```

### Config

Where `opts` is an optional object with properties

 * `id` [`Number`] Source's ID of the video
 * `source` [`String`] Source of the video (currently only accepts `brightcove`)
 * `optimumwidth` [`Number`] The optimum width of the video, used when there are multiple video renditions available to
 decide which to display (the smallest one that's at least as large as this width, if it exists)
 * `placeholder` [`Boolean`] Show just the poster image, load (and play) video on click
 * `placeholderTitle` [`Boolean`] Show just the title as an overlay on the placeholder
 * `classes` [`Array`] Classes to add to the video (and placeholder) element

The config options can also be set as data attribute to instantiate the module declaratively:

```html
    <div data-o-component="o-video"
            data-o-video-id="4165329773001"
            data-o-video-source="brightcove"
            data-o-video-optimumwidth="710"></div>
```

## Testing

    $ npm test

(Requires Firefox)

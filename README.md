# FT Video [![Circle CI](https://circleci.com/gh/Financial-Times/o-video.svg?style=svg)](https://circleci.com/gh/Financial-Times/o-video)

Creates a video player and attaches analytics. Also supports pre roll ads.

## Usage

Create an element of the format e.g.

```html
<div data-o-component="o-video o-video--large"></div>
```

In JS

```js
const OVideo = require('o-video');
const opts = {
	id: 4165329773001,
	optimumwidth: 710,
	placeholder: true,
	classes: ['video']
};
const video = new OVideo(document.body, opts);
```

### Config

Where `opts` is an optional object with properties

 * `id` [`String`] Source's ID of the video (`brightcoveId` or `uuid`)
 * `autorender` [`Boolean`] Whether to have the video render automatically. If *false* then you will need to call `init()` when ready
 * `optimumwidth` [`Number`] The optimum width of the video placeholder image
 * `optimumvideowidth` [`Number`] The optimum width of the video itself, used when there are multiple video renditions available to
 decide which to display (the smallest one that's at least as large as this width, if it exists)
 * `placeholder` [`Boolean`] Show just the poster image, load (and play) video on click
 * `placeholderHint` [`String`] An optional hint to display alongside the play icon (defaults to empty)
 * `placeholderInfo` [`Array`] A list of extra information to display on the placeholder (Available: title, description, brand)
 * `playsinline` [`Boolean`] Whether to play the [video inline](https://webkit.org/blog/6784/new-video-policies-for-ios/) on iOS smallscreen (defaults to fullscreen)
 * `classes` [`Array`] Classes to add to the video (and placeholder) element
 * `advertising` [`Boolean`] whether or not to show ads on the video
 * `showCaptions` [`Boolean`] whether or not to add captions to the video. Defaults to *true*.
 * `data` [`Object`] JSON object representing a [response from next-media-api](https://next-media-api.ft.com/v1/eebe9cb5-8d4c-3bd7-8dd9-50e869e2f526). If used, the component will not make a call to the API and use this data instead.

The config options can also be set as data attribute to instantiate the module declaratively:

```html
<div data-o-component="o-video o-video--large"
	data-o-video-id="4165329773001"
	data-o-video-optimumwidth="710">
</div>
```

### With a playlist

Playlists may take a queue of videos and play them one after another.

```js
const Video = require('o-video');

const queue = [
	'4165329773001',
	'4907997821001',
	'4165329773001'
];

const player = new Video(document.body, { autorender: false });
const playlist = new Video.Playlist({ player, queue });

document.querySelector('.next-btn').onclick = () => playlist.next();
document.querySelector('.prev-btn').onclick = () => playlist.prev();
```

The queue is an `array` containing Brightcove video ID strings.

## Testing
```
$ npm test
```
Requires Firefox (v38.0.0 to test with polyfills and mirror CircleCI)


## Migration Guide

Migrating from 3.0 to 4.0
-------------------------

Version 4 introduces the new majors of o-colors, o-loading, and o-typography. Updating to this new version will mean updating any other components that you have which are using o-colors, o-loading, or o-typography. There are no other breaking changes in this release.

Migrating from 2.0 to 3.0
-------------------------

The `videoSource` and `captionsUrl` options no longer exist. Captions can be toggled on or off by using the `showCaptions` boolean. This defaults to `true`, so if the video data (now gotten from the [next-media-api](https://github.com/Financial-Times/next-media-api)) contains captions, then the component will present them to the user.

Since 3.0, if `showCaptions` is *true*, calling `addVideo()` directly will throw an error. This is due to the fact the component needs to source the `captionsUrl` first. Either leave `autorender` as *true* or call `init()` instead.

In the previous version, the call to the API could be skipped by using the `data` option, passing in a response from `next-video-api`. This option can still be used, but the data will now need to match a `next-media-api` response – [see an example](https://next-media-api.ft.com/v1/eebe9cb5-8d4c-3bd7-8dd9-50e869e2f526).

```diff
<div class="video-container">
	<div class="o-video" data-o-component="o-video"
-		data-o-video-source="Brightcove"
		data-o-component="o-video"
		data-o-video-id="4165329773001"
		data-o-video-advertising="true"
		data-o-video-placeholder="true"
- 		data-o-video-captions-url="http://www.path.to/captions.vtt"
+ 		data-o-video-show-captions="true"
	></div>
</div>
```

Migrating from 1.0 to 2.0
-------------------------

### Configuration

The `placeholdertitle` property no longer exists, it has been replaced by `placeholder-info` which accepts an array containing one or more of `'title'`, `'description'`, `'brand'`.

```diff
<div class="video-container">
	<div class="o-video" data-o-component="o-video"
		data-o-video-source="Brightcove"
		data-o-component="o-video"
		data-o-video-id="4165329773001"
		data-o-video-advertising="true"
		data-o-video-placeholder="true"
- 		data-o-video-placeholdertitle="true"
+ 		data-o-video-placeholder-info="['title']"
	></div>
</div>
```

The `optimumwidth` property is no longer used for the video width, it is now only used for the poster image width. To choose an optimum video width you can use the new property `optimumvideowidth`.


```diff
<div class="video-container">
	<div class="o-video" data-o-component="o-video"
		data-o-video-source="Brightcove"
		data-o-component="o-video"
		data-o-video-id="4165329773001"
		data-o-video-advertising="true"
		data-o-video-placeholder="true"
		data-o-video-placeholder-info="['title']"
		data-o-video-optimumwidth="400"
+ 		data-o-video-optimumvideowidth="400"
	></div>
</div>
```

### Sass

The silent flag `_o-video_applied` variable has been renamed to `o-video-is-silent` and has had it's default value changed from `false` to `true`. If you want to include the component with the styles please look at the code diff below.

```diff
+ $o-video-is-silent: false;
@import 'o-video/main';
```

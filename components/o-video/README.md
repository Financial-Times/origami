# o-video [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

Creates a video player and attaches analytics. Also supports pre roll ads.

- [Usage](#usage)
- [Markup](#markup)
- [Sass](#sass)
- [JavaScript](#javascript)
	- [Config](#config)
	- [With a playlist](#with-a-playlist)
- [Testing](#testing)
- [Migration](#migration)
- [Contact](#contact)
- [Licence](#licence)

## Usage

Check out [how to include Origami components in your project](https://origami.ft.com/docs/components/#including-origami-components-in-your-project) to get started with `o-video`.

## Markup

```html
<div class="o-video" data-o-component="o-video"></div>
```

Videos can be styled in three different sizes, namely 'small', 'medium' and 'large', which can be added to the element as class modifiers, e.g.

```html
<div class="o-video o-video--large" data-o-component="o-video"></div>
```

## Sass

In order to output every size and attribute of `o-video`, you'll need to include the following:

```scss
@import '@financial-times/o-video/main';

@include oVideo();
```

You can be more selective about which sizes and attributes you would like to output, by using an `$opts` map. It accepts the following lists:

**attributes**
- `'ads'`
- `'info'`
- `'placeholder'`

**sizes**
- `'small'`
- `'medium'`
- `'large'`

```scss
@import '@financial-times/o-video';

@include oVideo($opts:(
	'attributes': ('ads'),
	'sizes': ('small', 'large')
))

// outputs small and large video styles, and styling support for ads
```

## JavaScript

In order to initialise `o-video`, you will need the following:

```js
import Video from '@financial-times/o-video';
const opts = {
	id: 4165329773001,
	optimumwidth: 710,
	placeholder: true,
	classes: ['video'],
	systemcode: 'my-biz-ops-code'
};
const video = new Video(document.body, opts);
```

### Config

Where `opts` is an optional object with properties

- `id` `[String]` Source's ID of the video (`brightcoveId` or `uuid`)
- `autorender` `[Boolean]` Whether to have the video render automatically. If-false* then you will need to call `init()` when ready
- `optimumwidth` `[Number]` The optimum width of the video placeholder image
- `optimumvideowidth` `[Number]` The optimum width of the video itself, used when there are multiple video renditions available to
 decide which to display (the smallest one that's at least as large as this width, if it exists)
- `placeholder` `[Boolean]` Show just the poster image, load (and play) video on click
- `placeholderHint` `[String]` An optional hint to display alongside the play icon (defaults to empty)
- `placeholderInfo` `[Array]` A list of extra information to display on the placeholder (Available: title, description, brand)
- `playsinline` `[Boolean]` Whether to play the [video inline](https://webkit.org/blog/6784/new-video-policies-for-ios/) on iOS smallscreen (defaults to fullscreen)
- `classes` `[Array]` Classes to add to the video (and placeholder) element
- `advertising` `[Boolean]` whether or not to show ads on the video
- `showCaptions` `[Boolean]` whether or not to add captions to the video. Defaults to *true*.
- `data` `[Object]` JSON object representing a [response from next-media-api](https://next-media-api.ft.com/v1/eebe9cb5-8d4c-3bd7-8dd9-50e869e2f526). If used, the component will not make a call to the API and use this data instead.
- `systemcode` `[String]` a valid [Bizops system code](https://biz-ops.in.ft.com/list/Systems) for the project using `o-video`.

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
import Video from '@financial-times/o-video';

const queue = [
	'4165329773001',
	'4907997821001',
	'4165329773001'
];

const player = new Video(document.body, { autorender: false, systemcode: 'my-biz-ops-code' });
const playlist = new Video.Playlist({ player, queue });

document.querySelector('.next-btn').onclick = () => playlist.next();
document.querySelector('.prev-btn').onclick = () => playlist.prev();
```

The queue is an `array` containing Brightcove video ID strings.

## Testing
See [Origami build tools](https://github.com/Financial-Times/origami-build-tools).

```
$ obt test
```

Requires Firefox (v38.0.0 to test with polyfills and mirror CI)


## Migration

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 7 | N/A | [migrate to v7](MIGRATION.md#migrating-from-v6-to-v7) |
⚠ maintained | 6 | 6.1 | [migrate to v6](MIGRATION.md#migrating-from-v5-to-v6) |
╳ deprecated | 5 | 5.1 | [migrate to v5](MIGRATION.md#migrating-from-v4-to-v5) |
╳ deprecated| 4 | 4.1 | [migrate to v4](MIGRATION.md#migrating-from-v3-to-v4) |
╳ deprecated | 3 | 3.1 | [migrate to v3](MIGRATION.md#migrating-from-v2-to-v3) |
╳ deprecated | 2 | 2.5 | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
╳ deprecated | 1 | 1.4 | N/A |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-video/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

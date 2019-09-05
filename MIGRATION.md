
## Migration Guide

### Migrating from 5.0 to 6.0

Version 6 updates its dependency on `o-icons`. It is no longer compatible with `o-icons@^4`. Ensure your project builds successfully without conflicts.

A `systemcode` option is also required, which must be a valid [Bizops system code](https://biz-ops.in.ft.com/list/Systems) for the project using `o-video`. Set this declaratively using `data-o-video-systemcode` or by adding to the `opts` constructor argument.

```diff
import Video from 'o-video';
const opts = {
	id: 4165329773001,
	optimumwidth: 710,
+	systemcode: 'my-biz-ops-code'
};
const video = new Video(document.body, opts);
```

### Migrating from 4.0 to 5.0

Version 5 introduces a new major of `o-loading`. Updating to this new version will mean updating any other components that you have which are using `o-loading`.

It also removes the dependency on `o-fetch-jsonp`, and requires the `fetch` polyfill to run in older browsers— we recommend visiting the [documentation for the Polyfill service](https://origami-test.ft.com/docs/components/compatibility/#polyfill-service) to do so.

This version also introduces the primary mixin, `oVideo()`.

The following mixins are now private. Make sure your project does not use them, use `oVideo` instead:

```diff
-oVideoInfoSmall
+_oVideoInfoSmall
-oVideoInfoMedium
+_oVideoInfoMedium
-oVideoInfoLarge
+_oVideoInfoLarge
```

### Migrating from 3.0 to 4.0

Version 4 introduces the new majors of `o-colors`, `o-loading`, and `o-typography`. Updating to this new version will mean updating any other components that you have which are using `o-colors`, `o-loading`, or `o-typography`. There are no other breaking changes in this release.

### Migrating from 2.0 to 3.0

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

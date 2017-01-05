# Video analytics

An overview of the o-video analytics.

## Adverts events

The advert events are fired by the [Google IMA SDK](https://developers.google.com/interactive-media-ads/docs/sdks/html5/v3/apis#ima.AdEvent.Type).

- adStart - The advert started.
- adComplete - The advert finished (i.e. played through to the end).
- adSkippable - The advert is skippable, fired when the state changes to skippable.
- adSkip - The user skipped the advert.

Each event comes with extra detail.

```js
detail: {
	advertising: true,
	category: 'video',
	contentId: this.video.opts.id,
	progress: 0,
	adDuration: ad.getDuration(),
	adMinDuration: ad.getMinSuggestedDuration(),
	adTitle: ad.getTitle(),
	adProgress: this.getAdProgress()
}
```

More details of the `ad.*` API calls are in the [IMA SDK](https://developers.google.com/interactive-media-ads/docs/sdks/html5/v3/apis).

## Video events

The video events are fired as part of the [native HTML Media Events API](https://developer.mozilla.org/en/docs/Web/Guide/Events/Media_events).

- playing - The video started playing.
- progress - The video played through to a particular waypoint, defaults to firing events at ~25/50/75/100% progress.
- ended - The video played through to the end
- seeked - The user jumped to a point in the video.
- pause - The user paused the video.

Each event has the following additional properties,

```js
detail: {
	action: ev.type,
	advertising: video.opts.advertising,
	category: 'video',
 	contentId: video.opts.id,
	progress: video.getProgress(),
	duration: video.videoEl.duration
}
```

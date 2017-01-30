# Video analytics

An overview of the o-video analytics.

## Adverts events

The advert events are fired by the [Google IMA SDK](https://developers.google.com/interactive-media-ads/docs/sdks/html5/v3/apis#ima.AdEvent.Type).

- adRequested - The request to the ad server has been made.
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
	duration: video.getDuration()
}
```

Further, there is a `watched` event which is fired on page `unload`, which contains how much (in seconds) of the
video was actually watched, e.g.

```js
detail: {
    category: 'video',
    action: 'watched',
    advertising: true,
    contentId: 5290303519001
    amount: 83.47, // amount of the video actually watched, in seconds
    amountPercentage: 71.96 // as percentage of the total length of the video, could be > 100
}
```

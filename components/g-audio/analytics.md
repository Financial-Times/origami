# Audio analytics

An overview of g-audio analytics.

## Audio events

The following audio events are fired as part of the [native HTML Media Events API](https://developer.mozilla.org/en/docs/Web/Guide/Events/Media_events):

- playing: user played the audio
- progress: audio played through to a particular waypoint, fires at ~10/25/50/75/100 progress
- ended: audio played through to the end
- seeked: user jumped to a point in the audio
- pause: user paused the audio

Each event has the following additional properties:

```js
detail: {
  category: 'audio',
  playerType: '[inline|inline-multiplelines|block]',
  action: ev.type,
  contentId: 'url-of-audio-file',
  progress: 88, // current time / length (percentage)
  duration: 14, // audio length in seconds
}
```

There is also a `listened` event which is fired on page `unload`, which contains how much (in seconds) of the audio was actually played, e.g.

```js
detail: {
  category: 'audio',
  action: 'listened',
  contentId: 'url-of-audio-file',
  amount: 83.47, // amount of the audio actually listened to, in seconds
  amountPercentage: 71.96 // as percentage of the total length of the audio, could be > 100
}
```

# Audio analytics

An overview of o-audio analytics.

## Audio events

The following audio events are fired as part of the [native HTML Media Events API](https://developer.mozilla.org/en/docs/Web/Guide/Events/Media_events):
- playing: user played the audio
- progress: audio played through to a particular waypoint, fires at ~10/25/50/75/85/90/95/100 progress
- ended: audio played through to the end
- seeked: user jumped to a point in the audio
- pause: user paused the audio

Each event has the following additional properties:

```js
detail: {
  category: 'audio',
  action: ev.type,
  progress: 88, // current time / length (percentage)
  duration: 14, // audio length in seconds
  // optional properties
  contentId: 'url-of-audio-file', 
  playerType: '[inline|inline-multiplelines|block]',
  audioSubtype: 'podcast'
}
```
There is also a `listened` event which contains how much (in seconds) of the audio was actually played. This event is fired on page `unload` or when the component is destroyed (as it the case in the app).

```js
detail: {
  category: 'audio',
  action: 'listened',
  amount: 83.47, // amount of the audio actually listened to, in seconds
  amountPercentage: 71.96 // as percentage of the total length of the audio, could be > 100
  // optional properties
  contentId: 'url-of-audio-file', 
  playerType: '[inline|inline-multiplelines|block]',
  audioSubtype: 'podcast'
}
```
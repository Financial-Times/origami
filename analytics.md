# Audio analytics

An overview of __proposed__ g-audio analytics. This has not been implemented yet.

## Audio events

The following audio events are fired:
- play: user played the audio
- progress: audio played through to a particular waypoint, fires at ~25/50/75/100 progress
- ended: audio played through to the end
- seeked: user jumped to a point in the audio
- pause: user paused the audio

Each event has the following additional properties:

```js
detail: {
  category: 'audio',
  playerType: '[inline|block]',
  action: ev.type,
  contentId: url-of-audio-file,
  progress: audio.getProgress(),
  duration: audio.getDuration(),
}
```

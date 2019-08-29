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
  audioSubtype: '[podcast|amy]',
  // current time / length (percentage)
  progress: 88,
   // audio length in seconds
  duration: 14,
  // The content id of the audio being played
  contentId: '{uuid}',
  // The content id of the article in which the audio is embedded
  rootContentId: '{uuid}',
  // A string to identify which player is being used.
  playerType: 'ft-audio-player',
  // The the value of root ID when audio playback started.
  root_id: '{event_root_id}'
}
```

##

Each audio event is inserted into the `Audio` table in redshift, which in turn powers the audio dashboard in chartio. Before an audio event is inserted, it passes through a number of systems which ensure the event contains all the data required for reporting. A simplification of [the architecture](https://sites.google.com/ft.com/data/documentation/spoor-stream-processor) is documented below.


![](https://user-images.githubusercontent.com/616321/63938362-82b1c080-ca5c-11e9-8eb9-e252b6b9e5e2.png)


| System/module  | Responsibility | Owned by | Useful reference |
| ------------- | ------------- | ------------- |  ------------- |
| o-audio  | Publishes audio event  | Customer Products | - |
| spoor-enrichment  | Enriches event with data about the audio (title etc.)  | Customer Products | [transforms/audio.js](https://github.com/Financial-Times/spoor-enrichment/blob/master/server/transforms/audio.js)
| spoor-stream-processor  | Maps fields in the event to columns in the audio table  | Data Platform | [mappings.json](https://github.com/Financial-Times/data-spoor-stream-processor/blob/master/config/mappings.json)
| Audio table  | Stores the audio event  | Data Platform | - |
| Bigquery/chartio  | Reporting on audio consumption  | Business Intelligence | [Audio dashboard](https://chartio.com/financialtimes/dashboard/356574/link_sharing/4847c824f70e33da577105929b98a7f6f6d0a887ce4bb697a99517febcf19fcb/) |



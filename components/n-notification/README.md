# n-notification [![Circle CI](https://circleci.com/gh/Financial-Times/n-notification/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/n-notification/tree/master)
Component for showing onsite notification bars to users. Concurrent notifications are stacked, most recent at the top.

# Usage

## Programatically

```js
import nNotification from 'n-notification';

nNotification.show({
	title: 'Optional title',
	content:'<p>Here is a message</p>',
	type: 'success', // optional, see below
	duration: 7000, // default is 5000, 0 will require user action to dismiss
	focusSelector: '.optional-focus-selector',
	returnFocusSelector: document.activeElement
});
```

## Custom Events

```js
import nNotification from 'n-notification';
nNotification.init();

const event = new CustomEvent('nNotification.show', {detail: { content: 'Title' }});
document.dispatchEvent(event);
```

## Types

`type` is optional, but if specified must have one of the following values:

* `error`, produces an error styled notification (red).
* `success`, styled green

If a type is not provided, it will result in a default FT pink notification.

## Focus Selectors

If you want to set the focus to a notification element, pass in the `focusSelector` and `returnFocusSelector` properties with an element (e.g. `.optional-focus-selector`) or a document property (e.g. `document.activeElement`). The `focusSelector` property is the notification element you want to focus on. The `returnFocusSelector` property is the element you want to return the focus to once the notification has cleared.

## Duration and accessibility
The timeout default is 5000ms.

0 will require the users to explicitly dismiss the message. This is the recommended UX from [DAC](https://digitalaccessibilitycentre.org/) It was highlighted this could be too quick for dyslexic or some cognitively different users in Aug 2019 DAC assesment.


# Ideas for the future

* Using the Notifications and PageVisibility APIs to show people notifications with the FT open in the background.
* Firing messages and notifications from Server Sent Events

# Development

1. Install dependencies with `obt install`
1. Watch and rebuild source and demos on change with `obt demo --watch --run-server`

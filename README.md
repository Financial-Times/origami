# n-notification [![Circle CI](https://circleci.com/gh/Financial-Times/n-notification/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/n-notification/tree/master)
Component for showing onsite notification bars to users.
Concurrent notifications are stacked, most recent at the top.

# Using it

## Programatically

	const nNotification = require('n-notification');

	nNotification.show({
		title: 'Optional title',
		content:'<p>Here is a message</p>',
		type:'myft', // optional see below
		duration: 7000 // optional, default is 5000
	});

## Custom Events

-	require('n-notification').init();

	const event = new CustomEvent('nNotification.show', {detail: { content: 'Title' }});
	document.dispatchEvent(event);

## Types

	type is optional

	'error', produces an error styled notification (red).
	'success', styled green

	any other type or if type is not provided, will result in a default FT pink notification.

# Ideas for the future

* Using the Notifications and PageVisibility APIS to show people notifications with the FT open in the background.
* Firing messages and notifcations from Server Sent Events

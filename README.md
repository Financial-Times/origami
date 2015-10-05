# n-notification [![Circle CI](https://circleci.com/gh/Financial-Times/n-notification/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/n-notification/tree/master)
Component for showing onsite notification bars to users.

# Using it

## Programatically

	const nNotification = require('n-notification');
	nNotification.show({
		title: 'Optional title',
		content:'<p>Here is a message</p>',
		type:'myft',
		duration: 7000 //
	});

## Via Events

	require('n-notification').init();

	const event = new CustomEvent('nNotification.show', {detail:{ content:message }});
    document.dispatchEvent(event);


# Ideas for the future

* Using the Notifications and PageVisibility APIS to show people notifications with the FT open in the background.
* Firing messages and notifcations from Server Sent Events







# n-notification [![Build Status](https://travis-ci.org/Financial-Times/n-notification.svg?branch=master)](https://travis-ci.org/Financial-Times/n-notification)
Component for showing onsite notification bars to users.

# Using it

## Programatically

	var nNotification = require('n-notification');
	nNotification.show({
		title: 'Optional title',
		content:'<p>Here is a message</p>',
		type:'myft',
		duration: 7000 //
	});

## Via Events

	require('n-notification').init();

	var event = new CustomEvent('nNotification.show', {detail:{ content:message }});
    document.dispatchEvent(event);


# Ideas for the future

* Using the Notifications and PageVisibility APIS to show people notifications with the FT open in the background.
* Firing messages and notifcations from Server Sent Events







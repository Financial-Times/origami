# next-messaging
Component for showing Messages to users. Currently unused.

# Using it

## Programatically

	var messaging = require('next-messaging');
	messaging.showMessage({content:'<p>Here is a message</p>',type:'message'});

## Via Events

	require('next-messaging').init();

	var event = new CustomEvent('FT.Message', {detail:{content:message}});
    document.dispatchEvent(event);


# Ideas for the future

* A 'notification' message type for general, short notifcations
* Using the Notifications and PageVisibility APIS to show people notifications with the FT open in the background.
* Firing messages and notifcations from Server Sent Events







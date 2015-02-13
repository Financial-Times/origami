"use strict";
var utils = require('./utils');


// show optin message when hash is available
var optinMessage = `
	<h1>Welcome to Next FT.</h1>
	<p>This is a prototype of our new website, please take a look around and let us know what you think using the survey link at the bottom of the page.</p>
	<p class="optin-message-actions">
		<button class="message__close-js optin-message-button__left">OK</button>
		<a href="http://next.ft.com/opt-out" class="optin-message-button__right">Opt out and return to FT.com</a>
	</p>
`;

function optin(){
	if(location.hash.indexOf('opted-via') > -1){
		utils.dispatchMessageEvent(optinMessage, {duration:0, close:false});
	}
}

module.exports = optin;

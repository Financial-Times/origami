"use strict";


function dispatchEvent(element , name, data){
	var event = new CustomEvent(name, {detail:data});
	element.dispatchEvent(event);
}

function dispatchMessageEvent(message, options){
	var data = options || {};
	data.content = message;
	data.type = 'message';
	dispatchEvent(document, 'FT.Message', data);
}

function dispatchMessageCloseEvent(){
	dispatchEvent(document, 'FT.MessageClose', {});
}

module.exports = {
	dispatchMessageEvent : dispatchMessageEvent,
	dispatchMessageCloseEvent : dispatchMessageCloseEvent
};

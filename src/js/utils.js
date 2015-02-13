"use strict";


function dispatchEvent(element , name, data){
	var event = new CustomEvent(name, {detail:data});
	element.dispatchEvent(event);
}

function dispatchMessageEvent(message, duration){
	var data = {content:message};
	if(typeof duration !== 'undefined'){
		data.duration = duration;
	}

	dispatchEvent(document, 'FT.Message', data);
}

module.exports = {
	dispatchMessageEvent : dispatchMessageEvent
};

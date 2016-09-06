/*global module, require */
'use strict';  // eslint-disable-line strict

const Delegate = require('ftdomdelegate');

let clickEvent = {};

// See https://github.com/ftlabs/ftdomdelegate#selector-string
const elementsToTrack = 'a, button, input';
const attributesToCollect = ["nodeName","id","class","data-trackable","role", "aria-pressed"];

// Todo: Move this to a bower component
const getDomTree = (clickEvent) => {
	console.log(clickEvent);
}

const track = _ => {
	let delegate = new Delegate(document.body);
	delegate.on('click', elementsToTrack, getDomTree, true);
}

module.exports = {
	track: track
};

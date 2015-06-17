/* global fetch */
'use strict';

require('es6-promise').polyfill();
require('isomorphic-fetch');
var getAppropriateRendition = require('../libs/get-appropriate-rendition');
var brightcoveLibraryLoadPromise;

function BrightcovePlayer(el, opts) {
	this.el = el;
}

function ensureBrightcoveLibraryLoaded() {
	if (brightcoveLibraryLoadPromise) {
		return brightcoveLibraryLoadPromise;
	}
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	script.setAttribute('src', 'http://admin.brightcove.com/js/BrightcoveExperiences.js');
	script.setAttribute('async', true);
	script.setAttribute('defer', true);
	document.getElementsByTagName("head")[0].appendChild(script)
	brightcoveLibraryLoadPromise = new Promise(function(resolve, reject) {
		script.addEventListener('load', function() {
			resolve();
		});
	});
	return brightcoveLibraryLoadPromise;
}

BrightcovePlayer.prototype.init = function() {
	var videoId = this.el.getAttribute('data-n-video-id');
	var width = this.el.getAttribute('data-width') || 600;
	var height = this.el.getAttribute('data-height') || 338;

	var output = `<object class="BrightcoveExperience">
		<param name="bgcolor" value="#FFFFFF" />
		<param name="width" value="${width}" />
		<param name="height" value="${height}" />
		<param name="playerID" value="1820439054001" />
		<param name="playerKey" value="AQ~~,AAAACxbljZk~,eD0zYozylZ2-dDEd_-zFMJSX7rv31rz5" />
		<param name="@videoPlayer" value="${videoId}" />
		<param name="isVid" value="true" />
		<param name="isUI" value="true" />
		<param name="dynamicStreaming" value="true" />
	</object>`
	this.el.innerHTML = output;
	return ensureBrightcoveLibraryLoaded()
		.then(function() {
			brightcove.createExperiences();
		});
};

module.exports = BrightcovePlayer;

'use strict';

function BrightcovePlayer(el, opts) {
	this.el = el;
}

BrightcovePlayer.prototype.init = function() {
	var videoId = this.el.getAttribute('data-n-video-id');
	this.el.innerHTML = `<iframe class="n-video__brightcove" src='//players.brightcove.net/47628783001/fb14d319-ef92-49ac-92f7-3b565a32cdd7_default/index.html?videoId=${videoId}' allowfullscreen webkitallowfullscreen mozallowfullscreen></iframe>`;
};

module.exports = BrightcovePlayer;

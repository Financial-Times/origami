import Overlay from '../../main.js';

document.addEventListener("DOMContentLoaded", function() {
	const myOverlay = new Overlay('demo-overlay', {
		nested: 'true',
		parentnode: '.right-rail',
		modal: false,
		compact: true,
		preventclosing: false,
		addclosebtn: true,
		heading: { title: "Take a survey", visuallyhidetitle: true },
		html: `<div class='demo-overlay-content'><span class='title'>How do you rate FT.com?</span><p>Take our short survey and be in with a chance to win £250</p>
					<button onclick="window.location.reload(true)" class="o-buttons o-buttons--secondary">Take survey</button>
					<p class="small">T&Cs apply</p></div>`
	});

	myOverlay.open();
});

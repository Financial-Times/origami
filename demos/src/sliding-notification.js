import Overlay from '../../main';

document.addEventListener("DOMContentLoaded", function() {
	let myOverlay = new Overlay('demo-overlay', {
		nested: 'true',
		parentNode: '.right-rail',
		modal: false,
		compact: true,
		preventclosing: false,
		addCloseBtn: true,
		heading: { title: "Take a survey", visuallyHideTitle: true },
		html: `<div class='demo-overlay-content'><span class='title'>How do you rate FT.com?</span><p>Take our short survey and be in with a chance to win £250</p>
					<button onclick="window.location.reload(true)" class="o-buttons o-buttons--standout">Take survey</button>
					<p class="small">T&Cs apply</p></div>`
	});

	myOverlay.open();
});

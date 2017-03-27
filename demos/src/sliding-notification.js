import Overlay from '../../main';

document.addEventListener("DOMContentLoaded", function() {
	let myOverlay = new Overlay('demoOverlay', {
		nested: 'true',
		parentNode: '.right-rail',
		modal: false,
		compact: true,
		preventclosing: false,
		heading: {title: 'hello'},
		html: `<p>We're currently experiencing some technical difficulties. Some features may not work while we fix this problem.</p>
					<button onclick="window.location.reload(true)" class="o-buttons">OK</button>`
	});

	myOverlay.open();
});

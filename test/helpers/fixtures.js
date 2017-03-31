let sandboxEl;

function createSandbox() {
	if (document.querySelector('.sandbox')) {
		sandboxEl = document.querySelector('.sandbox');
	} else {
		sandboxEl = document.createElement('div');
		sandboxEl.setAttribute('class', 'sandbox');
		document.body.appendChild(sandboxEl);
	}
}

function reset() {
	sandboxEl.innerHTML = '';
}

function insert(html) {
	createSandbox();
	sandboxEl.innerHTML = html;
}


function htmlCode () {
	const html = `
	<div id="element">
		<button class="o-overlay-trigger o-buttons  o-buttons--big" data-o-overlay-id="overlay" data-o-overlay-src="#overlay" data-o-overlay-heading-title="We're having trouble updating" data-o-overlay-heading-shaded="false" data-o-overlay-modal="true" data-o-overlay-preventclosing="false" data-o-overlay-zIndex="20" aria-pressed="false" aria-haspopup="true">
			Launch overlay
		</button>
	</div>
	<button class="o-overlay-trigger o-buttons  o-buttons--big" data-o-overlay-id="overlay-2" data-o-overlay-src="#overlay" data-o-overlay-heading-title="We're having trouble updating" data-o-overlay-heading-shaded="false" data-o-overlay-modal="true" data-o-overlay-preventclosing="false" data-o-overlay-zIndex="20" aria-pressed="false" aria-haspopup="true">
		Launch overlay
	</button>

	<script type="text/template" id="overlay">
		<div class='demo-overlay'>
			<p>We're currently experiencing some technical difficulties. Some features may not work while we fix this problem.</p>
			<button onclick="window.location.reload(true)" class="o-buttons">OK</button>
		</div>
	</script>
	<script type="text/template" id="overlay-2">
		<div class='demo-overlay'>
			<p>We're currently experiencing some technical difficulties. Some features may not work while we fix this problem.</p>
			<button onclick="window.location.reload(true)" class="o-buttons">OK</button>
		</div>
	</script>`;
	insert(html);
}

export {
	htmlCode,
	reset
 };

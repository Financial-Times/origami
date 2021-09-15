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

function insertShareLinks() {
	const html = `
		<div data-o-component="o-share" class="o-share" id="element">
			<ul>
				<li class="o-share__action">
					<button class="o-share__icon o-share__icon--mail">
						<span class="o-share__text">Mail</span>
					</button>
				</li>
				<li class="o-share__action">
					<a class="o-share__icon o-share__icon--twitter" href="https://twitter.com/intent/tweet?url=http:&#x2F;&#x2F;on.ft.com&#x2F;1mUdgA2&text=Pfizer+says+its+AstraZeneca+vow+over+big+UK+presence+is+binding&related=ftcompanies&via=FT">
						<span class="o-share__text">Twitter</span>
					</a>
				</li>
			</ul>
		</div>
		`;
	insert(html);
}

function insertShareComponent() {
	const html = `
		<div data-o-component="o-share"
			class="o-share"
			data-o-share-links="twitter facebook linkedin whatsapp pinterest"
			data-o-share-url="https://www.ft.com/content/test"
			data-o-share-title="Test Article"
			data-o-share-titleExtra="Extra"
			data-o-share-summary="Testing...">
		</div>
		`;
	insert(html);
}

function insertRelativeShareComponent() {
	const html = `
		<div data-o-component="o-share"
			class="o-share"
			data-o-share-links="twitter facebook linkedin whatsapp pinterest"
			data-o-share-url="/content/test"
			data-o-share-title="Test Article"
			data-o-share-titleExtra="Extra"
			data-o-share-summary="Testing...">
		</div>
		`;
	insert(html);
}

export {
	insertShareLinks,
	insertShareComponent,
	insertRelativeShareComponent,
	reset
};

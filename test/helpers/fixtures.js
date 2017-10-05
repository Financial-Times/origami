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


function standardCookieMessage () {
	const html = `<div class="cookie-message-container"><div data-o-component="o-cookie-message" class='o-cookie-message'>
		</div></div>`;
	insert(html);
}

function customCookieMessage () {
	const html = `<div class="cookie-message-container">
			<div data-o-component="o-cookie-message" data-o-cookie-message-use-custom-html="true" class='o-cookie-message'>
				Custom cookie message!
				<div class="o-cookie-message__close-btn-container">
						<button class="o-cookie-message__close-btn" data-o-component="o-cookie-message-close">
								<span class="o-cookie-message__close-btn-label">Close</span>
						</button>
				</div>
			</div>
		</div>`;
	insert(html);
}

export {
	customCookieMessage,
	standardCookieMessage,
	reset
};

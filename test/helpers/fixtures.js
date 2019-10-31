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

function streamMarkup () {
	const html = `
		<div>
			<div class="o-comments"
				id="o-comments-stream"
				data-o-component="o-comments"
				data-o-comments-article-id="id">
			</div>
		</div>
	`;
	insert(html);
}

function countMarkup () {
	const html = `
		<div>
			<div class="o-comments"
				data-o-component="o-comments"
				data-o-comments-article-id="id"
				data-o-comments-count="true">
			</div>
		</div>
	`;
	insert(html);
}

function useStagingEnvironmentMarkup () {
	const html = `
		<div>
			<div class="o-comments"
				data-o-component="o-comments"
				data-o-comments-article-id="id"
				data-o-comments-count="true"
				data-o-comments-use-staging-environment="true">
			</div>
		</div>
	`;
	insert(html);
}

function doNotUseStagingEnvironmentMarkup () {
	const html = `
		<div>
			<div class="o-comments"
				data-o-component="o-comments"
				data-o-comments-article-id="id"
				data-o-comments-count="true"
				data-o-comments-use-staging-environment="false">
			</div>
		</div>
	`;
	insert(html);
}

export {
	reset,
	streamMarkup,
	countMarkup,
	useStagingEnvironmentMarkup,
	doNotUseStagingEnvironmentMarkup
};

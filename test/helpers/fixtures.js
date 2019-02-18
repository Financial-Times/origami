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

function insertOne() {
	const html = `
		<div class="test-el">
			<header class="o-header" data-o-component="o-header"></header>
		</div>`;
	insert(html);
}

function insertTwo() {
	const html = `
		<div class="test-el">
			<header class="o-header" data-o-component="o-header"></header>
			<header class="o-header o-header--sticky" data-o-component="o-header"></header>
		</div>`;
	insert(html);
}

export {
	insertOne,
	insertTwo,
	reset
};

export default {
	insertOne,
	insertTwo,
	reset
};


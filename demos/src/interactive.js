import Forms from '../../src/js/forms.js.js';

const formEl = document.forms[0];
const form = new Forms(formEl);

const inputs = formEl.querySelectorAll('input[type="radio"]');

for (const input of inputs) {
	input.addEventListener('click', (e) => {
		const name = e.target.name;
		form.setState('saving', name, { iconLabel: 'pretend saving'});
		setTimeout(() => form.setState('saved', name, { iconLabel: 'pretend saved'}), 400);

	});
}

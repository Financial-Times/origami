import Forms from '../../src/js/forms.js';

let formEl = document.forms[0];
const form = new Forms(formEl);

let inputs = formEl.querySelectorAll('input[type="radio"]');

for (let input of inputs) {
	input.addEventListener('click', (e) => {
		let name = e.target.name;
		form.setState('saving', name);
		setTimeout(() => form.setState('saved', name), 400);
		setTimeout(() => form.setState('none', name), 1000);
	});
}
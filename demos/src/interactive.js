import Forms from '../../src/js/forms.js';

let formEl = document.forms[0];
const form = new Forms(formEl);

let inputs = formEl.querySelectorAll('input[type="radio"]');

for (let input of inputs) {
	input.addEventListener('click', (e) => {
		let name = e.target.name;
		form.setState('saving', name, { iconLabel: 'pretend saving'});
		setTimeout(() => form.setState('saved', name, { iconLabel: 'pretend saved'}), 400);

	});
}

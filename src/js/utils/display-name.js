import Overlay from 'o-overlay';

const form = `<form id="o-comments-displayname-form" class="o-forms o-forms">
		<label for="o-comments-displayname-input" class="o-forms__label">Display name</label>
		<div class="o-comments--displayname-container">
			<input type="text" class="o-forms__text o-comments-displayname-input" id="o-comments-displayname-input">
			<button type="submit" class="o-comments-o-buttons--primary">Save</button>
		</div>
		<div id="o-comments-displayname-error" class="o-forms__errortext o-comments-displayname-error"></div>
	</form>
</form>`;

const isUnique = (displayName) => {
	const url = `https://comments-api.ft.com/user/displayname/${displayName}`;

	return fetch(url, { method: 'GET' })
		.then(response => response.json())
		.then(({available}) => {
			return available;
		});
};

const containsInvalidCharacters = (displayName) => {
	const containsCharactersNotInCoralTalkRules = /[^a-z0-9_.]+/i;

	return containsCharactersNotInCoralTalkRules.test(displayName) ?
		true :
		false;
};

const prompt = () => {
	const overlay = new Overlay('displayName', {
		html: form,
		heading: {
			title: 'Choose a commenting display name'
		}
	});

	overlay.open();

	return overlay;
};

const validation = (event) => {
	event.preventDefault();

	return new Promise(resolve => {
		const displayNameForm = event.srcElement;
		const input = displayNameForm.querySelector('input');
		const displayName = input.value.trim();
		const errorMessage = displayNameForm.querySelector('#o-comments-displayname-error');

		errorMessage.innerText = '';
		displayNameForm.classList.remove('o-forms--error');

		if (containsInvalidCharacters(displayName)) {
			errorMessage.innerText = 'Only alphanumeric characters, underscores and periods are allowed';
			displayNameForm.classList.add('o-forms--error');
		} else {
			isUnique(displayName)
				.then(isUnique => {
					if (!isUnique) {
						errorMessage.innerText = 'Unfortunately that display name is already taken';
						displayNameForm.classList.add('o-forms--error');
					} else {
						return resolve(displayName);
					}
				});
		}
	});
};

export {
	prompt,
	validation
};

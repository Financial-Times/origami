import Overlay from 'o-overlay';

const form = `<form id="o-comments-displayname-form" class="o-forms o-forms o-comments__displayname-form">
		<label for="o-comments-displayname-input" class="o-forms__label">Display name</label>
		<div class="o-comments__displayname-container">
			<input type="text" class="o-forms__text o-comments__displayname-input" id="o-comments-displayname-input">
			<button type="submit" class="o-comments__displayname-submit">Save</button>
		</div>
		<div id="o-comments-displayname-error" class="o-forms__errortext"></div>
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

const findInvalidCharacters = (displayName) => {
	const containsCharactersNotInCoralTalkRules = /[^a-z0-9_.]/g;
	const matchingCharacters = displayName
		.match(containsCharactersNotInCoralTalkRules);
	const uniqueMatchingCharacters = matchingCharacters.length ?
		matchingCharacters
			.filter((character, position) => matchingCharacters.indexOf(character) === position) :
		[];

	return uniqueMatchingCharacters.length ?
		uniqueMatchingCharacters.join('') :
		false;
};

const prompt = () => {
	const overlay = new Overlay('displayName', {
		html: form,
		class: 'o-comments__displayname-prompt',
		compact: true,
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
		const invalidCharacters = findInvalidCharacters(displayName);

		errorMessage.innerText = '';
		displayNameForm.classList.remove('o-forms--error');



		if (invalidCharacters) {
			errorMessage.innerText = `The display name contains the following invalid characters: ${invalidCharacters}`;
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

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

export default (event) => {
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

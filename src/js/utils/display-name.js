import Overlay from 'o-overlay';

const form = `<form id="o-comments-displayname-form" class="o-forms o-forms o-comments__displayname-form">
		<label for="o-comments-displayname-input" class="o-forms-field o-comments__displayname-field">
			<span class="o-forms-title">Display name</span>
			<div class="o-comments__displayname-container">
				<span class="o-forms-input o-forms-input--text o-comments__displayname-input">
					<input type="text" name="text" value="" required="">
				</span>
				<button type="submit" class="o-comments__displayname-submit">Save</button>
			</div>
			<span id="o-comments-displayname-error" class="o-forms-input__error o-comments__displayname-error"></span>
		</label>
	</form>
</form>`;

const isUnique = (displayName) => {
	const url = `https://comments-api.ft.com/displayname/isavailable/${encodeURIComponent(displayName)}`;

	return fetch(url, { method: 'GET' })
		.then(response => response.json())
		.then(({available}) => {
			return available;
		})
};

const findInvalidCharacters = (displayName) => {
	/*
	 * Allowed Characters
	 * The below regex matches any character not in the allowed characters set
	 * All allowed characters are case insensitive
	 * Anything in the range A-Z or 0-9 is allowed
	 * Any of the below special characters are allowed
	 * !#$%'`()*+,-./:;=@[]^_{|}
	 * Spaces are allowed
	 */

	const matchInvalidCharacters = /[^0-9a-z!#$%'`()*+,\-.\/:;=@[\]\^_{}\|\s]/gi;
	const matchingCharacters = displayName
		.match(matchInvalidCharacters);
	const uniqueMatchingCharacters = matchingCharacters && matchingCharacters.length ?
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

const validation = (displayName) => {
	return new Promise((resolve, reject) => {

		if (!displayName) {
			return reject(new Error('Empty display name'));
		}

		const invalidCharacters = findInvalidCharacters(displayName);

		if (invalidCharacters) {
			return reject(new Error(`The display name contains the following invalid characters: ${invalidCharacters}`));
		} else {
			isUnique(displayName)
				.then(isUnique => {
					if (!isUnique) {
						return reject(new Error('Unfortunately that display name is already taken'));
					} else {
						return resolve(displayName);
					}
				});
		}
	});
};

const promptValidation = (event) => {
	event.preventDefault();

	return new Promise(resolve => {
		const displayNameForm = event.srcElement;
		const input = displayNameForm.querySelector('input');
		const displayName = input.value.trim();
		const errorMessage = displayNameForm.querySelector('#o-comments-displayname-error');

		errorMessage.innerText = '';
		displayNameForm.classList.remove('o-forms-input--invalid');


		return validation(displayName)
			.then(displayName => resolve(displayName))
			.catch(error => {
				errorMessage.innerText = error.message;
				displayNameForm.classList.add('o-forms-input--invalid');
			});
	});
};

export {
	prompt,
	validation,
	promptValidation
};

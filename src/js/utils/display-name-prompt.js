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


export default () => {
	const overlay = new Overlay('displayName', {
		html: form,
		heading: {
			title: 'Choose a commenting display name'
		}
	});

	overlay.open();

	return overlay;
}

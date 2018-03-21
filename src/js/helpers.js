const throwError = (message) => {
	throw new Error(`*** o-message error:\n${message}\n***`);
};

const buildActions = (opts) => {
	let primaryActionHTML;
	if (opts.actions.primary.text) {
		primaryActionHTML = `<a href="${opts.actions.primary.url}" class="${opts.messageClass}__actions__primary">${opts.actions.primary.text}</a>`;
	}

	let secondaryActionHTML;
	if (opts.actions.secondary.text) {
		secondaryActionHTML = `<a href="${opts.actions.secondary.url}" class="${opts.messageClass}__actions__secondary">${opts.actions.secondary.text}</a>`;
	}

	let actions = `<div class="${opts.messageClass}__actions">
		${primaryActionHTML}
		${secondaryActionHTML}
		</div>
	`;

	return actions;
};

module.exports = { buildActions, throwError };

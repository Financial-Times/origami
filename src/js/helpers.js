const throwError = (message) => {
	throw new Error(`*** o-message error:\n${message}\n***`);
};

const buildActions = (opts) => {
	let primaryActionHTML;
	if (opts.actions.primary && opts.actions.primary.text) {
		primaryActionHTML = `<a href="${opts.actions.primary.url}" class="${opts.messageClass}__actions__primary" ${opts.actions.primary.openInNewWindow ? `target="_blank" aria-label="${opts.actions.primary.text} (opens in new window)"` : ''}>${opts.actions.primary.text}</a>`;
	}

	let secondaryActionHTML;
	if (opts.actions.secondary && opts.actions.secondary.text) {
		secondaryActionHTML = `<a href="${opts.actions.secondary.url}" class="${opts.messageClass}__actions__secondary" ${opts.actions.secondary.openInNewWindow ? `target="_blank" aria-label="${opts.actions.secondary.text} (opens in new window)"` : ''}>${opts.actions.secondary.text}</a>`;
	}

	let actions = `<div class="${opts.messageClass}__actions">
		${primaryActionHTML || ''}
		${secondaryActionHTML || ''}
		</div>
	`;

	return actions;
};

export { buildActions, throwError };

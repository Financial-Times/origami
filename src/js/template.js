module.exports = (options) => {

	const noticeEl = document.createElement('div');

	noticeEl.classList.add('n-notification__item');

	if (options.modifier) {
		noticeEl.classList.add(`n-notification--${options.modifier}`);
	}

	noticeEl.setAttribute("data-trackable", options.trackable);

	const contentWrapperEl = document.createElement('div');
	contentWrapperEl.className = "n-notification__content-wrapper";

	if (options.title) {
		const titleEl = document.createElement('h3');
		titleEl.className = "n-notification__title";
		titleEl.innerHTML = options.title;
		contentWrapperEl.appendChild(titleEl);
	}

	if (options.content) {
		const contentEl = document.createElement('span');
		contentEl.className = "n-notification__content";
		contentEl.innerHTML = options.content;
		contentEl.setAttribute("role", "alert");
		contentWrapperEl.appendChild(contentEl);
	}

	const buttonEl = document.createElement('button');
	buttonEl.className = "n-notification__close";
	buttonEl.setAttribute("data-trackable", "close");
	buttonEl.innerHTML = "Close";

	noticeEl.appendChild(contentWrapperEl);
	noticeEl.appendChild(buttonEl);

	return noticeEl;
};

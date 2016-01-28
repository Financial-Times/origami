module.exports = (options) => {

	const noticeEl = document.createElement('div');
	noticeEl.className = `n-notification__item n-notification--${options.type ? options.type : 'default'}`;
	noticeEl.setAttribute("role", "alert");
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
		const contentEl = document.createElement('div');
		contentEl.className = "n-notification__content";
		contentEl.innerHTML = options.content;
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

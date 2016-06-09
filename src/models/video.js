class Video {
	constructor(el, opts) {
		this.containerEl = el;
		const defaultOpts = {
			advertising: false,
			classes: [],
			optimumWidth: null,
			placeholder: false,
			placeholderTitle: false,
			playButton: true,
			data: null
		};
		this.opts = {};
		Object.keys(defaultOpts).forEach(optionName => {
			const attributeName = optionName.replace(/[A-Z]/g, function (match) {
				return '-' + match.toLowerCase();
			});
			const optionAttribute = this.containerEl.getAttribute('data-o-video-opts-' + attributeName);
			if (optionAttribute) {
				// parse as JSON, if 'data' attribute
				this.opts[optionName] = optionName === 'data' ? JSON.parse(optionAttribute) : optionAttribute;
			} else if (opts && typeof opts[optionName] !== 'undefined') {
				this.opts[optionName] = opts[optionName];
			} else {
				this.opts[optionName] = defaultOpts[optionName];
			}
		});
		this.classes = typeof this.opts.classes === 'string' ? this.opts.classes.split(' ') : this.opts.classes.slice();
		this.classes.push('o-video__video');
		this.id = el.getAttribute('data-o-video-id');
		this.el;
		this.placeholderEl;
		this.containerEl.setAttribute('data-o-video-js', '');
	}

	init() {
		return Promise.resolve(this);
	}
}

module.exports = Video;

const Video = require('./video');

class YouTube extends Video {
	constructor(el, opts) {
		super(el, opts);
	}

	init() {
		this.el = document.createElement('iframe');
		const attrs = {
			src: 'https://youtube.com/embed/' + this.id,
			height: '315',
			width: '560',
			frameborder: '0',
			webkitallowfullscreen: 'true',
			mozallowfullscreen: 'true',
			allowfullscreen: 'true'
		};
		for (let attr in attrs) {
			if (attrs.hasOwnProperty(attr)) {
				this.el.setAttribute(attr, attrs[attr]);
			}
		}
		this.containerEl.appendChild(this.el);
		return Promise.resolve(this);
	}
}

module.exports = YouTube;

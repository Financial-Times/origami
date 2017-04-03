let FontFaceObserver = require('fontfaceobserver/fontfaceobserver.standalone.js');

class Typography {

	constructor (TypographyEl, opts) {
		this.TypographyEl = TypographyEl;
		this.opts = opts || { values: "default" };

		this.fontLoadingPrefix = 'o-typography--loading-';
		this.fontLoadedCookieName = 'o-typography-fonts-loaded';
		this.fontConfigs = [
			{
				family: 'FinancierDisplayWeb',
				weight: 'normal',
				label: 'serifDisplay'
			},
			{
				family: 'MetricWeb',
				weight: 'normal',
				label: 'sans'
			},
			{
				family: 'MetricWeb',
				weight: 600,
				label: 'sansBold'
			},
			{
				family: 'FinancierDisplayWeb',
				weight: 700,
				label: 'serifDisplayBold'
			}
		];

		this.loadFonts();
	}

	removeLoadingClasses() {
		this.fontConfigs.forEach((config) => {
			this.TypographyEl.classList.remove(`${this.fontLoadingPrefix}${config.label}`);
		});
	}

	loadFonts() {
		if (new RegExp(`(^|\\s)${this.fontLoadedCookieName}=1(;|$)`).test(document.cookie)) {
			this.removeLoadingClasses();
			return Promise.resolve();
		}

		const fontPromises = this.fontConfigs.map(fontConfig => {
			return new FontFaceObserver(fontConfig.family, { weight: fontConfig.weight })
				.load()
				.then(() => {
					this.TypographyEl.classList.remove(`${this.fontLoadingPrefix}${fontConfig.label}`);
				});
		});

		return Promise.all(fontPromises)
			.then(() => {
				// set cookie for subsequent visits
				document.cookie = `${this.fontLoadedCookieName}=1;path=/;max-age=${60 * 60 * 24 * 7}`;
			})
			.catch(() => {});
	}

	static init (rootEl, opts) {
		if (!rootEl) {
			rootEl = document.documentElement;
		}
		if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}
		if (rootEl instanceof HTMLElement && rootEl.matches('[data-o-component=o-typography]')) {
			return new Typography(rootEl, opts);
		}
	}
}

export default Typography;

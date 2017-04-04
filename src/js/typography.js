let FontFaceObserver = require('fontfaceobserver/fontfaceobserver.standalone.js');

class Typography {

	constructor (typographyEl, opts) {
		this.typographyEl = typographyEl;

		this.opts = opts || Typography.getOptions(typographyEl);
		this.opts = Typography.checkOptions(this.opts);

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

	/**
	 * Get the data attributes from the typographyEl. If typography is being set up
	 * declaratively, this method is used to extract the data attributes from
	 * the DOM.
	 * @param {HTMLElement} typographyEl - The typography element in the DOM (Required)
	*/
	static getOptions(typographyEl) {
		const dataset = typographyEl.dataset;
		return Object.keys(dataset).reduce((col, key) => { // Phantom doesn't like Object.entries :sob:
			if (key === 'oComponent') return col; // Bail on data-o-component
			const shortKey = key.replace(/^oTypography(\w)(\w+)$/, (m, m1, m2) => m1.toLowerCase() + m2);

			try {
				col[shortKey] = JSON.parse(dataset[key].replace(/\'/g, '"'));
			} catch (e) {
				col[shortKey] = dataset[key];
			}

			return col;
		}, {});
	}

	/**
	 * Check the options passed in are valid, otherwise set defaults
	 * @param {Object} opts - An Object with configuration options for typography
	 * @return {Object} opts
	*/
	static checkOptions(opts) {

		if (!opts.fontLoadingPrefix) {
			opts.fontLoadingPrefix = 'o-typography--loading-';
		}

		if (!opts.fontLoadedCookieName) {
			opts.fontLoadedCookieName = 'o-typography-fonts-loaded';
		}

		return opts;
	}

	removeLoadingClasses() {
		this.fontConfigs.forEach((config) => {
			this.typographyEl.classList.remove(`${this.opts.fontLoadingPrefix}${config.label}`);
		});
	}

	loadFonts() {
		if (new RegExp(`(^|\\s)${this.opts.fontLoadedCookieName}=1(;|$)`).test(document.cookie)) {
			this.removeLoadingClasses();
			return Promise.resolve();
		}

		const fontPromises = this.fontConfigs.map(fontConfig => {
			return new FontFaceObserver(fontConfig.family, { weight: fontConfig.weight })
				.load()
				.then(() => {
					this.typographyEl.classList.remove(`${this.opts.fontLoadingPrefix}${fontConfig.label}`);
				});
		});

		return Promise.all(fontPromises)
			.then(() => {
				// set cookie for subsequent visits
				document.cookie = `${this.opts.fontLoadedCookieName}=1;path=/;max-age=${60 * 60 * 24 * 7}`;
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

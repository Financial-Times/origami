import FontFaceObserver from 'fontfaceobserver/fontfaceobserver.standalone.js';

class Typography {

	constructor (typographyEl, opts) {
		this.typographyEl = typographyEl;

		this.fontLoadingPrefix = 'o-typography--loading-';

		this.opts = opts || Typography.getOptions(typographyEl);
		if (typeof this.opts.loadOnInit === 'undefined') {
			this.opts.loadOnInit = true;
		}
		if (typeof this.opts.rejectOnFontLoadFailure === 'undefined') {
			this.opts.rejectOnFontLoadFailure = false;
		}
		this.opts = Typography.checkOptions(this.opts);
		this.hasRun = false;

		this.fontConfigs = [
			{
				family: 'FinancierDisplayWeb',
				weight: 'normal',
				label: 'display'
			},
			{
				family: 'MetricWeb',
				weight: 'normal',
				label: 'sans'
			},
			{
				family: 'MetricWeb',
				weight: 600,
				label: 'sans-bold'
			},
			{
				family: 'FinancierDisplayWeb',
				weight: 700,
				label: 'display-bold'
			}
		];
		if (this.opts.loadOnInit) {
			this.loadFonts();
		}
	}

	/**
	 * Get the data attributes from the typographyEl. If typography is being set up
	 * declaratively, this method is used to extract the data attributes from
	 * the DOM.
	 * @param {HTMLElement} typographyEl - The typography element in the DOM (Required)
	 */
	static getOptions(typographyEl) {
		const dataset = Object(typographyEl.dataset);
		return Object.keys(dataset).reduce((col, key) => { // Phantom doesn't like Object.entries :sob:
			if (key === 'oComponent') {
				return col; // Bail on data-o-component
			}
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

		if (!opts.fontLoadedCookieName) {
			opts.fontLoadedCookieName = 'o-typography-fonts-loaded';
		}

		return opts;
	}

	checkFontsLoaded() {
		return new RegExp(`(^|\s)${this.opts.fontLoadedCookieName}=1(;|$)`).test(document.cookie);
	}

	setCookie() {
		const domain = /.ft.com$/.test(location.hostname) ? '.ft.com' : location.hostname;
		// set cookie for a week
		// TODO - use RUM to work out what a good value for this would actually be
		document.cookie = `${this.opts.fontLoadedCookieName}=1;domain=${domain};path=/;max-age=${60 * 60 * 24 * 7}`;
	}

	removeLoadingClasses() {
		this.fontConfigs.forEach((config) => {
			this.typographyEl.classList.remove(`${this.fontLoadingPrefix}${config.label}`);
		});
	}

	loadFonts() {
		if (this.hasRun) {
			return Promise.resolve();
		}
		if (this.checkFontsLoaded()) {
			this.removeLoadingClasses();
			this.setCookie();
			this.hasRun = true;
			return Promise.resolve();
		}

		const fontPromises = this.fontConfigs.map(fontConfig => {
			return new FontFaceObserver(fontConfig.family, { weight: fontConfig.weight })
				.load()
				.then(() => {
					this.typographyEl.classList.remove(`${this.fontLoadingPrefix}${fontConfig.label}`);
				});
		});

		return Promise.all(fontPromises)
			.then(() => {
				// set value in cookie for subsequent visits
				this.setCookie();
				this.hasRun = true;
			})
			.catch(error => {
				if (this.opts.rejectOnFontLoadFailure) {
					throw error;
				}
			});
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

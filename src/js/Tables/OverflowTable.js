import BaseTable from './BaseTable.js.js';

class OverflowTable extends BaseTable {

	/**
	 * Initialises an `o-table` component with "overflow" responsive behaviour.
	 *
	 * @param {HTMLElement} rootEl - The `o-table` element.
	 * @param {TableSorter} sorter
	 * @param {Object} opts [{}]
	 * @param {Bool} opts.sortable [true]
	 * @param {Undefined | Bool} opts.expanded
	 * @param {Number} opts.minimumRowCount [20]
	 * @access public
	 * @returns {OverflowTable}
	 */
	constructor(rootEl, sorter, opts = {}) {
		super(rootEl, sorter, opts);
		this._opts = Object.assign({
			expanded: this.rootEl.hasAttribute('data-o-table-expanded') ? this.rootEl.getAttribute('data-o-table-expanded') !== 'false' : null,
			minimumRowCount: this.rootEl.getAttribute('data-o-table-minimum-row-count')
		}, this._opts);
		// Add scroll and expander controls immediately.
		this._addControlsToDom();
		// Defer other tasks.
		window.setTimeout(this.addSortButtons.bind(this), 0);
		window.setTimeout(this._setupScroll.bind(this), 0);
		window.setTimeout(this._setupExpander.bind(this), 0);
		this._ready();
		return this;
	}

	/**
	 * Filter the table.
	 *
	 * @access public
	 * @param {Number} headerIndex - The index of the table column to filter.
	 * @param {String|Function} filter - How to filter the column (either a string to match or a callback function).
	 * @returns {undefined}
	 */
	filter(headerIndex, filter) {
		this._filterRowsByColumn(headerIndex, filter);
		this.renderRowUpdates();
	}

	/**
	 * Check if the table is expanded (true) or collapsed (false).
	 * @access public
	 * @returns {Bool}
	 */
	isExpanded() {
		const expand = this._expand === undefined ? Boolean(this._opts.expanded) : Boolean(this._expand);
		return this.canExpand() && expand;
	}

	/**
	 * Check if the table is collapsed (true) or expanded (false).
	 * @access public
	 * @returns {Bool}
	 */
	isContracted() {
		const expand = this._expand === undefined ? Boolean(this._opts.expanded) : Boolean(this._expand);
		return this.canExpand() && !expand;
	}

	/**
	 * Check if the table supports the expand/contract feature.
	 * @access public
	 * @returns {Bool}
	 */
	canExpand() {
		return typeof this._opts.expanded === 'boolean' && this._minimumRowCount < this.tableRows.length - this._filteredTableRows.length;
	}

	/**
	 * Updates the dom to account for row updates.
	 *
	 * @returns {undefined}
	 */
	renderRowUpdates() {
		this._updateExpander();
		this._updateRowAriaHidden();
		this._hideFilteredRows();
		this._updateTableHeight();
		this._updateRowOrder();
	}

	_updateExpander() {
		if (typeof this._opts.expanded !== 'boolean' || !this.controls) {
			return;
		}

		if (this._expanderUpdateScheduled) {
			window.cancelAnimationFrame(this._expanderUpdateScheduled);
		}

		const expand = this.isExpanded();
		const contract = this.isContracted();
		const canExpand = expand || contract;
		const expanderButtonContainer = this.controls.expanderButton;
		const expanderButton = expanderButtonContainer.querySelector('button');

		this._updateTableHeight();
		this._updateRowAriaHidden();
		this._updateControls();

		this._expanderUpdateScheduled = window.requestAnimationFrame(function () {
			this.rootEl.setAttribute('data-o-table-expanded', Boolean(expand));
			this.container.classList.toggle('o-table-container--expanded', expand);
			this.container.classList.toggle('o-table-container--contracted', contract);
			expanderButton.style.display = canExpand ? '' : 'none';

			if (!canExpand) {
				this.rootEl.removeAttribute('aria-expanded');
			}

			if (expand) {
				expanderButton.textContent = 'Show fewer';
				this.rootEl.setAttribute('aria-expanded', true);
			}

			if (contract) {
				expanderButton.textContent = 'Show more';
				this.rootEl.setAttribute('aria-expanded', false);
			}
		}.bind(this));
	}

	/**
	 * Hides table rows if the table can be expanded.
	 * @access public
	 * @returns undefined
	 */
	contractTable() {
		if (!this.canExpand()) {
			return;
		}
		this._expand = false;
		this._updateExpander();
	}

	/**
	 * Expands the table, revealing hidden table rows, if it can be expanded and has been contracted.
	 * @access public
	 * @returns undefined
	 */
	expandTable() {
		if (!this.canExpand()) {
			return;
		}
		this._expand = true;
		this._updateExpander();
	}

	/**
	 * Get the table height, accounting for "hidden" rows.
	 * @return {Number|Null}
	 */
	_getTableHeight() {
		if (this.isContracted()) {
			const maxTableHeight = super._getTableHeight();
			if (!this._contractedWrapperHeight || this._contractedWrapperHeight > maxTableHeight) {
				const rowsToHide = this._rowsToHide;
				const buttonHeight = this.controls.expanderButton.getBoundingClientRect().height;
				const extraHeight = rowsToHide ? rowsToHide[0].getBoundingClientRect().height / 2 : 0;
				this._contractedWrapperHeight = maxTableHeight + buttonHeight + extraHeight;
			}
			return this._contractedWrapperHeight;
		}

		if (this.isExpanded()) {
			const buttonHeight = this.controls.expanderButton.getBoundingClientRect().height;
			return super._getTableHeight() + buttonHeight;
		}

		return super._getTableHeight();
	}

	/**
	 * Add controls such as the back, forward, "show more" buttons to DOM,
	 * plus wrappers needed for them to function.
	 * @returns {undefined}
	 */
	_addControlsToDom() {
		if (this.overlayWrapper && !this.controls) {
			const supportsArrows = OverflowTable._supportsArrows();
			const overlayWrapperHtml = `
				${this.wrapper ? `
					<div class="o-table-overflow-fade-overlay"></div>
				` : ''}
				<div class="o-table-overflow-control-overlay">
					${this.wrapper && supportsArrows ? `
						<div class="o-table-control o-table-control--back o-table-control--hide">
							<button aria-label="visually scroll table back" disabled="true" class="o-buttons o-buttons--primary o-buttons--big o-buttons-icon o-buttons-icon--icon-only o-buttons-icon--arrow-left"></button>
						</div>
					` : ''}

					${this.wrapper && supportsArrows ? `
						<div class="o-table-control o-table-control--forward o-table-control--hide">
							<button aria-label="visually scroll table forward" disabled="true" class="o-buttons o-buttons--primary o-buttons--big o-buttons-icon o-buttons-icon--icon-only o-buttons-icon--arrow-right"></button>
						</div>
					` : ''}

					${typeof this._opts.expanded === 'boolean' ? `
						<div class="o-table-control o-table-control--expander">
							<button class="o-buttons o-buttons--primary o-buttons--big">Show fewer</button>
						</div>
					` : ''}
				</div>
			`;

			const range = document.createRange();
			range.selectNode(this.overlayWrapper);
			const overlayFragment = range.createContextualFragment(overlayWrapperHtml);

			this.controls = {
				controlsOverlay: overlayFragment.querySelector('.o-table-overflow-control-overlay'),
				fadeOverlay: overlayFragment.querySelector('.o-table-overflow-fade-overlay'),
				expanderButton: overlayFragment.querySelector('.o-table-control--expander'),
				forwardButton: overlayFragment.querySelector('.o-table-control--forward'),
				backButton: overlayFragment.querySelector('.o-table-control--back')
			};

			// Add controls to the dom.
			this._updateControlOverlayPosition();
			window.requestAnimationFrame(function() {
				this.overlayWrapper.appendChild(overlayFragment);
			}.bind(this));
		}
	}

	_updateControlOverlayPosition() {
		const theadHeight = this.thead ? this.thead.getBoundingClientRect().height : 0;
		const captionHeight = this.tableCaption ? this.tableCaption.getBoundingClientRect().height : 0;
		window.requestAnimationFrame(function () {
			this.controls.controlsOverlay.style['top'] = `${theadHeight + captionHeight}px`;
		}.bind(this));
	}

	/**
	 * Add functionality to improve the experience when scrolling a table,
	 * such as showing forward/back buttons to indicate that scroll is possible.
	 * @returns {undefined}
	 */
	_setupScroll() {
		// Does not warn of a missing wrapper: assumes no overflow is desired.
		if (this.container && this.overlayWrapper && !this.wrapper) {
			console.warn(
				'Controls to scroll table left/right could not be added to "o-table" as it is missing markup. ' +
				'Please add the container and wrapper elements according to the documentation https://registry.origami.ft.com/components/o-table.',
				{ table: this.rootEl }
			);
		}

		// Can not add controls without a container or wrapper.
		if (!this.container || !this.overlayWrapper || !this.wrapper) {
			return;
		}

		// Add table controls (e.g. left/right button).
		if (!this.controls) {
			this._addControlsToDom();
		}

		// Add forward button behaviour.
		if (this.controls.forwardButton) {
			const scrollForward = function () {
				this.wrapper.scrollBy({
					left: document.body.clientWidth / 2,
					behavior: 'smooth'
				});
			}.bind(this);
			this.controls.forwardButton.addEventListener('click', scrollForward);
			this._listeners.push({
				element: this.controls.forwardButton,
				scrollForward,
				type: 'click'
			});
		}

		// Add back button behaviour.
		if (this.controls.backButton) {
			const scrollBackward = function () {
				this.wrapper.scrollBy({
					left: -(document.body.clientWidth / 2),
					behavior: 'smooth'
				});
			}.bind(this);
			this.controls.backButton.addEventListener('click', scrollBackward);
			this._listeners.push({
				element: this.controls.backButton,
				scrollBackward,
				type: 'click'
			});
		}

		// Set scroll position and update controls.
		const updateScroll = function () {
			if (!this._controlUpdateScheduled) {
				this._controlUpdateScheduled = true;
				window.setTimeout(function () {
					this._controlUpdateScheduled = false;
					this._fromEnd = this.wrapper.scrollWidth - this.wrapper.clientWidth - this.wrapper.scrollLeft;
					this._fromStart = this.wrapper.scrollLeft;
					this._updateControls();
				}.bind(this), 33);
			}
		}.bind(this);

		updateScroll();

		// Observe controls scrolling beyond table and update.
		if (this.controls.controlsOverlay && window.IntersectionObserver) {
			// Fade forward/back buttons at start and end of table.
			const arrowFadeObserverConfig = {
				root: this.controls.controlsOverlay,
				threshold: 1.0,
				rootMargin: `-20px 0px ${this.canExpand() ? '0px' : '-20px'} 0px`
			};
			const arrowFadeObserver = new IntersectionObserver(function(entries) {
				entries.forEach(function(entry) {
					entry.target.setAttribute('data-o-table-intersection', entry.intersectionRatio !== 1);
					updateScroll();
				});
			}, arrowFadeObserverConfig);
			if (this.controls.backButton) {
				arrowFadeObserver.observe(this.controls.backButton);
			}
			if (this.controls.forwardButton) {
				arrowFadeObserver.observe(this.controls.forwardButton);
			}
		}

		// Add other event listeners to update controls.
		this.wrapper.addEventListener('scroll', updateScroll);
		window.addEventListener('resize', updateScroll);
		window.addEventListener('load', updateScroll);
		this._listeners.push({ element: this.wrapper, updateScroll, type: 'scroll' });
		this._listeners.push({element: window, updateScroll, type: 'resize'});
		this._listeners.push({element: window, updateScroll, type: 'load'});
	}

	/**
	 * Add hide/show functionality for long tables.
	 * @returns {undefined}
	 */
	_setupExpander() {
		if (typeof this._opts.expanded !== 'boolean') {
			return;
		}

		if (!this.container || !this.overlayWrapper || !this.wrapper) {
			throw new Error(
				'Controls to expand/contract the table could not be added to "o-table" as it is missing markup.' +
				'Please add the container and wrapper element according to the documentation https://registry.origami.ft.com/components/o-table.'
			);
		}

		// Add table controls (e.g. "more" button).
		if (!this.controls) {
			this._addControlsToDom();
		}

		if (this.controls.expanderButton) {
			const toggleExpanded = function () {
				if (this.isExpanded()) {
					const expanderButtonContainer = this.controls.expanderButton;
					const buttonOffset = expanderButtonContainer.getBoundingClientRect().top;
					this.contractTable();
					window.requestAnimationFrame(() => {
						const top = window.pageYOffset + expanderButtonContainer.getBoundingClientRect().top - buttonOffset;
						window.scroll(null, top);
					});
				} else {
					this.expandTable();
				}
			}.bind(this);
			this.controls.expanderButton.addEventListener('click', toggleExpanded);
			this._listeners.push({element: this.controls.expanderButton, toggleExpanded, type: 'click'});
		}

		this._updateExpander();
	}

	/**
	 * Update all controls and their overlays,
	 * e.g. forward/back arrow visibility, visibility of arrow dock, overlay fade.
	 * @returns {undefined}
	 */
	_updateControls() {
		if (!this.controls) {
			return;
		}

		// Toggle fade.
		const canScrollTable = this._canScrollTable;
		window.requestAnimationFrame(function () {
			this.controls.fadeOverlay.classList.toggle('o-table-overflow-fade-overlay--scroll', canScrollTable);
			this.controls.fadeOverlay.style.setProperty('--o-table-fade-from-end', `${Math.min(this._fromEnd, 10)}px`);
			this.controls.fadeOverlay.style.setProperty('--o-table-fade-from-start', `${Math.min(this._fromStart, 10)}px`);
		}.bind(this));

		// Toggle arrow dock.
		const showArrowDock = this._showArrowDock;
		window.requestAnimationFrame(function () {
			this.controls.controlsOverlay.classList.toggle('o-table-overflow-control-overlay--arrow-dock', showArrowDock);
		}.bind(this));


		// Update forward/back scroll controls.
		if (OverflowTable._supportsArrows()) {
			this._updateScrollControl(this.controls.forwardButton);
			this._updateScrollControl(this.controls.backButton);
		}

		// Update controls overlay to cover the body.
		this._updateControlOverlayPosition();
	}

	/**
	 * Update the visibility of a scroll forward/back button.
	 * @param {HTMLElement} element - The button wrapper.
	 * @returns {undefined}
	 */
	_updateScrollControl(element) {
		const showStickyArrows = this._stickyArrows;
		const canScrollTable = this._canScrollTable;
		const arrowsDocked = this._showArrowDock && !showStickyArrows;
		const scrolledToBoundary = this._fromEnd <= 0 && element === this.controls.forwardButton || this._fromStart <= 0 && element === this.controls.backButton;
		const hideAtBoundary = !arrowsDocked && (!this._stickyArrows || this._stickyArrows && !this._canScrollPastTable);
		const outsideTable = element.getAttribute('data-o-table-intersection') === 'true';
		const elementButton = element.querySelector('button');
		window.requestAnimationFrame(() => {
			// Show scroll control if the table does not fit within the viewport.
			element.style.display = canScrollTable ? '': 'none';
			// Make arrows sticky if table is tall and can be scrolled past.
			element.classList.toggle('o-table-control--sticky', showStickyArrows);
			// Place the arrows in the dock if they are not sticky.
			element.classList.toggle('o-table-control--dock', arrowsDocked);
			// Hide scroll control if they are outside the table boundry.
			// E.g. the table has been scrolled past.
			if (outsideTable) {
				elementButton.setAttribute('disabled', true);
				element.classList.add('o-table-control--hide');
			}
			// Show scroll control if they are inside the table and the table is scrollable.
			if (!scrolledToBoundary && !outsideTable) {
				elementButton.removeAttribute('disabled');
				element.classList.remove('o-table-control--hide');
			}
			// Disable scroll control if it is inside the table but scrolled to the end horizontally.
			if (scrolledToBoundary && !outsideTable) {
				elementButton.setAttribute('disabled', true);
				element.classList.toggle('o-table-control--hide', hideAtBoundary);
			}
		});
	}

	/**
	 * The number of rows to display if the table is collapsed.
	 * @returns {Number}
	 */
	get _minimumRowCount() {
		const minimumRowCount = this._opts.minimumRowCount;
		return isNaN(parseInt(minimumRowCount, 10)) ? 20 : parseInt(minimumRowCount, 10);
	}

	/**
	 * Which rows are hidden, either by a filter or by the expander.
	 * @returns {Array[Node]}
	 */
	get _rowsToHide() {
		return [...this._filteredTableRows, ...this._rowsHiddenByExpander];
	}

	/**
	 * The rows which will be hidden if the table is collapsed.
	 * @returns {Array[Node]}
	 */
	get _rowsHiddenByExpander() {
		const visibleRowCount = Math.min(this.tableRows.length, this._minimumRowCount);
		const nonFilteredRows = this.tableRows.filter(row => this._filteredTableRows.indexOf(row) === -1);
		return this.isContracted() ? nonFilteredRows.slice(visibleRowCount, nonFilteredRows.length) : [];
	}

	/**
	 * Check if the table can be scrolled.
	 * @returns {Boolean}
	 */
	get _canScrollTable() {
		return this._fromEnd > 0 || this._fromStart > 0;
	}

	/**
	 * Check if the table can fit within the viewport vertically.
	 * @returns {Boolean}
	 */
	get _tableTallerThanViewport() {
		return this.container.getBoundingClientRect().height > document.documentElement.clientHeight;
	}

	/**
	 * Check if the document is long enough to scroll beyond the table enough for sticky arrows to dock at the bottom.
	 * I.e. Scroll past the table by at least 50% of the viewport.
	 * @returns {Boolean}
	 */
	get _canScrollPastTable() {
		return this.container.getBoundingClientRect().bottom + document.documentElement.clientHeight / 2 < document.documentElement.getBoundingClientRect().bottom;
	}

	/**
	 * Check if the "dock" at the bottom of the table should be shown.
	 * After scrolling past the table, sticky arrows sit within the dock at the bottom of the table.
	 * @returns {Boolean}
	 */
	get _showArrowDock() {
		return OverflowTable._supportsArrows() && this._canScrollTable && this._canScrollPastTable && this.canExpand();
	}

	/**
	 * Check if left/right controls should be sticky.
	 * @returns {Boolean}
	 */
	get _stickyArrows() {
		return OverflowTable._supportsArrows() && this._tableTallerThanViewport;
	}

	/**
	 * Check if sticky buttons are supported.
	 * @returns {Boolean}
	 */
	static _supportsArrows() {
		return typeof CSS !== 'undefined' && (CSS.supports("position", "sticky") || CSS.supports('position', '-webkit-sticky'));
	}
}

export default OverflowTable;

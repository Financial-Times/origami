import BaseTable from './BaseTable';

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
		window.requestAnimationFrame(this.addSortButtons.bind(this));
		window.requestAnimationFrame(this._setupScroll.bind(this));
		window.requestAnimationFrame(this._setupExpander.bind(this));
		this._ready();
		return this;
	}

	/**
	 * Check if the table is expanded (true) or collapsed (false).
	 * @access public
	 * @returns {Bool}
	 */
	isExpanded() {
		const value = this.rootEl.getAttribute('data-o-table-expanded');
		return Boolean(value !== 'false');
	}

	/**
	 * Check if the table supports the expand/contract feature.
	 * @access public
	 * @returns {Bool}
	 */
	canExpand() {
		return typeof this._opts.expanded === 'boolean' && (this._minimumRowCount < this.tableRows.length);
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
		// Expander not setup until next frame. Update options.
		if (!this.controls) {
			this._opts.expanded = false;
			return;
		}
		const expanderButton = this.controls ? this.controls.expanderButton.querySelector('button') : null;
		const rowsToHide = this._rowsToHide;
		const originalButtonTopOffset = this.controls.expanderButton.getBoundingClientRect().top;
		// Calculate contracted table height.
		// Extra height to tease half of the first hidden row.
		const tableHeight = this.rootEl.getBoundingClientRect().height;
		const rowsToHideHeight = rowsToHide.reduce((accumulatedHeight, row) => {
			return accumulatedHeight + row.getBoundingClientRect().height;
		}, 0);
		const extraHeight = (rowsToHide[0] ? rowsToHide[0].getBoundingClientRect().height / 2 : 0);
		const contractedHeight = tableHeight + extraHeight - rowsToHideHeight;
		// When the table is contracted, only the rows which will be visible need to be rendered immediately when sorting.
		this._sortBatchNumber = this._opts.minimumRowCount && !this._opts.expanded ? parseInt(this._opts.minimumRowCount, 10) + 5 : null;
		// Contract table.
		window.requestAnimationFrame(() => {
			this._updateRowVisibility(false);
			this.rootEl.setAttribute('aria-expanded', false);
			this.rootEl.setAttribute('data-o-table-expanded', false);
			this.wrapper.style.height = `${contractedHeight}px`;
			this.container.classList.remove('o-table-container--expanded');
			this.container.classList.add('o-table-container--contracted');
			if (expanderButton) {
				expanderButton.textContent = 'Show more';
				// Keep more/fewer button in viewport when contracting table.
				// Using `window.scroll(x-coord, y-coord)` as IE11 did not scroll
				// correctly with `window.scroll(options)`.
				const top = window.pageYOffset + this.controls.expanderButton.getBoundingClientRect().top - originalButtonTopOffset;
				window.scroll(null, top);
			}
			this._updateControls();
		});
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
		// Expander not setup until next frame. Update options.
		if (!this.controls) {
			this._opts.expanded = true;
			return;
		}
		// When the table is expanded, render sorted rows at once as they are all visible.
		this._sortBatchNumber = undefined;
		const expanderButton = this.controls ? this.controls.expanderButton.querySelector('button') : null;
		window.requestAnimationFrame(() => {
			this.container.classList.remove('o-table-container--contracted');
			this.container.classList.add('o-table-container--expanded');
			if (expanderButton) {
				expanderButton.textContent = 'Show fewer';
			}
			this.wrapper.style.height = '';
			this._updateRowVisibility(true);
			this.rootEl.setAttribute('aria-expanded', true);
			this.rootEl.setAttribute('data-o-table-expanded', true);
			this._updateControls();
		});
	}

	/**
	 * Performs post-sort actions such as updating row visibility and firing a `oTable.sorted` event.
	 * Required as the sort event can be intercepted for a custom implementation.
	 *
	 * @access public
	 * @param {Object} sortDetail An object containing information about the sort.
	 * @param {Number} sortDetail.columnIndex The index of the column which has been sorted.
	 * @param {String} sortDetail.sortAscending The order of the sort i.e. ascending or descending.
	 * @returns undefined
	 */
	sorted({columnIndex, sortOrder}) {
		window.requestAnimationFrame(() => {
			this._updateRowVisibility(this.isExpanded());
			super.sorted({ columnIndex, sortOrder });
		});
	}

	/**
	 * Update row aria attributes to show/hide them.
	 * E.g. After performing a sort, rows which where hidden in the colapsed table may have become visible.
	 * @param {boolean} expanded - Update row visibility for an expanded or contracted table.
	 * @returns {undefined}
	 */
	_updateRowVisibility(expanded) {
		const visibleRowCount = Math.min(this.tableRows.length, this._minimumRowCount);
		const hiddenRows = expanded ? [] : this.tableRows.slice(visibleRowCount, this.tableRows.length);
		this.tableRows.forEach((row) => {
			row.setAttribute('aria-hidden', hiddenRows && hiddenRows.indexOf(row) !== -1 ? 'true' : 'false');
		});
	}

	/**
	 * Add controls such as the back, forward, "show more" buttons to DOM,
	 * plus wrappers needed for them to function.
	 * @returns {undefined}
	 */
	_addControlsToDom() {
		if (this.overlayWrapper && !this.controls) {
			const supportsArrows = OverflowTable._supportsArrows();
			this.overlayWrapper.insertAdjacentHTML('beforeend', `
				${this.wrapper ? `
					<div class="o-table-overflow-fade-overlay" style="display: none;"></div>
				` : ''}
				<div class="o-table-overflow-control-overlay" style="display: none;">
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

					${this.canExpand() ? `
						<div class="o-table-control o-table-control--expander">
							<button class="o-buttons o-buttons--primary o-buttons--big">Show fewer</button>
						</div>
					` : ''}
				</div>
			`);

			this.controls = {
				controlsOverlay: this.overlayWrapper.querySelector('.o-table-overflow-control-overlay'),
				fadeOverlay: this.overlayWrapper.querySelector('.o-table-overflow-fade-overlay'),
				expanderButton: this.overlayWrapper.querySelector('.o-table-control--expander'),
				forwardButton: this.overlayWrapper.querySelector('.o-table-control--forward'),
				backButton: this.overlayWrapper.querySelector('.o-table-control--back')
			};
		}
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
					left: (document.body.clientWidth / 2),
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
			this._setScrollPosition();
			this._updateControls();
		}.bind(this);

		updateScroll();

		// Observe controls scrolling beyond table and update.
		if (this.controls.controlsOverlay && window.IntersectionObserver) {
			// Fade forward/back buttons at start and end of table.
			const arrowFadeObserverConfig = {
				root: this.controls.controlsOverlay,
				threshold: 1.0,
				rootMargin: `-50px 0px ${this.controls.expanderButton ? '0px' : '-10px'} 0px`
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
		if (!this.canExpand()) {
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
					this.contractTable();
				} else {
					this.expandTable();
				}
			}.bind(this);
			this.controls.expanderButton.addEventListener('click', toggleExpanded);
			this._listeners.push({element: this.controls.expanderButton, toggleExpanded, type: 'click'});
		}

		if (this._opts.expanded){
			window.requestAnimationFrame(this.expandTable.bind(this));
		} else {
			window.requestAnimationFrame(this.contractTable.bind(this));
		}
	}

	/**
	 * Set table scroll position in wrapper.
	 * @returns {undefined}
	 */
	_setScrollPosition() {
		this._fromEnd = this.wrapper.scrollWidth - this.wrapper.clientWidth - this.wrapper.scrollLeft;
		this._fromStart = this.wrapper.scrollLeft;
	}

	/**
	 * Update all controls and their overlays,
	 * e.g. forward/back arrow visibility, visibility of arrow dock, overlay fade.
	 * @returns {undefined}
	 */
	_updateControls() {
		if (!this._controlUpdateScheduled) {
			this._controlUpdateScheduled = true;
			setTimeout(function () {
				// Toggle fade.
				this.controls.fadeOverlay.classList.toggle('o-table-overflow-fade-overlay--scroll', this._canScrollTable);
				this.controls.fadeOverlay.style.setProperty('--o-table-fade-from-end', `${Math.min(this._fromEnd, 10)}px`);
				this.controls.fadeOverlay.style.setProperty('--o-table-fade-from-start', `${Math.min(this._fromStart, 10)}px`);

				// Toggle arrow dock.
				this.controls.controlsOverlay.classList.toggle('o-table-overflow-control-overlay--arrow-dock', this._showArrowDock);

				// Update forward/back scroll controls.
				if (OverflowTable._supportsArrows()) {
					this._updateScrollControl(this.controls.forwardButton);
					this._updateScrollControl(this.controls.backButton);
				}

				// Make controls visible.
				this.controls.controlsOverlay.style.display = '';
				this.controls.fadeOverlay.style.display = '';
				this._controlUpdateScheduled = false;
			}.bind(this), 33);
		}
	}

	/**
	 * Update the visibility of a scroll forward/back button.
	 * @param {HTMLElement} element - The button wrapper.
	 * @returns {undefined}
	 */
	_updateScrollControl(element) {
		// Make arrows sticky if table is tall and can be scrolled past.
		element.classList.toggle('o-table-control--sticky', this._stickyArrows);
		// Place the arrows in the doc if they are not sticky.
		const arrowsDocked = this._showArrowDock && !this._stickyArrows;
		element.classList.toggle('o-table-control--dock', arrowsDocked);
		// Hide scroll buttons if the table fits within the viewport.
		if (this._canScrollTable) {
			element.style.display = '';
		} else {
			element.style.display = 'none';
		}
		// Disable forward button if the table is scrolled to the end.
		const scrolledToBoundary = (this._fromEnd <= 0 && element === this.controls.forwardButton) || (this._fromStart <= 0 && element === this.controls.backButton);
		const outsideTable = element.getAttribute('data-o-table-intersection') === 'true';
		if (outsideTable) {
			element.querySelector('button').setAttribute('disabled', true);
			element.classList.add('o-table-control--hide');
		}

		if (!scrolledToBoundary && !outsideTable) {
			element.querySelector('button').removeAttribute('disabled');
			element.classList.remove('o-table-control--hide');
		}

		if (scrolledToBoundary && !outsideTable) {
			element.querySelector('button').setAttribute('disabled', true);
			const hideControl = !arrowsDocked && (!this._stickyArrows || this._stickyArrows && !this._canScrollPastTable);
			element.classList.toggle('o-table-control--hide', hideControl);
		}
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
	 * The number rows which will be hidden if the table is collapsed.
	 * @returns {Number}
	 */
	get _rowsToHide() {
		const visibleRowCount = Math.min(this.tableRows.length, this._minimumRowCount);
		return this.tableRows.slice(visibleRowCount, this.tableRows.length);
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
		return this.container.getBoundingClientRect().bottom + (document.documentElement.clientHeight / 2) < document.documentElement.getBoundingClientRect().bottom;
	}

	/**
	 * Check if the "dock" at the bottom of the table should be shown.
	 * After scrolling past the table, sticky arrows sit within the dock at the bottom of the table.
	 * @returns {Boolean}
	 */
	get _showArrowDock() {
		return OverflowTable._supportsArrows() && this._canScrollTable && this._canScrollPastTable && this.canExpand() && this._rowsToHide.length !== 0;
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

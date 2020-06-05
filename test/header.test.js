/* eslint-env mocha */
/* global proclaim */

import { dispatch } from './helpers/events';
import Header from '../src/js/header';

describe('Header API', () => {
	it('is defined', () => {
		proclaim.isTypeOf(Header, 'function');
	});
});

describe('Header instance', () => {
	let header;
	let headerEl;
	let containerEl;

	beforeEach(() => {
		containerEl = document.createElement('div');
		document.body.appendChild(containerEl);
		containerEl.innerHTML = `
			<header class="o-header" data-o-component="o-header" data-o-header--no-js>
				<a href="#o-header-drawer" class="o-header__top-link o-header__top-link--menu" aria-controls="o-header-drawer" title="Open drawer menu">
					<span class="o-header__top-link-label">Open drawer menu</span>
				</a>
				<a href="#o-header-search" class="o-header__top-link o-header__top-link--search" aria-controls="o-header-search-js" title="Open search bar">
					<span class="o-header__top-link-label">Open search bar</span>
				</a>
				<div id="o-header-search-js" class="o-header__row o-header__search" role="search" data-o-header-search>
					<input class="o-header__search-term" id="o-header-search-term-js" name="q" type="text" placeholder="Search the FT">
				</div>
			</header>
			<div class="o-header__drawer" id="o-header-drawer" role="navigation" aria-label="Drawer menu" data-o-header-drawer data-o-header-drawer--no-js></div>
		`;
		headerEl = containerEl.querySelector('.o-header');
		header = new Header(headerEl);
	});

	afterEach(() => {
		containerEl.removeChild(headerEl);
		header = null;
		headerEl = null;
		containerEl = null;
	});

	it('constructor', () => {
		proclaim.isInstanceOf(header, Header);
		proclaim.deepEqual(header.headerEl, headerEl);
		proclaim.isNotNull(headerEl.getAttribute('data-o-header--js'));
	});

	it('shows the menu when activating menu button by pressing space', () => {
		const menuButton = document.querySelector('[aria-controls="o-header-drawer"]');
		const drawer = document.getElementById('o-header-drawer');

		proclaim.equal(drawer.getAttribute('aria-hidden'), 'true');

		dispatch(menuButton, 'keydown', { keyCode: 32 });

		proclaim.equal(drawer.getAttribute('aria-hidden'), 'false');
	});

	it('shows the search when activating search button by pressing space', () => {
		const searchButton = document.querySelector('[aria-controls="o-header-search-js"]');
		const search = document.getElementById('o-header-search-js');

		proclaim.equal(search.getAttribute('aria-hidden'), 'true');

		dispatch(searchButton, 'keydown', { keyCode: 32 });

		proclaim.equal(search.getAttribute('aria-hidden'), 'false');
	});
});

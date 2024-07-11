/* eslint-env mocha */

import proclaim from 'proclaim';

import Header from '../src/js/header.js';

describe('Header with search', () => {
	let headerEl;
	let containerEl;
	let searchEl;

	beforeEach(() => {
		containerEl = document.createElement('div');
		document.body.appendChild(containerEl);
		containerEl.innerHTML = `
			<header class="o-header o-header--simple" data-o-component="o-header" data-o-component="o-header" data-o-header--no-js>
				<div class="o-header__row o-header__top">
					<div class="o-header__container">
						<div class="o-header__top-wrapper">

							<div class="o-header__top-column o-header__top-column--left">
								<a href="#o-header-search" class="o-header__top-icon-link o-header__top-icon-link--search" aria-controls="o-header-search" title="Open search bar">
									<span class="o-header__top-link-label">Open search bar</span>
								</a>
							</div>

							<div class="o-header__top-column o-header__top-column--center">
								<!--<div class="o-header__top-takeover"></div>-->
								<a class="o-header__top-logo" href="/" title="Go to Financial Times homepage">
									<span class="o-header__visually-hidden">Financial Times</span>
								</a>
							</div>

							<div class="o-header__top-column o-header__top-column--right">
								<!--<div class="o-header__top-takeover"></div>-->
								<a class="o-header__top-icon-link o-header__top-icon-link--hide-s o-header__top-icon-link--myft" href="/myft" aria-label="My F T">
									<span class="o-header__visually-hidden">myFT</span>
								</a>
							</div>
						</div>
					</div>
				</div>

				<div id="o-header-search" class="o-header__row o-header__search o--if-js" role="search" data-o-header-search>
					<div class="o-header__container">
						<form class="o-header__search-form" action="/search" role="search" aria-label="Site search">
							<label class="o-header__visually-hidden" for="o-header-search-term-js">Search the <abbr title="Financial Times">FT</abbr></label>
							<input class="o-header__search-term" id="o-header-search-term-js" name="q" type="text" placeholder="Search for stories, topics or securities">
							<button class="o-header__search-submit" type="submit">
								Search
							</button>
							<button class="o-header__search-close" type="button" aria-controls="o-header-search" title="Close search bar">
								<span class="o-header__visually-hidden">Close search bar</span>
							</button>
						</form>
					</div>
				</div>

			</header>
		`;
		headerEl = containerEl.querySelector('.o-header');
		searchEl = containerEl.querySelector('#o-header-search');
	});

	afterEach(() => {
		containerEl.removeChild(headerEl);
		headerEl = null;
		containerEl = null;
		searchEl = null;
	});

	describe('when configured imperatively with the "searchState" option', () => {
		describe('set to "close"', () => {
			it('does not show the search bar by default', (done) => {
				new Header(headerEl, {searchState: 'close'});
				setTimeout(() => {
					done(proclaim.equal(searchEl.getAttribute('aria-hidden'), 'true', 'Expected the search bar to be hidden with aria-hidden'));
				}, 0);
			});
		});
		describe('not set at all', () => {
			it('does not show the search bar by default', (done) => {
				new Header(headerEl);
				setTimeout(() => {
					done(proclaim.equal(searchEl.getAttribute('aria-hidden'), 'true', 'Expected the search bar to be hidden with aria-hidden'));
				}, 0);
			});
		});
		describe('set to "open"', () => {
			it('reveals the search bar by default', (done) => {
				new Header(headerEl, {searchState: 'open'});
				setTimeout(() => {
					done();
				}, 0);
			});
		});
		describe('set to a "random" string', () => {
			it('throws an error', () => {
				proclaim.throws(() => {
					new Header(headerEl, {searchState: 'random'});
				});
			});
		});
	});

	describe('when configured declaratively with the "data-o-header-search-state" attribute', () => {
		describe('set to "close"', () => {
			it('does not show the search bar by default ', (done) => {
				headerEl.setAttribute('data-o-header-search-state', 'close');
				new Header(headerEl);
				setTimeout(() => {
					done(proclaim.equal(searchEl.getAttribute('aria-hidden'), 'true', 'Expected the search bar to be hidden with aria-hidden'));
				}, 0);
			});
		});

		describe('not set at all', () => {
			it('does not show the search bar by default ', (done) => {
				new Header(headerEl);
				setTimeout(() => {
					done(proclaim.equal(searchEl.getAttribute('aria-hidden'), 'true', 'Expected the search bar to be hidden with aria-hidden'));
				}, 0);
			});
		});

		describe('set to "open"', () => {
			it('reveals the search bar by default ', (done) => {
				headerEl.setAttribute('data-o-header-search-state', 'open');
				new Header(headerEl);
				setTimeout(() => {
					done(proclaim.equal(searchEl.getAttribute('aria-hidden'), 'false', 'Expected the search bar to not be hidden with aria-hidden!!!'));
				}, 0);
			});
		});

		describe('set to a "random" string', () => {
			it('throws an error', () => {
				proclaim.throws(() => {
					headerEl.setAttribute('data-o-header-search-state', 'random');
					new Header(headerEl, {searchState: 'random'});
				});
			});
		});
	});
});

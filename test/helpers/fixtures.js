let sandboxEl;

function createSandbox() {
	if (document.querySelector('.sandbox')) {
		sandboxEl = document.querySelector('.sandbox');
	} else {
		sandboxEl = document.createElement('div');
		sandboxEl.setAttribute('class', 'sandbox');
		document.body.appendChild(sandboxEl);
	}
}

function reset() {
	sandboxEl.innerHTML = '';
}

function insert(html) {
	createSandbox();
	sandboxEl.innerHTML = html;
}


function htmlCode () {
	/* Generated from the footer.mustache demo */
	const html = `<div id="my-footer">
<footer class="o-footer o-footer--theme-dark" data-o-component="o-footer" data-o-footer--no-js>
		<div class="o-footer__container">

			<h2 class="o-footer-visually-hidden">Useful links</h2>

			<div class="o-footer__row">
				<nav class="o-footer__matrix" role="navigation" aria-label="Useful links">
					<div class="o-footer__matrix-group o-footer__matrix-group--1">
						<h3 class="o-footer__matrix-title" aria-controls="o-footer-section-0">
							xxxxxxx
						</h3>
						<div class="o-footer__matrix-content" id="o-footer-section-0">
								<div class="o-footer__matrix-column">
										<a class="o-footer__matrix-link"  href="&#x2F;&#x2F;www.ft.com&#x2F;help">
											<span class="o-footer__matrix-link__copy">xxxx</span>
										</a>
										<a class="o-footer__matrix-link"  href="&#x2F;&#x2F;www.ft.com&#x2F;aboutus">
											<span class="o-footer__matrix-link__copy">xxxxx xx</span>
										</a>
								</div>
						</div>
					</div>
					<div class="o-footer__matrix-group o-footer__matrix-group--1">
						<h3 class="o-footer__matrix-title" aria-controls="o-footer-section-1">
							xxxxx x xxxxxxx
						</h3>
						<div class="o-footer__matrix-content" id="o-footer-section-1">
								<div class="o-footer__matrix-column">
										<a class="o-footer__matrix-link"  href="&#x2F;&#x2F;www.ft.com&#x2F;servicestools&#x2F;help&#x2F;terms">
											<span class="o-footer__matrix-link__copy">xxxxx x xxxxxxxxxx</span>
										</a>
										<a class="o-footer__matrix-link"  href="&#x2F;&#x2F;www.ft.com&#x2F;servicestools&#x2F;help&#x2F;privacy">
											<span class="o-footer__matrix-link__copy">xxxxxxx</span>
										</a>
										<a class="o-footer__matrix-link"  href="&#x2F;&#x2F;www.ft.com&#x2F;cookiepolicy">
											<span class="o-footer__matrix-link__copy">xxxxxxx</span>
										</a>
										<a class="o-footer__matrix-link"  href="&#x2F;&#x2F;www.ft.com&#x2F;servicestools&#x2F;help&#x2F;copyright">
											<span class="o-footer__matrix-link__copy">xxxxxxxxx</span>
										</a>
								</div>
						</div>
					</div>
					<div class="o-footer__matrix-group o-footer__matrix-group--1">
						<h3 class="o-footer__matrix-title" aria-controls="o-footer-section-2">
							xxxxxxxx
						</h3>
						<div class="o-footer__matrix-content" id="o-footer-section-2">
								<div class="o-footer__matrix-column">
										<a class="o-footer__matrix-link"  href="&#x2F;&#x2F;sub.ft.com&#x2F;spa_5">
											<span class="o-footer__matrix-link__copy">xxxxxxxxxx xxxxxxxxxxxxx</span>
										</a>
										<a class="o-footer__matrix-link"  href="&#x2F;&#x2F;enterprise.ft.com&#x2F;en-gb&#x2F;services&#x2F;group-subscriptions&#x2F;">
											<span class="o-footer__matrix-link__copy">xxxxx xxxxxxxxxxxxx</span>
										</a>
										<a class="o-footer__matrix-link"  href="&#x2F;&#x2F;enterprise.ft.com&#x2F;en-gb&#x2F;services&#x2F;republishing&#x2F;">
											<span class="o-footer__matrix-link__copy">xxxxxxxxxxxx</span>
										</a>
										<a class="o-footer__matrix-link"  href="&#x2F;&#x2F;www.businessesforsale.com&#x2F;ft2&#x2F;notices">
											<span class="o-footer__matrix-link__copy">xxxxxxxxx x xxxxxxx</span>
										</a>
										<a class="o-footer__matrix-link"  href="&#x2F;&#x2F;commerce.uk.reuters.com&#x2F;purchase&#x2F;mostPopular.do?rpc&amp;#x3D;471">
											<span class="o-footer__matrix-link__copy">xxxxxxxx xxxxxxxx</span>
										</a>
								</div>
						</div>
					</div>
					<div class="o-footer__matrix-group o-footer__matrix-group--1">
						<h3 class="o-footer__matrix-title" aria-controls="o-footer-section-3">
							xxxxx
						</h3>
						<div class="o-footer__matrix-content" id="o-footer-section-3">
								<div class="o-footer__matrix-column">
										<a class="o-footer__matrix-link"  href="&#x2F;&#x2F;markets.ft.com&#x2F;data&#x2F;portfolio&#x2F;dashboard">
											<span class="o-footer__matrix-link__copy">xxxxxxxxx</span>
										</a>
										<a class="o-footer__matrix-link"  href="&#x2F;&#x2F;ftepaper.ft.com">
											<span class="o-footer__matrix-link__copy">xxxxxxx xxxxx</span>
										</a>
										<a class="o-footer__matrix-link"  href="&#x2F;&#x2F;markets.ft.com&#x2F;data&#x2F;alerts&#x2F;">
											<span class="o-footer__matrix-link__copy">xxxxxx xxx</span>
										</a>
										<a class="o-footer__matrix-link"  href="&#x2F;&#x2F;lexicon.ft.com&#x2F;">
											<span class="o-footer__matrix-link__copy">xxxxxxx</span>
										</a>
										<a class="o-footer__matrix-link"  href="&#x2F;&#x2F;rankings.ft.com&#x2F;businessschoolrankings&#x2F;global-mba-ranking-2016">
											<span class="o-footer__matrix-link__copy">xxx xxxxxxxx</span>
										</a>
								</div>
						</div>
					</div>
					<div class="o-footer__matrix-group o-footer__matrix-group--1">
						<h3 class="o-footer__matrix-title" aria-controls="o-footer-section-4">
							xxxxxxx
						</h3>
						<div class="o-footer__matrix-content" id="o-footer-section-4">
								<div class="o-footer__matrix-column">
										<a class="o-footer__matrix-link"  href="&#x2F;&#x2F;markets.ft.com&#x2F;data&#x2F;portfolio&#x2F;dashboard">
											<span class="o-footer__matrix-link__copy">xxxxxxxxx</span>
										</a>
										<a class="o-footer__matrix-link"  href="&#x2F;&#x2F;ftepaper.ft.com">
											<span class="o-footer__matrix-link__copy">xxxxxxx xxxxx</span>
										</a>
										<a class="o-footer__matrix-link"  href="&#x2F;&#x2F;markets.ft.com&#x2F;data&#x2F;alerts&#x2F;">
											<span class="o-footer__matrix-link__copy">xxxxxx xxx</span>
										</a>
										<a class="o-footer__matrix-link"  href="&#x2F;&#x2F;lexicon.ft.com&#x2F;">
											<span class="o-footer__matrix-link__copy">xxxxxxx</span>
										</a>
								</div>
						</div>
					</div>
					<div class="o-footer__matrix-group o-footer__matrix-group--1">
						<h3 class="o-footer__matrix-title o-footer__matrix-title--link">
							<a class ='o-footer__matrix-link o-footer__matrix-link--more' id="o-footer-section-5" href="https://ft.com/more-from-ft-group">
								<span class="o-footer__matrix-link__copy">More from the FT Group</span>
							</a>
						</h3>
					</div>
				</nav>
			</div>

			<div class="o-footer__copyright">
				<small>
					Markets data delayed by at least 15 minutes. &#169; THE FINANCIAL TIMES LTD 2021.
					<abbr title="Financial Times" aria-label="F T">FT</abbr> and ‘Financial Times’ are trademarks of The Financial Times Ltd.<br>
					The Financial Times and its journalism are subject to a self-regulation regime under the <a href="http://aboutus.ft.com/en-gb/ft-editorial-code/" aria-label="F T Editorial Code of Practice">FT Editorial Code of Practice</a>.
				</small>
			</div>

		</div>
		<div class="o-footer__brand">
			<div class="o-footer__container">
				<div class="o-footer__brand-logo"></div>
			</div>
		</div>
	</footer>
</div>
	`;
	insert(html);
}

export {
	htmlCode,
	reset
};

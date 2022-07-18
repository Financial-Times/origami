import {NavMobile, NavDesktop} from './header/nav/nav';
import {Nav} from './Props'

export function Header({mobile, desktop, isSignedIn}: Nav) {
	return (
		<header
			className="o-header"
			data-o-component="o-header"
			data-o-header--no-js>
			<div className="o-header__row o-header__anon">
				<ul className="o-header__anon-list">
					<li className="o-header__anon-item">
						<a className="o-header__anon-link" href="#">
							Subscribe
						</a>
					</li>
					<li className="o-header__anon-item">
						<a className="o-header__anon-link" href="#">
							Sign In
						</a>
					</li>
				</ul>
			</div>

			<div className="o-header__row o-header__top">
				<div className="o-header__container">
					<div className="o-header__top-wrapper">
						<div className="o-header__top-column o-header__top-column--left">
							<a
								href="#o-header-drawer"
								className="o-header__top-icon-link o-header__top-icon-link--menu"
								aria-controls="o-header-drawer"
								title="Open side navigation menu">
								<span className="o-header__top-link-label">
									Open side navigation menu
								</span>
							</a>
						</div>
						<div className="o-header__top-column o-header__top-column--center">
							<a
								className="o-header__top-logo"
								href="/"
								title="Go to Financial Times homepage">
								<span className="o-header__visually-hidden">
									Financial Times
								</span>
							</a>
						</div>

						<div className="o-header__top-column o-header__top-column--right">
							<a className="o-header__top-button o-header__top-button--hide-m">
								Subscribe
							</a>
							<a className="o-header__top-link o-header__top-link--hide-m">
								Sign in
							</a>
						</div>
					</div>
				</div>
			</div>

			{/* <!-- To support both core and enhanced, duplicating the search row is necessary to avoid it flashing in enhanced -->
<!-- Pick only one of the two <div> if you don't need to support both core and enhanced --> */}
			<div
				id="o-header-search"
				className="o-header__row o-header__search o--if-no-js"
				role="search">
				<div className="o-header__container">
					<form
						className="o-header__search-form"
						action="/search"
						role="search"
						aria-label="Site search">
						<label
							className="o-header__visually-hidden"
							htmlFor="o-header-search-term">
							Search the <abbr title="Financial Times">FT</abbr>
						</label>
						<input
							className="o-header__search-term"
							id="o-header-search-term"
							name="q"
							type="text"
							placeholder="Search the FT"
						/>
						<button className="o-header__search-submit" type="submit">
							Search
						</button>
					</form>
				</div>
			</div>
			<div
				id="o-header-search-js"
				className="o-header__row o-header__search"
				role="search"
				data-o-header-search>
				<div className="o-header__container">
					<form
						className="o-header__search-form"
						action="/search"
						role="search"
						aria-label="Site search">
						<label
							className="o-header__visually-hidden"
							htmlFor="o-header-search-term-js">
							Search the <abbr title="Financial Times">FT</abbr>
						</label>
						<input
							className="o-header__search-term"
							id="o-header-search-term-js"
							name="q"
							type="text"
							placeholder="Search the FT"
						/>
						<button className="o-header__search-submit" type="submit">
							Search
						</button>
						<button
							className="o-header__search-close o--if-js"
							type="button"
							aria-controls="o-header-search-js"
							title="Close search bar">
							<span className="o-header__visually-hidden">
								Close search bar
							</span>
						</button>
					</form>
				</div>
			</div>

			<NavMobile navItems={mobile}/>

			<NavDesktop navItems={desktop} isSignedIn={isSignedIn} />
		</header>
	);
}

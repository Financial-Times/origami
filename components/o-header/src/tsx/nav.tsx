import {
	NavDesktopItem,
	NavItem,
	Article,
	Subsection,
	CurrentNav,
} from './Props';

export function NavMobile({navItems}: {navItems: NavItem[]}) {
	return (
		<nav
			id="o-header-nav-mobile"
			className="o-header__row o-header__nav o-header__nav--mobile"
			role="navigation"
			aria-label="Main navigation">
			<NavList navItems={navItems} mobile={true} />
		</nav>
	);
}

export function NavDesktop({
	isSignedIn,
	navItems,
}: {
	isSignedIn: boolean;
	navItems: NavDesktopItem[];
}) {
	return (
		<nav
			id="o-header-nav-desktop"
			className="o-header__row o-header__nav o-header__nav--desktop"
			role="navigation"
			aria-label="Main navigation">
			<div className="o-header__container">
				<NavList navItems={navItems} />
				<NavRight isSignedIn={isSignedIn} />
			</div>
		</nav>
	);
}

function NavList({
	navItems,
	mobile,
}: {
	navItems: NavDesktopItem[];
	mobile?: boolean;
}) {
	const wrapperClassName = mobile
		? 'o-header__nav-list'
		: 'o-header__nav-list o-header__nav-list--left';
	return (
		<ul className={wrapperClassName}>
			{navItems.map(navItem => {
				const {name, selected, index, hasMega, articles, subsections} = navItem;
				const ariaLabel = selected ? name + ', current page' : undefined;
				const ariaCurrent = selected ? 'page' : undefined;
				const ariaControls = !selected ? 'o-header-mega-' + index : undefined;
				return (
					<li className="o-header__nav-item" key={index}>
						<a
							className="o-header__nav-link o-header__nav-link--primary"
							href="#"
							aria-label={ariaLabel}
							aria-current={ariaCurrent}
							aria-controls={ariaControls}
							id={`o-header-link-${index}`}>
							{name}
						</a>
						{hasMega && (
							<HeaderMega
								subsections={subsections}
								index={index}
								articles={articles}
							/>
						)}
					</li>
				);
			})}
		</ul>
	);
}

function NavRight({isSignedIn}: {isSignedIn: boolean}) {
	if (isSignedIn) {
		return (
			<ul className="o-header__nav-list o-header__nav-list--right">
				<li className="o-header__nav-item">
					<a
						className="o-header__nav-link o-header__nav-link--utility"
						href="https://markets.ft.com/data/portfolio/dashboard">
						Portfolio
					</a>
				</li>
				<li className="o-header__nav-item">
					<a
						className="o-header__nav-link o-header__nav-link--utility"
						href="https://myaccount.ft.com/details/core/view">
						My Account
					</a>
				</li>
			</ul>
		);
	}

	return (
		<ul className="o-header__nav-list o-header__nav-list--right">
			<li className="o-header__nav-item">
				<a
					className="o-header__nav-link o-header__nav-link--utility"
					href="/login">
					Sign In
				</a>
			</li>
			<li className="o-header__nav-item">
				<a className="o-header__nav-button" href="/products">
					Subscribe
				</a>
			</li>
		</ul>
	);
}

function HeaderMega({
	subsections,
	index,
	articles,
}: {
	subsections?: Subsection[];
	index?: number;
	articles?: Article[];
}) {
	return (
		<div
			className="o-header__mega"
			id={'o-header-mega-' + index}
			role="group"
			aria-labelledby={'o-header-link-' + index}
			data-o-header-mega>
			<div className="o-header__container">
				<div className="o-header__mega-wrapper">
					<div className="o-header__mega-column o-header__mega-column--subsections">
						<div className="o-header__mega-heading">Sub-sections</div>
						<div className="o-header__mega-content">
							<SubSection subsections={subsections} />
						</div>
					</div>
					<TopStories articles={articles} />
				</div>
			</div>
		</div>
	);
}

function SubSection({subsections}: {subsections?: Subsection[]}) {
	return subsections ? (
		<ul className="o-header__mega-list">
			{subsections.map(({url, name}, i) => (
				<li className="o-header__mega-item" key={i}>
					<a className="o-header__mega-link" href={url}>
						{name}
					</a>
				</li>
			))}
		</ul>
	) : null;
}

function TopStories({articles}: {articles?: Article[]}) {
	return articles ? (
		<div className="o-header__mega-column o-header__mega-column--articles">
			<div className="o-header__mega-heading">Top Stories</div>
			<div className="o-header__mega-content">
				<ul className="o-header__mega-list">
					{articles.map(({url, title}, i) => (
						<li className="o-header__mega-item" key={i}>
							<a className="o-header__mega-link" href={url}>
								{title}
							</a>
						</li>
					))}
				</ul>
			</div>
		</div>
	) : null;
}

export function SubNavigation({currentNav}: {currentNav: CurrentNav}) {
	const {name, href, children, ancestors, childrenRight} = currentNav;
	return (
		<div
			className="o-header__subnav"
			role="navigation"
			aria-label="Sub navigation"
			data-o-header-subnav>
			<div className="o-header__container">
				<div className="o-header__subnav-wrap-outside">
					<div
						className="o-header__subnav-wrap-inside"
						data-o-header-subnav-wrapper>
						<div className="o-header__subnav-content">
							<ol
								className="o-header__subnav-list o-header__subnav-list--breadcrumb"
								aria-label="Breadcrumb">
								{ancestors &&
									ancestors.map(({name, href}, i) => (
										<li className="o-header__subnav-item" key={i}>
											<a className="o-header__subnav-link" href={href}>
												{' '}
												{name}{' '}
											</a>
										</li>
									))}
								<li className="o-header__subnav-item">
									<a
										className="o-header__subnav-link"
										href={href}
										aria-current="page"
										aria-label={`${name}, current page`}>
										{name}
									</a>
								</li>
							</ol>

							<ul
								className="o-header__subnav-list o-header__subnav-list--children"
								aria-label="Subsections">
								{children &&
									children.map(({name, href}, i) => (
										<li className="o-header__subnav-item" key={i}>
											<a className="o-header__subnav-link" href={href}>
												{' '}
												{name}{' '}
											</a>
										</li>
									))}
							</ul>
							{childrenRight && (
								<ul
									className="o-header__subnav-list o-header__subnav-list--children o-header__subnav-list--right"
									aria-label="Actions">
									{childrenRight.map(({name, href}, i) => (
										<li className="o-header__subnav-item">
											<a className="o-header__subnav-link" href={href} key={i}>
												{' '}
												{name}{' '}
											</a>
										</li>
									))}
								</ul>
							)}
						</div>
					</div>
					<button
						className="o-header__subnav-button o-header__subnav-button--left"
						aria-hidden="true"
						disabled></button>
					<button
						className="o-header__subnav-button o-header__subnav-button--right"
						aria-hidden="true"
						disabled></button>
				</div>
			</div>
		</div>
	);
}

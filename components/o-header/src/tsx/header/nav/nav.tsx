import {AnchorType, NavDesktopItem, NavItem} from '../../Props';
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

function NavList({navItems, mobile}: {navItems: NavItem[]; mobile?: boolean}) {
	const wrapperClassName = mobile
		? 'o-header__nav-list'
		: 'o-header__nav-list o-header__nav-list--left';
	return (
		<ul className={wrapperClassName}>
			{navItems.map((navItem, i) => {
				const {name, selected} = navItem;
				const ariaLabel = selected ? name + ', current page' : undefined;
				const ariaCurrent = selected ? 'page' : undefined;
				const ariaControls = !selected ? 'o-header-mega-' + i : undefined;
				return (
					<li className="o-header__nav-item" key={i}>
						<a
							className="o-header__nav-link o-header__nav-link--primary"
							href="#"
							aria-label={ariaLabel}
							aria-current={ariaCurrent}
							aria-controls={ariaControls}
							id={`o-header-link-${i}`}>
							{name}
						</a>
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

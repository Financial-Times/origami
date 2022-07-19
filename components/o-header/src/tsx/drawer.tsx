import {
	AnchorType,
	DrawerNav,
	DrawerNavItemProps,
	DrawerProps,
	EditionType,
	User,
} from './Props';

export function Drawer({nav, editions, user}: DrawerProps) {
	return (
		<div
			className="o-header__drawer"
			id="o-header-drawer"
			role="navigation"
			aria-label="Drawer menu"
			data-o-header-drawer
			data-o-header-drawer--no-js>
			<div className="o-header__drawer-inner">
				<DrawerTools currentEdition={editions.current} />
				<DrawerAction />
				<DrawerSearch />
				<DrawerEditionSwitcher otherEditions={editions.others} />
				<DrawerMenu navItems={nav} />
				<DrawerUser user={user}/>
			</div>
		</div>
	);
}

function DrawerTools({currentEdition}: {currentEdition: EditionType}) {
	return (
		<div className="o-header__drawer-tools">
			<a className="o-header__drawer-tools-logo" href="/">
				<span className="o-header__visually-hidden">Financial Times</span>
			</a>
			<button
				type="button"
				className="o-header__drawer-tools-close"
				aria-controls="o-header-drawer"
				title="Close drawer menu">
				<span className="o-header__visually-hidden">Close drawer menu</span>
			</button>
			<p className="o-header__drawer-current-edition">
				{currentEdition.name} Edition
			</p>
		</div>
	);
}

function DrawerAction() {
	return (
		<div className="o-header__drawer-actions">
			<a className="o-header__drawer-button" href="#">
				{' '}
				subscribe{' '}
			</a>
		</div>
	);
}

function DrawerSearch() {
	return (
		<div className="o-header__drawer-search">
			<form
				className="o-header__drawer-search-form"
				action="/search"
				role="search"
				aria-label="Site search">
				<label
					className="o-header__visually-hidden"
					htmlFor="o-header-drawer-search-term">
					Search the <abbr title="Financial Times">FT</abbr>
				</label>
				<input
					className="o-header__drawer-search-term"
					id="o-header-drawer-search-term"
					name="q"
					type="text"
					autoComplete="off"
					autoCorrect="off"
					autoCapitalize="off"
					spellCheck="false"
					placeholder="Search the FT"
				/>
				<button className="o-header__drawer-search-submit" type="submit">
					<span className="o-header__visually-hidden">Search</span>
				</button>
			</form>
		</div>
	);
}

function DrawerEditionSwitcher({
	otherEditions,
}: {
	otherEditions: EditionType[];
}) {
	return (
		<nav className="o-header__drawer-menu" aria-label="Edition switcher">
			<ul className="o-header__drawer-menu-list">
				{otherEditions.map(({name, id}) => (
					<li className="o-header__drawer-menu-item" key={id}>
						<a className="o-header__drawer-menu-link" href={`/?edition=${id}`}>
							Switch to {name} Edition
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}

interface ExtendedDrawerNavItem extends DrawerNavItemProps {
	additionalClass?: string;
}
function AnchorElement({
	href,
	name,
	selected,
	additionalClasses,
	variation,
}: {
	href: string;
	name: string;
	selected?: boolean;
	additionalClasses?: string;
	variation?: string;
}) {
	const ariaLabel = selected ? name + ', current page' : undefined;
	const ariaCurrent = selected ? 'page' : undefined;
	let anchorClass = selected
		? ' o-header__drawer-menu-link--selected'
		: ' o-header__drawer-menu-link--unselected';

	if (additionalClasses) {
		anchorClass += ' ' + additionalClasses;
	}
	if (variation) {
		anchorClass += ` o-header__drawer-menu-link--${variation}`;
	}
	return (
		<a
			className={`o-header__drawer-menu-link${anchorClass}`}
			href={href}
			aria-label={ariaLabel}
			aria-current={ariaCurrent}>
			{name}
		</a>
	);
}

function DrawerSubMenu({
	name,
	href,
	index,
	children,
}: {
	name: string;
	href: string;
	index: number;
	children: AnchorType[];
}) {
	const additionalClasses = '  o-header__drawer-menu-link--parent';
	const childAnchorClass = ' o-header__drawer-menu-link--child';

	return (
		<>
			<div className="o-header__drawer-menu-toggle-wrapper">
				<AnchorElement
					href={href}
					name={name}
					additionalClasses={additionalClasses}
				/>
				<button
					className="o-header__drawer-menu-toggle o-header__drawer-menu-toggle--unselected"
					aria-controls={`o-header-drawer-child-${index}`}>
					Show more {name} links
				</button>
			</div>
			<ul
				className="o-header__drawer-menu-list o-header__drawer-menu-list--child"
				id={`o-header-drawer-child-${index}`}>
				{children.map(({name, href}, i) => (
					<li className="o-header__drawer-menu-item" key={i}>
						<AnchorElement
							href={href}
							name={name}
							additionalClasses={childAnchorClass}
						/>
					</li>
				))}
			</ul>
		</>
	);
}
function DrawerNavItem({
	name,
	href,
	selected,
	index,
	hasChildren,
	children,
	variation,
	divide,
	additionalClass,
}: ExtendedDrawerNavItem) {
	let additionalClassName = additionalClass ? ` ${additionalClass}` : '';
	const renderDrawerSubMenu = hasChildren && children && href && index;
	if (divide) additionalClassName = ' o-header__drawer-menu-item--divide';
	if (renderDrawerSubMenu) {
		return (
			<li className={`o-header__drawer-menu-item${additionalClassName}`}>
				<DrawerSubMenu
					name={name}
					href={href}
					index={index}
					children={children}
				/>
			</li>
		);
	}
	return (
		<li className={`o-header__drawer-menu-item${additionalClassName}`}>
			{href ? (
				<AnchorElement
					href={href}
					name={name}
					selected={selected}
					variation={variation}
				/>
			) : (
				<>{name}</>
			)}
		</li>
	);
}
function DrawerMenu({navItems}: {navItems: DrawerNav[]}) {
	return (
		<nav className="o-header__drawer-menu o-header__drawer-menu--primary">
			<ul className="o-header__drawer-menu-list">
				{navItems.map(({heading, items}, i) => {
					const Items = items.map((item, j) => {
						return <DrawerNavItem {...item} key={j} />;
					});
					if (heading?.name) {
						return (
							<>
								<DrawerNavItem
									name={heading.name}
									additionalClass="o-header__drawer-menu-item--heading"
									key={i}
								/>
								{Items}
							</>
						);
					}
					return <>{Items}</>;
				})}
			</ul>
		</nav>
	);
}

function DrawerUser({user}: {user: User}) {
	return (
		<nav className="o-header__drawer-menu o-header__drawer-menu--user">
			<ul className="o-header__drawer-menu-list">
				<li className="o-header__drawer-menu-item">
					<a
						className="o-header__drawer-menu-link"
						href="/products?segID=400863&amp;segmentID=190b4443-dc03-bd53-e79b-b4b6fbd04e64">
						Subscribe
					</a>
				</li>
				<li className="o-header__drawer-menu-item">
					<a className="o-header__drawer-menu-link" href="/login">
						Sign In
					</a>
				</li>
			</ul>
		</nav>
	);
}

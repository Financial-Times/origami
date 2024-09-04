import {AskFtButton} from './components/ask-ft-button';
import {TNavEdition, TNavAction, TNavMenuItem, THeaderProps} from './Props';

export function Drawer({
	data,
	showAskButton,
	userIsLoggedIn,
	userIsSubscribed,
}: THeaderProps) {
	const editions = data.editions;
	const subscribeAction = data.subscribeAction;
	const navItems = data.drawer.items;
	const userData = userIsLoggedIn ? data.user : data.anon;
	const showAskFtButton = showAskButton;
	const showSubscribeButton = !userIsSubscribed && subscribeAction;
	const showDrawerActions =
		showAskFtButton || showSubscribeButton;
	return (
		<div
			className="o-header__drawer"
			id="o-header-drawer"
			role="dialog"
			aria-modal="true"
			aria-label="Drawer menu"
			data-o-header-drawer
			data-o-header-drawer--no-js>
			<div className="o-header__drawer-inner">
				<DrawerTools
					current={editions.current}
					otherEditions={editions.others}
				/>
				<DrawerSearch />
				{showDrawerActions && (
					<div className="o-header__drawer-actions">
						{showAskFtButton && (
							<AskFtButton
								variant="drawer"
								dataTrackable="ask-ft-button-drawer"
								id="ask-ft-button-drawer"
							/>
						)}
						{showSubscribeButton && (
							<ActionButton action={subscribeAction} />
						)}
					</div>
				)}
				<DrawerMenu navItems={navItems} />
				<DrawerUser {...userData} />
			</div>
		</div>
	);
}

function DrawerTools({
	current,
	otherEditions,
}: {
	current: TNavEdition;
	otherEditions: TNavEdition[];
}) {
	return (
		<div className="o-header__drawer-tools">
			<button
				type="button"
				className="o-header__drawer-tools-close"
				aria-controls="o-header-drawer"
				title="Close side navigation menu">
				<span className="o-header__visually-hidden">
					Close side navigation menu
				</span>
			</button>
			<DrawerEditionSwitcher current={current} otherEditions={otherEditions} />
		</div>
	);
}

function ActionButton({action}: {action: TNavAction}) {
	return (
		<a className="o-header__drawer-button" role="button" href={action.url}>
			{action.name}
		</a>
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
					htmlFor="o-header-drawer-search-term"
					className="o-forms-field o-forms-field--optional">
					<span className="o-forms-title o-header__visually-hidden">
						<span className="o-forms-title__main">
							Search the <abbr title="Financial Times">FT</abbr>
						</span>
					</span>
					<span className="o-forms-input o-forms-input--text o-forms-input--suffix">
						<input
							id="o-header-drawer-search-term"
							type="search"
							autoComplete="off"
							autoCorrect="off"
							autoCapitalize="off"
							spellCheck={false}
							placeholder="Search for stories, topics or securities"
						/>
						<button className="o-header__drawer-search-submit" type="submit">
							<span className="o-header__visually-hidden">Search</span>
						</button>
					</span>
				</label>
			</form>
		</div>
	);
}

function DrawerEditionSwitcher({
	current,
	otherEditions,
}: {
	current: TNavEdition;
	otherEditions: TNavEdition[];
}) {
	return (
		<nav
			className="o-header__drawer-menu o-header__drawer-edition-switcher"
			aria-label="Edition switcher">
			<span className="o-header__drawer-menu-item">Edition:</span>
			<span className="o-header__drawer-menu-item o-header__drawer-current-edition">
				{current?.name}
			</span>
			<div className="o-header__drawer-divider"></div>
			{otherEditions.map(({name, id, url}) => (
				<a className="o-header__drawer-menu-link" href={`${url}?edition=${id}`}>
					{name}
				</a>
			))}
		</nav>
	);
}

function DrawerMenu({navItems}: {navItems: TNavMenuItem[]}) {
	return (
		<nav className="o-header__drawer-menu o-header__drawer-menu--primary">
			{navItems.map(({label, submenu}, i) => {
				const hasDivider = !label;
				const labelId = label
					? label.replace(' ', '-').toLowerCase()
					: undefined;
				const navigationItems = submenu?.items.map((item, j) => {
					return (
						<DrawerNavItem
							navItem={item}
							index={`${i}-${j}`}
							hasHeading={!!label}
							key={`submenu-${i}-${j}`}
						/>
					);
				});
				const classNames = ['o-header__drawer-menu-list'];
				hasDivider && classNames.push('o-header__drawer-menu-list--divide');
				const menuItem = [
					label && (
						<h2
							className="o-header__drawer-menu-item o-header__drawer-menu-item--heading"
							id={labelId}
							key={`heading-${i}`}>
							{label}
						</h2>
					),
					<ul
						className={classNames.join(' ')}
						aria-labelledby={labelId}
						key={`drawer-list-${i}`}>
						{navigationItems}
					</ul>,
				];
				return menuItem;
			})}
		</nav>
	);
}

function DrawerNavItem({
	navItem,
	index,
	hasHeading,
}: {
	navItem: TNavMenuItem;
	index: string;
	hasHeading?: boolean;
}) {
	const {label, url, submenu, selected} = navItem;
	if (submenu) {
		return (
			<DrawerSubMenu
				url={url}
				label={label}
				submenu={submenu.items}
				selected={selected}
				idSuffix={index}
			/>
		);
	}
	return (
		<li className="o-header__drawer-menu-item">
			<AnchorElement
				url={url}
				label={label}
				selected={selected}
				additionalClasses={
					!hasHeading && 'o-header__drawer-menu-link--secondary'
				}
			/>
		</li>
	);
}

function AnchorElement({
	url,
	label,
	selected,
	additionalClasses,
	variation,
}: {
	url: string;
	label: string;
	selected?: boolean;
	additionalClasses?: string;
	variation?: string;
}) {
	const ariaLabel = selected ? label + ', current page' : undefined;
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
			href={url}
			aria-label={ariaLabel}
			aria-current={ariaCurrent}>
			{label}
		</a>
	);
}

function DrawerSubMenu({
	label,
	url,
	idSuffix,
	selected,
	submenu,
}: {
	label: string;
	url: string;
	idSuffix: string;
	selected?: boolean;
	submenu: TNavMenuItem[] | TNavMenuItem[][];
}) {
	const additionalClasses = '  o-header__drawer-menu-link--parent';
	const childAnchorClass = ' o-header__drawer-menu-link--child';

	return (
		<li className="o-header__drawer-menu-item">
			<div className="o-header__drawer-menu-toggle-wrapper">
				<AnchorElement
					url={url}
					label={label}
					selected={selected}
					additionalClasses={additionalClasses}
				/>
				<button
					className="o-header__drawer-menu-toggle o-header__drawer-menu-toggle--unselected"
					aria-controls={`o-header-drawer-child-${idSuffix}`}>
					{`Show more ${label}`}
				</button>
			</div>
			<ul
				className="o-header__drawer-menu-list o-header__drawer-menu-list--child"
				id={`o-header-drawer-child-${idSuffix}`}>
				{submenu &&
					submenu.map((item, i) => (
						<li className="o-header__drawer-menu-item" key={item.url + i}>
							<AnchorElement
								url={item.url}
								label={item.label}
								selected={item.selected}
								additionalClasses={childAnchorClass}
							/>
						</li>
					))}
			</ul>
		</li>
	);
}

function DrawerUser({items}: {items: TNavMenuItem[]}) {
	return (
		<nav className="o-header__drawer-menu o-header__drawer-menu--user">
			<ul className="o-header__drawer-menu-list">
				{items.map(item => (
					<li key={item.url} className="o-header__drawer-menu-item">
						<a className="o-header__drawer-menu-link" href={item.url}>
							{item.label}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}

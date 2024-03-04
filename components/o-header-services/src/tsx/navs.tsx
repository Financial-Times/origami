export type ListItem = {
	label: string;
	url: string;
	current?: boolean;
};

export interface NavItem extends ListItem {
	dropDownItems?: ListItem[];
}

export function PrimaryNav({navItems}: {navItems: NavItem[]}) {
	return (
		<nav className="o-header-services__primary-nav" aria-label="Primary">
			<ul className="o-header-services__primary-nav-list">
				{navItems.map((item, i) => {
					const classNames = ['o-header-services__primary-nav-item'];
					item.dropDownItems &&
						classNames.push('o-header-services__primary-nav-item--dropdown');

					return (
						<li
							key={i}
							data-o-header-services-level={item.dropDownItems ? 1 : undefined}>
							<a
								href={item.url}
								aria-current={item.current ? 'page' : undefined}>
								{item.label}
							</a>
							{item.dropDownItems && (
								<DropDown
									dropdownItems={item.dropDownItems}
									parentName={item.label}
								/>
							)}
						</li>
					);
				})}
			</ul>
		</nav>
	);
}

export type SecondaryNavProps = {
	ancestors?: ListItem[];
	children?: ListItem[];
};

export function SecondaryNav({ancestors, children}: SecondaryNavProps) {
	return (
		<nav
			className="o-header-services__secondary-nav"
			aria-label="secondary"
			data-o-header-services-nav>
			<div
				className="o-header-services__secondary-nav-content"
				data-o-header-services-nav-list>
				<ol
					className="o-header-services__secondary-nav-list o-header-services__secondary-nav-list--ancestors"
					aria-label="Ancestor sections">
					{ancestors?.map((ancestor, i) => (
						<li key={i}>
							<a
								aria-current={ancestor.current ? 'page' : undefined}
								href={ancestor.url}>
								{ancestor.label}
							</a>
						</li>
					))}
				</ol>

				<ul
					className="o-header-services__secondary-nav-list o-header-services__secondary-nav-list--children"
					aria-label="Child sections">
					{children?.map((child, i) => (
						<li key={i}>
							<a
								aria-current={child.current ? 'page' : undefined}
								href={child.url}>
								{child.label}
							</a>
						</li>
					))}
				</ul>
			</div>
			<button
				className="o-header-services__scroll-button o-header-services__scroll-button--left"
				title="scroll left"
				aria-hidden="true"
				disabled></button>
			<button
				className="o-header-services__scroll-button o-header-services__scroll-button--right"
				title="scroll right"
				aria-hidden="true"
				disabled></button>
		</nav>
	);
}

function DropDown({
	dropdownItems,
	parentName,
}: {
	dropdownItems: ListItem[];
	parentName: string;
}) {
	return (
		<>
			<button
				className="o-header-services__drop-down-button"
				type="button"
				name="button"
				aria-label={`Toggle ${parentName} dropdown menu`}></button>
			<ul data-o-header-services-level="2" aria-hidden="true">
				{dropdownItems.map((item, i) => {
					const attr = item.current ? 'page' : undefined;
					return (
						<li key={i}>
							<a href={item.url} aria-current={attr}>
								{item.label}
							</a>
						</li>
					);
				})}
				<li>
					<button
						className="o-header-services__visually-hidden"
						type="button"
						name="button">
						Close {parentName} dropdown menu
					</button>
				</li>
			</ul>
		</>
	);
}

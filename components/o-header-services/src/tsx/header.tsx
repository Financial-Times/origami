interface SubNavItem {
	url: string
	label: string
	current?: boolean
}

interface SubNav {
	ancestors: SubNavItem[]
	children: SubNavItem[]
}
interface NavItem {
	label: string
	url: string
	current?: boolean
	items?: SubNavItem[]
}

interface HeaderLink {
	url: string
	label: string
}
export interface HeaderProps {
	nav?: NavItem[]
	subnav?: SubNav
	related?: HeaderLink[]
	title: string
	tagline: string
	homeUrl?: string
}

export function Header({
	nav,
	subnav,
	related,
	title,
	tagline,
	homeUrl = "/",
}: HeaderProps) {
	return (
		<header className="o-header-services" data-o-component="o-header-services">
			<div className="o-header-services__top">
				{nav ? (
					<div className="o-header-services__hamburger">
						<a
							className="o-header-services__hamburger-icon"
							href="#core-nav-fallback"
							role="button">
							<span className="o-header-services__visually-hidden">
								Open primary navigation
							</span>
						</a>
					</div>
				) : (
					""
				)}

				<div className="o-header-services__logo"></div>

				<div className="o-header-services__title">
					<a className="o-header-services__product-name" href={homeUrl}>
						{title}
					</a>
					<span className="o-header-services__product-tagline">{tagline}</span>
				</div>
				{related ? (
					<ul className="o-header-services__related-content">
						{related.map(link => {
							return (
								<li key={link.label}>
									<a href={link.url}>{link.label}</a>
								</li>
							)
						})}
					</ul>
				) : (
					""
				)}
			</div>
			{nav ? (
				<nav className="o-header-services__primary-nav" aria-label="primary">
					<ul className="o-header-services__primary-nav-list">
						{nav.map(navItem => {
							let aProps = {href: navItem.url}
							if (navItem.current) {
								aProps["aria-current"] = "page"
							}
							if (Array.isArray(navItem.items)) {
								return (
									<li data-o-header-services-level="1">
										<a {...aProps}>{navItem.label}</a>
										<button
											className="o-header-services__drop-down-button"
											type="button"
											name="button"
											aria-label="Toggle dropdown menu"></button>
										<ul data-o-header-services-level="2" aria-hidden="true">
											{navItem.items.map(item => {
												let liProps = {}
												if (item.current) {
													liProps["aria-current"] = "page"
												}
												return (
													<li {...liProps} key={item.label}>
														<a href={item.url}>{item.label}</a>
													</li>
												)
											})}
											<li>
												<button
													className="o-header-services__visually-hidden"
													type="button"
													name="button">
													Close dropdown menu
												</button>
											</li>
										</ul>
									</li>
								)
							}
							return (
								<li key={navItem.label}>
									<a {...aProps}>{navItem.label}</a>
								</li>
							)
						})}
					</ul>
				</nav>
			) : (
				""
			)}
			{subnav ? (
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
							{subnav.ancestors.map(item => {
								return (
									<li key={item.label}>
										<a href={item.url}>{item.label}</a>
									</li>
								)
							})}
						</ol>
						<ul
							className="o-header-services__secondary-nav-list o-header-services__secondary-nav-list--children"
							aria-label="Child sections">
							{subnav.children.map(item => {
								let aProps = {href: item.url}
								if (item.current) {
									aProps["aria-current"] = "page"
								}
								return (
									<li key={item.label}>
										<a {...aProps}>{item.label}</a>
									</li>
								)
							})}
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
			) : (
				""
			)}
		</header>
	)
}

/**
 * Constrained to column 1
 */
export function SingleSpan({children}) {
	return <div className="o-layout__main__single-span">{children}</div>
}

/**
 * Expands to span columns 1 & 2
 */
export function FullSpan({children}) {
	return <div className="o-layout__main__full-span">{children}</div>
}

interface NavHeadingProps {
	level: 2 | 3
	children: string | JSX.Element | JSX.Element[]
}

// perhaps layout should have a navHeadings boolean that sets
// a shared class so you can use something like this as children
function NavHeading({children, level}: NavHeadingProps) {
	if (level == 2) {
		return <h2 className="nav-heading">{children}</h2>
	} else if (level == 3) {
		return <h3 className="nav-heading">{children}</h3>
	}
}

export function Overview({children}) {
	let kids = Array.isArray(children) ? children : [children]
	return (
		<div className="o-layout__overview">
			{kids.map(child => (
				<div className="o-layout-item">{child}</div>
			))}
		</div>
	)
}

export interface LayoutProps {
	header: JSX.Element | JSX.Element[]
	children: JSX.Element | JSX.Element[]
	footer: JSX.Element | JSX.Element[]
	bleed: boolean
}

export function Layout({header, footer, children, bleed}: LayoutProps) {
	let data = {
		"data-o-component": "o-layout",
	}
	return (
		<div
			className={"o-layout" + bleed ? ` o-layout--"bleed` : ""}
			data-o-component="o-layout"
			{...data}>
			<header className="o-layout__header">{header}</header>
			<main className="o-layout__main o-layout-typography">{children}</main>
			<footer className="o-layout__footer">{footer}</footer>
		</div>
	)
}

export interface DocumentationLayoutProps {
	header: JSX.Element | JSX.Element[]
	// false means no sidebar, undefined or true means auto-sidebar jsx means
	// sidebar is provided
	sidebar?: JSX.Element | JSX.Element[] | boolean
	children: JSX.Element | JSX.Element[]
	footer: JSX.Element | JSX.Element[]
}
export function DocumentationLayout({
	header,
	sidebar,
	footer,
	children,
}: DocumentationLayoutProps) {
	let data = {
		"data-o-component": "o-layout",
	}
	if (sidebar !== true && sidebar !== undefined) {
		data["data-o-layout-construct-nav"] = "false"
	}
	return (
		<div
			className="o-layout o-layout--docs"
			data-o-component="o-layout"
			{...data}>
			<header className="o-layout__header">{header}</header>
			{sidebar === false ? (
				""
			) : (
				<div className="o-layout__sidebar">
					{sidebar === true ? "" : sidebar}
				</div>
			)}
			<main className="o-layout__main o-layout-typography">{children}</main>
			<footer className="o-layout__footer">{footer}</footer>
		</div>
	)
}

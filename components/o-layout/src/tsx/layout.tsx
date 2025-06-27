import { Hero } from "./landingPartials";
type ChildrenType = React.JSX.Element | React.JSX.Element[];

type OverviewSectionItemProps = {
	content: ChildrenType;
	actionElement?: ChildrenType;
};

export type OverviewSectionsProps = {
	sections: OverviewSectionItemProps[];
	consistentColumns?: boolean;
};

export type HeroProps = {
	muted?: boolean;
	children?: ChildrenType;
};
export type ArticleListProps = {
	title: string;
	description: string;
	meta: ChildrenType;
	url: string;
};

type SharedLayoutProps = {
	header: ChildrenType;
	mainContent: ChildrenType;
	footer: ChildrenType;
};
interface DefaultLayoutProps extends SharedLayoutProps {
	bleed?: boolean;
}
interface DocsLayoutProps extends SharedLayoutProps {
	constructNav?: boolean;
	customNavHeadingSelector?: string;
	children?: ChildrenType;
}
interface LandingLayoutProps extends SharedLayoutProps {
	hero?: HeroProps;
	addTypographyStyling?: boolean;
}
interface QueryLayoutProps extends SharedLayoutProps {
	constructNav?: boolean;
	querySideBar: ChildrenType;
	queryHeading: ChildrenType;
	asideSideBar?: ChildrenType;
}

export function DefaultLayout({
	bleed,
	header,
	mainContent,
	footer,
}: DefaultLayoutProps) {
	const classNames = bleed ? "o-layout o-layout--bleed" : `o-layout`;
	return (
		<div className={classNames} data-o-component="o-layout">
			<Header>{header}</Header>
			<MainContent>{mainContent}</MainContent>
			<Footer>{footer}</Footer>
		</div>
	);
}

export function DocsLayout({
	header,
	mainContent,
	footer,
	constructNav = true,
	customNavHeadingSelector,
	children,
}: DocsLayoutProps) {
	const dataAttributes = {};
	if (customNavHeadingSelector) {
		dataAttributes["data-o-layout-nav-heading-selector"] =
			customNavHeadingSelector;
	}
	if (children) {
		dataAttributes["data-o-layout-construct-nav"] = "false";
	}
	return (
		<div
			className="o-layout o-layout--docs"
			data-o-component="o-layout"
			{...dataAttributes}
		>
			<Header>{header}</Header>
			{constructNav && <SideBar>{children}</SideBar>}
			<MainContent>{mainContent}</MainContent>
			<Footer>{footer}</Footer>
		</div>
	);
}

export function LandingLayout({
	header,
	mainContent,
	hero,
	footer,
	addTypographyStyling,
}: LandingLayoutProps) {
	return (
		<div className="o-layout o-layout--landing" data-o-component="o-layout">
			<Header>{header}</Header>
			{hero && <Hero muted={hero.muted}>{hero.children}</Hero>}
			<MainContent addTypographyStyling={addTypographyStyling}>
				{mainContent}
			</MainContent>
			<Footer>{footer}</Footer>
		</div>
	);
}
export function QueryLayout({
	header,
	queryHeading,
	querySideBar,
	mainContent,
	asideSideBar,
	footer,
	constructNav = false,
}: QueryLayoutProps) {
	const dataAttributes = {};
	if (constructNav) {
		dataAttributes["data-o-layout-construct-nav"] = "true";
	}
	return (
		<div
			className="o-layout o-layout--query"
			data-o-component="o-layout"
			{...dataAttributes}
		>
			<Header>{header}</Header>
			<QueryHeading>{queryHeading}</QueryHeading>
			<div className="o-layout__query-sidebar o-layout-typography">
				{querySideBar}
			</div>
			<MainContent>{mainContent}</MainContent>
			<div className="o-layout__aside-sidebar o-layout-typography">
				{asideSideBar}
			</div>
			<Footer>{footer}</Footer>
		</div>
	);
}

function Header({ children }: { children: ChildrenType }) {
	return <div className="o-layout__header">{children}</div>;
}

function MainContent({
	addTypographyStyling = true,
	children,
}: {
	addTypographyStyling?: boolean;
	children: ChildrenType;
}) {
	const classNames = addTypographyStyling
		? "o-layout__main o-layout-typography"
		: "o-layout__main";
	return <div className={classNames}>{children}</div>;
}

function Footer({ children }: { children: ChildrenType }) {
	return <div className="o-layout__footer">{children}</div>;
}

function SideBar({ children }: { children: ChildrenType }) {
	return (
		<div className="o-layout__sidebar">
			{children && <nav className="o-layout__navigation">{children}</nav>}
		</div>
	);
}

function QueryHeading({ children }: { children: ChildrenType }) {
	return (
		<div className="o-layout__heading o-layout-typography">{children}</div>
	);
}

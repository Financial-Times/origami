import { Hero } from "./landingPartials";
type ChildrenType = JSX.Element | JSX.Element[];

type SideBarProps = {
	customNavHeadingSelector?: string;
	customNavigation?: JSX.Element | JSX.Element[];
};

type OverviewSectionItemProps = {
	element: ChildrenType;
	actionElement?: ChildrenType;
};

export type OverviewSectionsProps = {
	sections: OverviewSectionItemProps[];
	hasAction?: boolean;
	consistentColumns?: boolean;
};

export type HeroProps = {
	heroContent?: ChildrenType;
	muted?: boolean;
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
};
interface DocsLayoutProps extends SharedLayoutProps {
	sidebar: SideBarProps;
}
interface LandingLayoutProps extends SharedLayoutProps {
	hero?: HeroProps;
	displayArticleList?: boolean;
}
interface QueryLayoutProps extends SharedLayoutProps {
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

export function DocsLayout({ header, mainContent, sidebar, footer }: DocsLayoutProps) {
	return (
		<div
			className="o-layout o-layout--docs"
			data-o-component="o-layout"
			data-o-layout-nav-heading-selector={sidebar?.customNavHeadingSelector}
			data-o-layout-construct-nav={sidebar?.customNavigation && "false"}
		>
			<Header>{header}</Header>
			<SideBar {...sidebar} />
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
	displayArticleList,
}: LandingLayoutProps) {
	return (
		<div className="o-layout o-layout--landing" data-o-component="o-layout">
			<Header>{header}</Header>
			{hero && <Hero {...hero}>{hero.heroContent}</Hero>}
			<MainContent displayArticleList={displayArticleList}>
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
}: QueryLayoutProps) {
	return (
		<div
			className="o-layout o-layout--query"
			data-o-component="o-layout"
			data-o-layout-construct-nav={querySideBar && "true"}
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
	displayArticleList,
	children,
}: {
	displayArticleList?: boolean;
	children: ChildrenType;
}) {
	const classNames = displayArticleList
		? "o-layout__main"
		: "o-layout__main o-layout-typography";
	return <div className={classNames}>{children}</div>;
}

function Footer({ children }: { children: ChildrenType }) {
	return <div className="o-layout__footer">{children}</div>;
}

function SideBar({ customNavigation }: SideBarProps) {
	return <div className="o-layout__sidebar">{customNavigation}</div>;
}

function QueryHeading({ children }: { children: ChildrenType }) {
	return (
		<div className="o-layout__heading o-layout-typography">{children}</div>
	);
}

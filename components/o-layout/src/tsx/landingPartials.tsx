import { HeroProps, OverviewSectionsProps, ArticleListProps } from "./layout";

export function Hero({ muted, children }: HeroProps) {
	const classNames = ["o-layout__hero o-layout-typography"];
	muted && classNames.push("o-layout__hero--muted");
	return <div className={classNames.join(" ")}>{children}</div>;
}

export function OverviewSections({
	sections,
	hasAction,
	consistentColumns,
}: OverviewSectionsProps) {
	const classNames = ["o-layout__overview"];
	hasAction && classNames.push("o-layout__overview--actions");
	consistentColumns &&
		classNames.push("o-layout__overview--consistent-columns");
	return (
		<div className={classNames.join(" ")}>
			{sections.map((el, i) => {
				return (
					<div className="o-layout-item" key={i}>
						<div className="o-layout-item__content">{el.element}</div>
						{el?.actionElement && (
							<div className="o-layout-item__footer">{el.actionElement}</div>
						)}
					</div>
				);
			})}
		</div>
	);
}

export function ArticleList({ articles }: { articles: ArticleListProps[] }) {
	return (
		<ul className="o-layout__listing">
			{articles.map((article, i) => {
				return (
					article.title && (
						<li className="o-layout__listing__item" key={i}>
							<h2 className="o-layout__listing__item__title">
								<a href={article.url}>{article.title}</a>
							</h2>
							<p className="o-layout__listing__item__description">
								{article.description}
							</p>
							<p className="o-layout__listing__item__meta">{article.meta}</p>
						</li>
					)
				);
			})}
		</ul>
	);
}

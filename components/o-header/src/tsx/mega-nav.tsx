import { TNavMeganav, TNavMenuItem } from "./Props";

export function MegaNav({
	meganav,
	index,
}: {
	meganav: TNavMeganav[];
	index?: number;
}) {
	const subsections = meganav.find(
		({ component }) => component === "sectionlist"
	);
	const articles = meganav.find(({ component }) => component === "articlelist");
	return (
		<div
			className="o-header__mega"
			id={"o-header-mega-" + index}
			role="group"
			aria-labelledby={"o-header-link-" + index}
			data-o-header-mega
		>
			<div className="o-header__container">
				<div className="o-header__mega-wrapper">
					{subsections && (
						<SubSections data={subsections.data} title={subsections.title} />
					)}
					{articles && (
						<TopStories data={articles.data} title={articles.title} />
					)}
				</div>
			</div>
		</div>
	);
}

function SubSections({
	data,
	title,
}: {
	data: TNavMenuItem[][] | TNavMenuItem[];
	title: string;
}) {
	return (
		<div className="o-header__mega-column o-header__mega-column--subsections">
			<div className="o-header__mega-heading">{title}</div>
			<div className="o-header__mega-content">
				<ul className="o-header__mega-list">
					{data.map(column =>
						column.map((item, index, selected) => {
							const { url, label } = item;
							const ariaLabel = selected ? label + ", current page" : undefined;
							const ariaCurrent = selected ? "page" : undefined;

							return (
								<li className="o-header__mega-item" key={`link-${index}`}>
									<a
										className="o-header__mega-link"
										href={url}
										aria-label={ariaLabel}
										aria-current={ariaCurrent}
									>
										{label}
									</a>
								</li>
							);
						})
					)}
				</ul>
			</div>
		</div>
	);
}

function TopStories({
	data,
	title,
}: {
	data: TNavMenuItem[] | TNavMenuItem[][];
	title: string;
}) {
	return (
		<div className="o-header__mega-column o-header__mega-column--articles">
			<div className="o-header__mega-heading">{title}</div>
			<div className="o-header__mega-content">
				<ul className="o-header__mega-list">
					{data.map((item, index) => {
						const { url, label, selected } = item;
						const ariaLabel = selected ? label + ", current page" : undefined;
						const ariaCurrent = selected ? "page" : undefined;
						return (
							<li className="o-header__mega-item" key={`link-${index}`}>
								<a
									className="o-header__mega-link"
									aria-label={ariaLabel}
									aria-current={ariaCurrent}
									href={url}
								>
									{label}
								</a>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}

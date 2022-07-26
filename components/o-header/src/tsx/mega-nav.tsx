import {NavMeganav, NavMenuItem} from './Props';

export function MegaNav({
	meganav,
	index,
	label,
}: {
	meganav: NavMeganav[];
	index?: number;
	label?: string;
}) {
	const subsections = meganav.find(
		({component}) => component === 'sectionlist'
	);
	const articles = meganav.find(({component}) => component === 'articlelist');
	return (
		<div
			className="o-header__mega"
			id={'o-header-mega-' + index}
			role="group"
			aria-labelledby={'o-header-link-' + index}
			data-o-header-mega
			data-trackable={`meganav | ${label}`}>
			<div className="o-header__container">
				<div className="o-header__mega-wrapper">
					<SubSections data={subsections.data} title={subsections.title} />
					<TopStories data={articles.data} title={articles.title} />
				</div>
			</div>
		</div>
	);
}

function SubSections({
	data,
	title,
}: {
	data: NavMenuItem[][] | NavMenuItem[];
	title: string;
}) {
	return (
		<div
			className="o-header__mega-column o-header__mega-column--subsections"
			data-trackable="sections">
			<div className="o-header__mega-heading">{title}</div>
			<div className="o-header__mega-content">
				<ul className="o-header__mega-list">
					{data.map(column =>
						column.map((item, index, selected) => {
							const {url, label} = item;
							const ariaLabel = selected ? label + ', current page' : undefined;
							const ariaCurrent = selected ? 'page' : undefined;

							return (
								<li className="o-header__mega-item" key={`link-${index}`}>
									<a
										className="o-header__mega-link"
										href={url}
										aria-label={ariaLabel}
										aria-current={ariaCurrent}
										data-trackable="link">
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
	data: NavMenuItem[] | NavMenuItem[][];
	title: string;
}) {
	return (
		<div
			className="o-header__mega-column o-header__mega-column--articles"
			data-trackable="popular">
			<div className="o-header__mega-heading">{title}</div>
			<div className="o-header__mega-content">
				<ul className="o-header__mega-list">
					{data.map((item, index) => {
						const {url, label, selected} = item;
						const ariaLabel = selected ? label + ', current page' : undefined;
						const ariaCurrent = selected ? 'page' : undefined;
						return (
							<li className="o-header__mega-item" key={`link-${index}`}>
								<a
									className="o-header__mega-link"
									aria-label={ariaLabel}
									aria-current={ariaCurrent}
									href={url}
									data-trackable="link">
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

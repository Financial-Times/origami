import { h } from '@financial-times/x-engine';

const renderLink = ({ id, type, title, url, relativeUrl }, i) => {
	const displayUrl = relativeUrl || url;
	return (
		<li
			key={`related-${i}`}
			data-content-id={id}
			className={`o-teaser__related-item o-teaser__related-item--${type}`}>
			<a data-trackable="related" href={displayUrl}>
				{title}
			</a>
		</li>
	);
}

export default ({ relatedLinks = [] }) => (
	relatedLinks && relatedLinks.length ? (
		<ul className="o-teaser__related">{relatedLinks.map(renderLink)}</ul>
	) : null
);

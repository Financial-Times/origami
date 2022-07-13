import { Link, RelatedLinks } from "./Props";

const renderLink = ({id, type, title, url, relativeUrl}: Link, i) => {
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
};

export default ({relatedLinks = []}: RelatedLinks) =>
	relatedLinks && relatedLinks.length ? (
		<ul className="o-teaser__related">{relatedLinks.map(renderLink)}</ul>
	) : null;

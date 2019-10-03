import { h } from '@financial-times/x-engine';

const renderLink = ({ id, relativeUrl, type, title }, i) => (
	<li
		key={`related-${i}`}
		data-content-id={id}
		className={`o-teaser__related-item o-teaser__related-item--${type}`}>
		<a data-trackable="related" href={relativeUrl}>
			{title}
		</a>
	</li>
);

export default ({ relatedLinks = [] }) => (
	relatedLinks && relatedLinks.length ? (
		<ul className="o-teaser__related">{relatedLinks.map(renderLink)}</ul>
	) : null
);

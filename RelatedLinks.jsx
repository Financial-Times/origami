import h from '@financial-times/x-engine';

const renderLink = ({ id, url, type, title }, i) => (
	<li
		key={`related-${i}`}
		data-content-id={id}
		className={`o-teaser__related-item o-teaser__related-item--${type}`}>
		<a data-trackable="related" href={url}>
			{title}
		</a>
	</li>
);

export default ({ relatedLinks = [] }) => (
	relatedLinks && relatedLinks.length ? (
		<ul className="o-teaser__related">{relatedLinks.map(renderLink)}</ul>
	) : null
);

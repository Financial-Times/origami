import h from '@financial-times/x-engine';

const inContext = (context = {}, id, label) => {
	if (id && context.parentId) {
		return id === context.parentId;
	}

	if (label && context.parentLabel) {
		return label === context.parentLabel;
	}
};

export default ({ metaPrefixText, metaLink, metaAltLink, metaSuffixText, context }) => {
	const showPrefixText = metaPrefixText && !inContext(context, null, metaPrefixText);
	const showSuffixText = metaSuffixText && !inContext(context, null, metaSuffixText);
	const showAltLink = metaLink && inContext(context, metaLink.id, metaLink.prefLabel);
	const displayLink = showAltLink ? metaAltLink : metaLink;

	return (
		<div className="o-teaser__meta-concept">
			{showPrefixText ? <span className="o-teaser__tag-prefix">{metaPrefixText}</span> : null}
			{displayLink ? (
				<a
					className="o-teaser__tag"
					data-trackable="teaser-concept"
					href={displayLink.relativeUrl || displayLink.url}>
					{` ${displayLink.prefLabel} `}
				</a>
			) : null}
			{showSuffixText ? <span className="o-teaser__tag-suffix">{metaSuffixText}</span> : null}
		</div>
	);
};

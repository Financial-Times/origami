import { h } from '@financial-times/x-engine';

const sameId = (context = {}, id) => {
	return id && context && context.parentId && id === context.parentId;
};

const sameLabel = (context = {}, label) => {
	return label && context && context.parentLabel && label === context.parentLabel;
};

export default ({ metaPrefixText, metaLink, metaAltLink, metaSuffixText, context }) => {
	const showPrefixText = metaPrefixText && !sameLabel(context, metaPrefixText);
	const showSuffixText = metaSuffixText && !sameLabel(context, metaSuffixText);
	const linkId = metaLink && metaLink.id;
	const linkLabel = metaLink && metaLink.prefLabel;
	const useAltLink = sameId(context, linkId) || sameLabel(context, linkLabel);
	const displayLink = useAltLink ? metaAltLink : metaLink;

	return (
		<div className="o-teaser__meta">
			{showPrefixText ? <span className="o-teaser__tag-prefix">{metaPrefixText}</span> : null}
			{displayLink ? (
				<a
					className="o-teaser__tag"
					data-trackable="teaser-tag"
					href={displayLink.relativeUrl || displayLink.url}
					aria-label={`Category: ${displayLink.prefLabel}`}>
					{displayLink.prefLabel}
				</a>
			) : null}
			{showSuffixText ? <span className="o-teaser__tag-suffix">{metaSuffixText}</span> : null}
		</div>
	);
};

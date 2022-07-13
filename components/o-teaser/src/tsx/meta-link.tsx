import {Meta} from './props';

const sameId = (context: Context | undefined, id: string | undefined) => {
	return id && context && context.parentId && id === context.parentId;
};

const sameLabel = (context: Context | undefined, label: string | undefined) => {
	return (
		label && context && context.parentLabel && label === context.parentLabel
	);
};

// not sure if context prop is ever passed down teaser props.
// and it does not exist in type definitions either.
type Context = {
	parentId?: string;
	parentLabel?: string;
};

interface MetaLinkProps extends Meta {
	context?: Context;
	// metaAltLink?: MetaLink;
}
type DisplayLink = {
	relativeUrl?: string;
	url?: string;
	prefLabel?: string;
}
export default ({
	metaPrefixText,
	metaLink,
	metaAltLink,
	metaSuffixText,
	context,
}: MetaLinkProps) => {
	const showPrefixText = metaPrefixText && !sameLabel(context, metaPrefixText);
	const showSuffixText = metaSuffixText && !sameLabel(context, metaSuffixText);
	const linkId = metaLink && metaLink.id;
	const linkLabel = metaLink && metaLink.prefLabel;
	const useAltLink = sameId(context, linkId) || sameLabel(context, linkLabel);
	const displayLink = useAltLink ? metaAltLink : metaLink;

	return (
		<div className="o-teaser__meta">
			{showPrefixText ? (
				<span className="o-teaser__tag-prefix">{metaPrefixText}</span>
			) : null}
			{displayLink ? (
				<a
					className="o-teaser__tag"
					data-trackable="teaser-tag"
					href={displayLink.relativeUrl || displayLink.url}
					aria-label={`Category: ${displayLink.prefLabel}`}>
					{displayLink.prefLabel}
				</a>
			) : null}
			{showSuffixText ? (
				<span className="o-teaser__tag-suffix">{metaSuffixText}</span>
			) : null}
		</div>
	);
};

import {PromotedProps, MetaLinkProps, MetaProps, Context} from './prop-types';

export function Meta(props: MetaProps) {
	const showPromoted = props.promotedPrefixText && props.promotedSuffixText;
	return showPromoted ? <Promoted {...props} /> : <MetaLink {...props} />;
}

function Promoted({promotedPrefixText, promotedSuffixText}: PromotedProps) {
	return (
		<div className="o-teaser__meta">
			<span className="o-teaser__promoted-prefix">{promotedPrefixText}</span> by
			<span className="o-teaser__promoted-by">{` ${promotedSuffixText} `}</span>
		</div>
	);
}

function MetaLink({
	metaPrefixText,
	metaLink,
	metaAltLink,
	metaSuffixText,
	headlineTesting,
	parentId,
	parentLabel,
}: MetaLinkProps) {
	const context = {
		headlineTesting,
		parentId,
		parentLabel,
	};
	const showPrefixText = metaPrefixText && !sameLabel(context, metaPrefixText);
	const showSuffixText = metaSuffixText && !sameLabel(context, metaSuffixText);
	const linkId = metaLink && metaLink.id;
	const linkLabel = metaLink && metaLink.prefLabel;
	const useAltLink = sameId(context, linkId) || sameLabel(context, linkLabel);
	const displayLink = useAltLink ? metaAltLink : metaLink;

	return (
		<div className="o-teaser__meta">
			{showPrefixText && (
				<span className="o-teaser__tag-prefix">{metaPrefixText}</span>
			)}
			{displayLink && (
				<a
					className="o-teaser__tag"
					data-trackable="teaser-tag"
					href={displayLink.relativeUrl || displayLink.url}
					aria-label={`Category: ${displayLink.prefLabel}`}>
					{displayLink.prefLabel}
				</a>
			)}
			{showSuffixText && (
				<span className="o-teaser__tag-suffix">{metaSuffixText}</span>
			)}
		</div>
	);
}

const sameId = (context: Context, id: string | undefined) => {
	return id && context && context.parentId && id === context.parentId;
};

const sameLabel = (context: Context, label: string | undefined) => {
	return (
		label && context && context.parentLabel && label === context.parentLabel
	);
};

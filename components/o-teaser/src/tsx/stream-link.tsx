import {Meta} from './props';

const sameLabel = (context: Context | undefined, label: string | undefined) => {
	return (
		label && context && context.parentLabel && label === context.parentLabel
	);
};

type Context = {
	parentLabel?: string;
};

interface StreamLinkProps extends Meta {
	metaSuffixText?: string;
	context?: Context;
}

const getDisplayLink = (
	streamLinks: [string, string][],
	context: Context | undefined
): [string, string] | undefined => {
	if (!Array.isArray(streamLinks) || streamLinks.length === 0) {
		return undefined;
	}

	const firstOptionLabel = streamLinks[0]?.at(0);
	const shouldUseAltLink = sameLabel(context, firstOptionLabel);

	const link = shouldUseAltLink && streamLinks.length > 1 ? streamLinks[1] : streamLinks[0];

	// Validate both elements exist and are non-empty
	// link[0]: label, link[1]: url
	if (link && link[0] && link[1]) {
		return link;
	}

	return undefined;
};

export default ({
	streamLinks = [],
	metaSuffixText,
	context,
}: StreamLinkProps) => {
	const showSuffixText = metaSuffixText && !sameLabel(context, metaSuffixText);
	const displayLink = getDisplayLink(streamLinks, context);

	return (
		<div className="o-teaser__meta">
			{displayLink && (
				<a
					className="o-teaser__stream-link"
					data-trackable="teaser-tag"
					href={displayLink[1]}
					aria-label={`Category: ${displayLink[0]}`}>
					{displayLink[0]}
				</a>
			)}
			{showSuffixText && (
				<span className="o-teaser__tag-suffix">{metaSuffixText}</span>
			)}
		</div>
	);
};

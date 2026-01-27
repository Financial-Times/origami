import Link from './link';
import {Title, General} from './props';

interface TitleProps extends Title, General {
	headlineTesting?: boolean;
	showTitlePrefix?: boolean;
	showStreamLink?: boolean;
	streamLinks?: [string, string][];
}
export default ({
	title,
	altTitle,
	showTitlePrefix,
	showStreamLink,
	titlePrefix,
	streamLinks,
	headlineTesting,
	relativeUrl,
	url,
	indicators,
	...props
}: TitleProps) => {
	const displayTitle = headlineTesting && altTitle ? altTitle : title;
	const displayUrl = relativeUrl || url;

	// The `streamLinks` and `titlePrefix` logic are tied together.
	// If the `showStreamLink` is falsy and `streamLinks` property does not exist,
	// it falls back to the legacy metaLink component.
	// Therefore, displaying `titlePrefix` must take `showStreamLink` & `streamLinks` into account.
	const displayTitleWithPrefix = showStreamLink && streamLinks && showTitlePrefix && titlePrefix &&
		(<>
			<span className="o-teaser__heading-prefix">
				{`${titlePrefix}. `}
			</span>
			{displayTitle}
		</>);

	// o-labels--premium left for backwards compatibility for o-labels v3
	const premiumClass = 'o-labels o-labels--premium o-labels--content-premium';
	let ariaLabel;
	if (props.type === 'video') {
		ariaLabel = `Watch video ${displayTitle}`;
	} else if (props.type === 'audio') {
		ariaLabel = `Listen to podcast ${displayTitle}`;
	}

	return (
		<div className="o-teaser__heading">
			<Link
				{...props}
				url={displayUrl}
				attrs={{
					'data-trackable': 'heading-link',
					className: 'js-teaser-heading-link',
					'aria-label': ariaLabel,
				}}>
				{displayTitleWithPrefix ? displayTitleWithPrefix : displayTitle}
			</Link>
			{indicators && indicators.accessLevel === 'premium' ? (
				<span>
					{' '}
					<span className={premiumClass}>Premium</span>
					<span className="o-teaser__visually-hidden">&nbsp;content</span>
				</span>
			) : null}
		</div>
	);
};

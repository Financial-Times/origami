import {Link} from './link';
import {TitleProps} from './prop-types';

export function Title({
	title,
	altTitle,
	relativeUrl,
	url,
	indicators,
	type,
}: TitleProps) {
	const displayTitle = altTitle ? altTitle : title;
	const displayUrl = relativeUrl || url;
	// o-labels--premium left for backwards compatibility for o-labels v3
	const premiumClass = 'o-labels o-labels--premium o-labels--content-premium';
	let ariaLabel;
	if (type === 'video') {
		ariaLabel = `Watch video ${displayTitle}`;
	} else if (type === 'audio') {
		ariaLabel = `Listen to podcast ${displayTitle}`;
	}

	return (
		<div className="o-teaser__heading">
			<Link
				url={displayUrl}
				attrs={{
					'data-trackable': 'heading-link',
					className: 'js-teaser-heading-link',
					'aria-label': ariaLabel,
				}}>
				{displayTitle}
			</Link>
			{indicators?.accessLevel === 'premium' && (
				<span>
					{' '}
					<span className={premiumClass}>Premium</span>
					<span className="o-normalise-visually-hidden">&nbsp;content</span>
				</span>
			)}
		</div>
	);
}

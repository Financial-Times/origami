import { h } from '@financial-times/x-engine';
import Link from './Link';

export default ({ title, altTitle, headlineTesting, relativeUrl, url, indicators, ...props }) => {
	const displayTitle = headlineTesting && altTitle ? altTitle : title;
	const displayUrl = relativeUrl || url;
	// o-labels--premium left for backwards compatibility for o-labels v3
	const premiumClass = 'o-labels o-labels--premium o-labels--content-premium';

	return (
		<div className="o-teaser__heading">
			<Link {...props} url={displayUrl} attrs={{
				'data-trackable': 'heading-link',
				className: 'js-teaser-heading-link',
			}}>
				{displayTitle}
			</Link>
			{indicators && indicators.accessLevel === 'premium' ? (
				<span className={premiumClass} aria-label="Premium content">
					Premium
				</span>
			) : null}
		</div>
	);
};

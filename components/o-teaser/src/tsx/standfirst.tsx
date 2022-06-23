import {Link} from './link';

export function Standfirst ({
	standfirst,
	altStandfirst,
	relativeUrl,
	url,
	...props
}) {
	const displayStandfirst = altStandfirst ? altStandfirst : standfirst;
	const displayUrl = relativeUrl || url;
	return displayStandfirst ? (
		<p className="o-teaser__standfirst">
			<Link
				{...props}
				url={displayUrl}
				attrs={{
					'data-trackable': 'standfirst-link',
					tabIndex: -1,
					className: 'js-teaser-standfirst-link',
				}}>
				{displayStandfirst}
			</Link>
		</p>
	) : null;
};

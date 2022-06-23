import {Link} from './link';
import {StandfirstProps} from './prop-types';

export function Standfirst({
	standfirst,
	altStandfirst,
	relativeUrl,
	url,
}: StandfirstProps) {
	const displayStandfirst = altStandfirst ? altStandfirst : standfirst;
	const displayUrl = relativeUrl || url;
	return displayStandfirst ? (
		<p className="o-teaser__standfirst">
			<Link
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
}

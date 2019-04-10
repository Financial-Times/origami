import { h } from '@financial-times/x-engine';
import Link from './Link';


export default ({ standfirst, altStandfirst, headlineTesting, relativeUrl, url, ...props }) => {
	const displayStandfirst = headlineTesting && altStandfirst ? altStandfirst : standfirst;
	const displayUrl = relativeUrl || url;
	return displayStandfirst ?
	<p className="o-teaser__standfirst">
		<Link {...props} url={displayUrl} attrs={{
				'data-trackable': 'standfirst-link',
				tabIndex:-1,
				className: 'js-teaser-standfirst-link',
		}}>
			{displayStandfirst}
		</Link>
	</p>
	: null;
};

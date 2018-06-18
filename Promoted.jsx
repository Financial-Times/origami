import { h } from '@financial-times/x-engine';

export default ({ promotedPrefix, promotedSuffix }) => (
	<div className="o-teaser__meta-promoted">
		<span className="o-teaser__promoted-prefix">{promotedPrefix}</span>
		<span className="o-teaser__promoted-by">{` ${promotedSuffix} `}</span>
	</div>
);

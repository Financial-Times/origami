import { h } from '@financial-times/x-engine';

export default ({ promotedPrefixText, promotedSuffixText }) => (
	<div className="o-teaser__meta">
		<span className="o-teaser__promoted-prefix">{promotedPrefixText}</span>
		<span className="o-teaser__promoted-by">{` ${promotedSuffixText} `}</span>
	</div>
);

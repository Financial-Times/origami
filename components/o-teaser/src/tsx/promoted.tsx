export default ({
	promotedPrefixText,
	promotedSuffixText,
}: {
	promotedPrefixText?: string;
	promotedSuffixText?: string;
}) => (
	<div className="o-teaser__meta">
		<span className="o-teaser__promoted-prefix">{promotedPrefixText}</span> by
		<span className="o-teaser__promoted-by">{` ${promotedSuffixText} `}</span>
	</div>
);

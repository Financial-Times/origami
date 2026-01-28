import MetaLink from './meta-link';
import StreamLink from './stream-link';
import Promoted from './promoted';
import { Meta } from './props';

interface MetaProps extends Meta {
	showStreamLink?: boolean;
}

export default (props: MetaProps) => {
	const showPromoted = props.promotedPrefixText && props.promotedSuffixText;

	if (showPromoted) {
		return <Promoted {...props} />
	}

	// MetaLink is a legacy Element, when showStreamLink and streamLinks are provided, we should render StreamLink instead.
	// However old content could not been migrated to the new content model right away, so we need to keep the both logic legacy and new for now.
	// StreamLinks logic is different from MetaLink, for example, opinion teaser metalinks doesn't include author names any more as the link etc.
	if (props.showStreamLink && props.streamLinks) {
		return <StreamLink {...props} />;
	}

	return <MetaLink {...props} />;
};

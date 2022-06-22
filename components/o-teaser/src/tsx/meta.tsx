import MetaLink from './meta-link';
import Promoted from './promoted';

export default props => {
	const showPromoted = props.promotedPrefixText && props.promotedSuffixText;

	return showPromoted ? <Promoted {...props} /> : <MetaLink {...props} />;
};

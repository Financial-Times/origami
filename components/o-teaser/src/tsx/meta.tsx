import MetaLink from "./meta-link";
import Promoted from "./promoted";
import { Meta } from "./props";

export default (props: Meta) => {
	const showPromoted = props.promotedPrefixText && props.promotedSuffixText;

	return showPromoted ? <Promoted {...props} /> : <MetaLink {...props} />;
};

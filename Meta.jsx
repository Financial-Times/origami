import h from '@financial-times/x-engine';
import Concept from './Concept';
import Promoted from './Promoted';

export default (props) => {
	const showPromoted = props.promotedPrefix && props.promotedSuffix;

	return (
		<div className="o-teaser__meta">
			{showPromoted ? <Promoted {...props} /> : <Concept {...props} />}
		</div>
	);
};

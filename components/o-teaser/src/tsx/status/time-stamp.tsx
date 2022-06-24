import {Date as ODate} from '../../../../o-date/src/tsx/date';
import { formatTimeToIsoString } from './status';
export default ({publishedDate}) => {
	return (
		<div className="o-teaser__timestamp">
			<ODate
				dateTime={formatTimeToIsoString(publishedDate)}
				format="date-only"
				className=" o-date"
			/>
		</div>
	);
};



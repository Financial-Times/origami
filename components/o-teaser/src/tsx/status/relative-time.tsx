import {isRecent, getRelativeDate, getStatus} from '../concerns/date-time';
import {Date as ODate} from '../../../../o-date/src/tsx/date';
import {formatTimeToIsoString} from './status';
export default ({publishedDate, firstPublishedDate, showAlways = false}) => {
	const relativeDate = getRelativeDate(publishedDate);
	const status = getStatus(publishedDate, firstPublishedDate);
	const dateTimeFormat = showAlways
		? 'time-ago-limit-24-hours'
		: 'time-ago-limit-4-hours';

	return showAlways === true || isRecent(relativeDate) ? (
		<div className={`o-teaser__timestamp o-teaser__timestamp--${status}`}>
			{status ? (
				<span className="o-teaser__timestamp-prefix">{` ${status} `} </span>
			) : null}
			<ODate
				dateTime={formatTimeToIsoString(publishedDate)}
				format={dateTimeFormat}
				className="o-teaser__timestamp-date o-date"
			/>
		</div>
	) : null;
};

import {isRecent, getRelativeDate, getStatus} from '../concerns/date-time';
import {Date as ODate} from '../../../../o-date/src/tsx/date';

const displayTime = date => {
	const hours = Math.floor(Math.abs(date / 3600000));
	const plural = hours === 1 ? 'hour' : 'hours';
	const suffix = hours === 0 ? '' : `${plural} ago`;

	return `${hours} ${suffix}`;
};

export default ({publishedDate, firstPublishedDate, showAlways = false}) => {
	const relativeDate = getRelativeDate(publishedDate);
	const status = getStatus(publishedDate, firstPublishedDate);
	const dateTimeFormat = showAlways
		? 'time-ago-limit-24-hours'
		: 'time-ago-limit-4-hours';
	console.log({
		publishedDate,
		firstPublishedDate,
		showAlways,
		status,
		relativeDate,
	});
	const dateToDisplay = status ? '' : displayTime(relativeDate);
	return showAlways === true || isRecent(relativeDate) ? (
		<div className={`o-teaser__timestamp o-teaser__timestamp--${status}`}>
			{status ? (
				<span className="o-teaser__timestamp-prefix">{` ${status} `} </span>
			) : null}
			{/* <ODate
				dateTime={publishedDate}
				format={dateTimeFormat}
				className="o-teaser__timestamp-date o-date"
			/> */}
		</div>
	) : null;
};

{
	/* <time
				className="o-teaser__timestamp-date o-date"
				data-o-component="o-date"
				data-o-date-format={
					showAlways ? 'time-ago-limit-24-hours' : 'time-ago-limit-4-hours'
				}
				dateTime={dateformat(
					publishedDate,
					dateformat.masks.isoDateTime,
					true
				)}> */
}
{
	/* Let o-date handle anything < 1 hour on the client */
}
{
	/* {status ? '' : displayTime(relativeDate)} */
}
// </time>

import TimeStamp from './time-stamp';
import RelativeTime from './relative-time';
import LiveBlogStatus from './live-blog-status';
import {StatusProps} from '../prop-types';
import {toDate} from '../concerns/date-time';

export function Status({
	status,
	publishedDate,
	useRelativeTime,
	firstPublishedDate,
}: StatusProps) {
	if (status) {
		return <LiveBlogStatus status={status} />;
	}
	console.log({
		a: isToday(publishedDate),
		useRelativeTime,
	});
	if (publishedDate) {
		if (isToday(publishedDate) || useRelativeTime) {
			return (
				<RelativeTime
					publishedDate={publishedDate}
					firstPublishedDate={firstPublishedDate}
					showAlways={true}
				/>
			);
		} else {
			return <TimeStamp publishedDate={publishedDate} />;
		}
	}

	return null;
}

/**
 * Timestamp shown always, the default 4h limit does not apply here
 * If same calendar day, we show relative time e.g. X hours ago or Updated X min ago
 * If different calendar day, we show full Date time e.g. June 9, 2021
 */
function isToday(date) {
	const today = new Date();
	const dateToCompare = toDate(date);
	if (today.toDateString() == dateToCompare.toDateString()) {
		return true;
	}
	return false;
}

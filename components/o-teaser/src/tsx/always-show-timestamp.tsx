import TimeStamp from './time-stamp';
import RelativeTime from './relative-time';
import { differenceInCalendarDays, parseISO } from 'date-fns';
import { Status } from './props';

/**
 * Timestamp shown always, the default 4h limit does not apply here
 * If same calendar day, we show relative time e.g. X hours ago or Updated X min ago
 * If different calendar day, we show full Date time e.g. June 9, 2021
 */
export default (props: Status) => {
	const {
		publishedDate,
	} = props

	const daysAgo = differenceInCalendarDays(
		new Date(),
		typeof publishedDate === 'string' ? parseISO(publishedDate) : publishedDate
	)

	const oneOrMoreDaysAgo = daysAgo >= 1;

	if (oneOrMoreDaysAgo) {
		return <TimeStamp {...props} />;
	}

	return <RelativeTime {...props} showAlways={true} />;
};

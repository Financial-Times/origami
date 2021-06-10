import { h } from '@financial-times/x-engine'
import TimeStamp from './TimeStamp'
import RelativeTime from './RelativeTime'
import { differenceInCalendarDays } from 'date-fns'
import { getDateOnly } from '../../x-teaser-timeline/src/lib/date'

/**
 * Timestamp shown always, the default 4h limit does not apply here
 * If same calendar day, we show relative time e.g. X hours ago or Updated X min ago
 * If different calendar day, we show full Date time e.g. June 9, 2021
 */
export default (props) => {
	const localTodayDate = getDateOnly(new Date().toISOString())
	const dateToCompare = getDateOnly(new Date(props.publishedDate).toISOString())

	if (differenceInCalendarDays(localTodayDate, dateToCompare) >= 1) {
		return <TimeStamp {...props} />
	} else {
		return <RelativeTime {...props} override4hLimit={true} />
	}
}

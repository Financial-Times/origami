import { h } from '@financial-times/x-engine'
import { isRecent, getRelativeDate, getStatus } from './concerns/date-time'
import dateformat from 'dateformat'

/**
 * Display Time
 * @param {Number} date
 * @returns {String}
 */
const displayTime = (date) => {
	const hours = Math.floor(Math.abs(date / 3600000))
	const plural = hours === 1 ? 'hour' : 'hours'
	const suffix = hours === 0 ? '' : `${plural} ago`

	return `${hours} ${suffix}`
}

export default ({ publishedDate, firstPublishedDate, showAlways = false }) => {
	const relativeDate = getRelativeDate(publishedDate)
	const status = getStatus(publishedDate, firstPublishedDate)

	return showAlways === true || isRecent(relativeDate) ? (
		<div className={`o-teaser__timestamp o-teaser__timestamp--${status}`}>
			{status ? <span className="o-teaser__timestamp-prefix">{`${status} `} </span> : null}
			<time
				className="o-teaser__timestamp-date o-date"
				data-o-component="o-date"
				data-o-date-format={showAlways ? null : 'time-ago-limit-4-hours'}
				dateTime={dateformat(publishedDate, dateformat.masks.isoDateTime, true)}>
				{/* Let o-date handle anything < 1 hour on the client */}
				{status ? '' : displayTime(relativeDate)}
			</time>
		</div>
	) : null
}

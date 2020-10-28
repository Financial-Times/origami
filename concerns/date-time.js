import { Newish, Recent } from './constants'

/**
 * To Date
 * @param {Date | String | Number} date
 * @returns {Date}
 */
export function toDate(date) {
	if (typeof date === 'string') {
		return new Date(date)
	}

	if (typeof date === 'number') {
		return new Date(date)
	}

	return date
}

/**
 * Get Relative Date
 * @param {Date | String | Number} date
 * @returns {Number}
 */
export function getRelativeDate(date) {
	return Date.now() - toDate(date).getTime()
}

/**
 * Get Status
 * @param {Date | String | Number} publishedDate
 * @param {Date | String | Number} firstPublishedDate
 * @returns {String}
 */
export function getStatus(publishedDate, firstPublishedDate) {
	if (getRelativeDate(publishedDate) < Newish) {
		if (publishedDate === firstPublishedDate) {
			return 'new'
		} else {
			return 'updated'
		}
	}

	return ''
}

/**
 * Is Recent
 * @param {Number} relativeDate
 * @returns {Boolean}
 */
export function isRecent(relativeDate) {
	return relativeDate < Recent
}

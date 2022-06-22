import {Newish, Recent} from './constants';

type DateTimeType = Date | String | Number;

export function toDate(date: DateTimeType): DateTimeType {
	if (typeof date === 'string') {
		return new Date(date);
	}

	if (typeof date === 'number') {
		return new Date(date);
	}

	return date;
}

export function getRelativeDate(date: DateTimeType): DateTimeType {
	return Date.now() - toDate(date).getTime();
}

export function getStatus(
	publishedDate: DateTimeType,
	firstPublishedDate: DateTimeType
): string {
	if (getRelativeDate(publishedDate) < Newish) {
		if (publishedDate === firstPublishedDate) {
			return 'new';
		} else {
			return 'updated';
		}
	}

	return '';
}

export function isRecent(relativeDate: number): boolean {
	return relativeDate < Recent;
}

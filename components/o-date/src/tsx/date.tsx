import js from '../../main'
import { useEffect } from 'react';
export type DateFormat =
	| 'today-or-yesterday-or-nothing'
	| 'date-only'
	| 'time-ago-limit-4-hours'
	| 'time-ago-limit-24-hours'
	| 'time-ago-abbreviated'
	| 'time-ago-abbreviated-limit-4-hours'
	| 'time-ago-no-seconds'
	// hack to allow any string (for custom date formatting) while still
	// suggesting the common format variants in IDEs
	// from https://github.com/microsoft/TypeScript/issues/29729#issuecomment-505826972
	| (string & {});

export interface DateProps {
	dateTime: string;
	format?: DateFormat;
	className?: string;
}

export function Date({
	dateTime,
	format,
	className="o-date",
	children,
}: React.PropsWithChildren<DateProps>): JSX.Element {
	useEffect(() => {
		let dates = js.init();
		return function cleanup() {
			dates = Array.isArray(dates) ? dates : [dates];
			dates.forEach(date => date.destroy());
		};
	});
	return (
		<time
			data-o-component="o-date"
			className={className}
			dateTime={dateTime}
			data-o-date-format={format}>
			{children}
		</time>
	);
}

export interface DatePrinterProps {
	format?: DateFormat;
}

export function DatePrinter({
	format,
	children,
}: React.PropsWithChildren<DatePrinterProps>): JSX.Element {
	return (
		<span data-o-date-printer data-o-date-format={format}>
			{children}
		</span>
	);
}

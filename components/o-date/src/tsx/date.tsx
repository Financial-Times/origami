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
}

export function Date({
	dateTime,
	format,
	children,
}: React.PropsWithChildren<DateProps>): JSX.Element {
	return (
		<time
			data-o-component="o-date"
			className="o-date"
			dateTime={dateTime}
			data-o-date-format={format}>
			{children}
		</time>
	);
}

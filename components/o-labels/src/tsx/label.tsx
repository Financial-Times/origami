import {Date as ODate, DateProps} from '@financial-times/o-date/src/tsx/date';

export type Brand = 'core' | 'internal' | 'whitelabel';

export interface BrandStates {
	core: 'content-commercial' | 'content-premium' | 'lifecycle-beta';
	internal:
		| 'support-active'
		| 'support-dead'
		| 'support-deprecated'
		| 'support-experimental'
		| 'support-maintained'
		| 'tier-bronze'
		| 'tier-gold'
		| 'tier-platinum'
		| 'tier-silver'
		| 'oxford'
		| 'teal'
		| 'lemon'
		| 'slate'
		| 'jade'
		| 'crimson'
		| 'mandarin';
	whitelabel: never;
}

export interface LabelProps<B extends Brand> {
	size?: 'small' | 'big';
	state?: BrandStates[B];
	text: string;
}

export function Label<B extends Brand>({
	size,
	state,
	text,
}: LabelProps<B>): JSX.Element {
	const classNames = ['o-labels'];
	if (size) {
		classNames.push(`o-labels--${size}`);
	}
	if (state) {
		classNames.push(`o-labels--${state}`);
	}
	return <span className={classNames.join(' ')}>{text}</span>;
}

export interface IndicatorLabelProps {
	indicator: 'live' | 'closed' | 'new' | 'updated';
	status: string;
	timestamp?: DateProps;
	inverse?: boolean;
}

export function IndicatorLabel({
	indicator,
	status,
	timestamp,
	inverse,
}: IndicatorLabelProps): JSX.Element {
	const classNames = ['o-labels-indicator', `o-labels-indicator--${indicator}`];
	if (inverse) {
		classNames.push('o-labels-indicator--inverse');
	}
	return (
		<span className={classNames.join(' ')}>
			<span className="o-labels-indicator__status">{status}</span>
			{timestamp && (
				<time className="o-labels-indicator__timestamp">
					<time {...timestamp}></time>
				</time>
			)}
		</span>
	);
}

export interface TimestampLabelProps extends DateProps {
	inverse?: boolean;
}

export function TimestampLabel({
	inverse,
	...props
}: TimestampLabelProps): JSX.Element {
	const classNames = ['o-labels-timestamp'];
	if (inverse) {
		classNames.push('o-labels-timestamp--inverse');
	}
	return (
		<time className={classNames.join(' ')}>
			<ODate {...props} />
		</time>
	);
}

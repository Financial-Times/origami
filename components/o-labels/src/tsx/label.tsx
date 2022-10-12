export interface BaseProps {
	size?: 'small' | 'big';
	children: string;
}
export interface SupportStatusProps extends BaseProps {
	state:
		| 'support-active'
		| 'support-dead'
		| 'support-deprecated'
		| 'support-experimental'
		| 'support-maintained'
}
export interface ServiceTierProps extends BaseProps {
	state:
		| 'tier-bronze'
		| 'tier-gold'
		| 'tier-platinum'
		| 'tier-silver'
}
export interface ColourPalletProps extends BaseProps {
	state:
		| 'oxford'
		| 'teal'
		| 'lemon'
		| 'slate'
		| 'jade'
		| 'crimson'
		| 'mandarin'
}
export interface ContentProps extends BaseProps {
	state:
		| 'content-commercial'
		| 'content-premium'
}
export interface LifeCycleProps extends BaseProps {
	state:
		| 'lifecycle-beta'
}

function SimpleLabel({
	size,
	state,
	children,
}: {size?: string, state?: string, children: string}): JSX.Element {
	const classNames = ['o-labels'];
	if (size) {
		classNames.push(`o-labels--${size}`);
	}
	if (state) {
		classNames.push(`o-labels--${state}`);
	}
	return <span className={classNames.join(' ')}>{children}</span>;
}

export function Base(props: BaseProps): JSX.Element {
	return SimpleLabel(props)
}

export function SupportStatus(props: SupportStatusProps): JSX.Element {
	return SimpleLabel(props)
}
export function ServiceTier(props: ServiceTierProps): JSX.Element {
	return SimpleLabel(props)
}
export function ColourPallet(props: ColourPalletProps): JSX.Element {
	return SimpleLabel(props)
}
export function Content(props: ContentProps): JSX.Element {
	return SimpleLabel(props)
}
export function LifeCycle(props: LifeCycleProps): JSX.Element {
	return SimpleLabel(props)
}

export interface IndicatorProps {
	indicator: 'live' | 'closed' | 'new' | 'updated';
	status?: string;
	inverse?: boolean;
	timestamp?: JSX.Element | JSX.Element[];
}

export function IndicatorLabel({
	indicator,
	status,
	inverse,
	timestamp,
}: IndicatorProps): JSX.Element {
	const classNames = ['o-labels-indicator', `o-labels-indicator--${indicator}`];
	if (inverse) {
		classNames.push('o-labels-indicator--inverse');
	}
	return (
		<span className={classNames.join(' ')}>
			<span className="o-labels-indicator__status"> {status || indicator} </span>
			{timestamp && (
				<span className="o-labels-indicator__timestamp">
					{timestamp}
				</span>
			)}
		</span>
	);
}

export interface TimestampProps {
	inverse?: boolean;
	children?: JSX.Element | JSX.Element[]
}

export function TimestampLabel({inverse, children}: TimestampProps): JSX.Element {
	const classNames = ['o-labels-timestamp'];
	if (inverse) {
		classNames.push('o-labels-timestamp--inverse');
	}
	return (
		<span className={classNames.join(' ')}>
			{children}
		</span>
	);
}

export interface BaseLabelProps {
	size?: 'small' | 'big';
	children: string;
	state?: string;
}
export interface SupportLabelProps extends BaseLabelProps {
	state:
		| 'support-active'
		| 'support-dead'
		| 'support-deprecated'
		| 'support-experimental'
		| 'support-maintained'
}
export interface ServiceLabelProps extends BaseLabelProps {
	state:
		| 'tier-bronze'
		| 'tier-gold'
		| 'tier-platinum'
		| 'tier-silver'
}
export interface ColourLabelProps extends BaseLabelProps {
	state:
		| 'oxford'
		| 'teal'
		| 'lemon'
		| 'slate'
		| 'jade'
		| 'crimson'
		| 'mandarin'
}
export interface ContentLabelProps extends BaseLabelProps {
	state:
		| 'content-commercial'
		| 'content-premium'
		| 'content-scoop'
}
export interface LifeCycleLabelProps extends BaseLabelProps {
	state:
		| 'lifecycle-beta'
}

function SimpleLabel({
	size,
	state,
	children,
}: {size?: string, state?: string, children: string}): React.JSX.Element {
	const classNames = ['o-labels'];
	if (size) {
		classNames.push(`o-labels--${size}`);
	}
	if (state) {
		classNames.push(`o-labels--${state}`);
	}
	return <span className={classNames.join(' ')}>{children}</span>;
}

export function BaseLabel(props: BaseLabelProps): React.JSX.Element {
	return SimpleLabel(props)
}

export function SupportLabel(props: SupportLabelProps): React.JSX.Element {
	return SimpleLabel(props)
}
export function ServiceLabel(props: ServiceLabelProps): React.JSX.Element {
	return SimpleLabel(props)
}
export function ColourLabel(props: ColourLabelProps): React.JSX.Element {
	return SimpleLabel(props)
}
export function ContentLabel(props: ContentLabelProps): React.JSX.Element {
	return SimpleLabel(props)
}
export function LifeCycleLabel(props: LifeCycleLabelProps): React.JSX.Element {
	return SimpleLabel(props)
}

export interface IndicatorLabelProps {
	indicator: 'live' | 'closed' | 'new' | 'updated';
	badge?: boolean;
	status?: string;
	inverse?: boolean;
	timestamp?: React.JSX.Element | React.JSX.Element[];
}

export function IndicatorLabel({
	indicator,
	status,
	inverse,
	timestamp,
	badge,
}: IndicatorLabelProps): React.JSX.Element {
	const classNames = ['o-labels-indicator', `o-labels-indicator--${indicator}`];
	if (inverse) {
		classNames.push('o-labels-indicator--inverse');
	}
	if(badge) {
		classNames.push('o-labels-indicator--badge');
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

export interface TimestampLabelProps {
	inverse?: boolean;
	children?: React.JSX.Element | React.JSX.Element[]
}

export function TimestampLabel({inverse, children}: TimestampLabelProps): React.JSX.Element {
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

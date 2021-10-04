export interface SteppedProgressStep {
	label: string;
	current?: boolean;
	state?: 'complete' | 'error';
	url?: string;
}

export interface SteppedProgressProps {
	steps: SteppedProgressStep[];
}

function getStepClasses({current, state}) {
	let classes = ['o-stepped-progress__step'];
	if (current) {
		classes.push('o-stepped-progress__step--current');
	}
	if (state) {
		classes.push(`o-stepped-progress__step--${state}`);
	}
	return classes.join(' ');
}

function getStateLabel({current, state}) {
	let label = current ? 'current step' : '';
	if (state) {
		label += ` (${state})`;
	}
	return label;
}

export function SteppedProgress({steps}: SteppedProgressProps) {
	return (
		<div class="o-stepped-progress" data-o-component="o-stepped-progress">
			<ol class="o-stepped-progress__steps">
				{steps.map(({label, current = false, state, url}, index) => {
					const labelElement = (
						<span class="o-stepped-progress__label">
							{label}
							{state || current ? (
								<span class="o-stepped-progress__status">
									{getStateLabel({current, state})}
								</span>
							) : (
								''
							)}
						</span>
					);
					const classes = getStepClasses({current, state});
					return (
						<li key={label + index}>
							{url ? (
								<a href={url} className={classes}>
									{labelElement}
								</a>
							) : (
								<span className={classes}>{labelElement}</span>
							)}
						</li>
					);
				})}
			</ol>
		</div>
	);
}

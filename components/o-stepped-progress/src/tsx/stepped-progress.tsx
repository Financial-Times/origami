import {statusTexts, classNames} from '../js/stepped-progress-step';

export interface SteppedProgressStep {
	label: string;
	state?: 'complete' | 'error' | 'current';
	url?: string;
}

export interface SteppedProgressProps {
	steps: SteppedProgressStep[];
}

export function SteppedProgress({steps}: SteppedProgressProps) {
	return (
		<div className="o-stepped-progress" data-o-component="o-stepped-progress">
			<ol className="o-stepped-progress__steps">
				{steps.map(({label, state, url}, index) => {
					const labelElement = (
						<span className="o-stepped-progress__label">
							{label}
							{state ? (
								<span className="o-stepped-progress__status">
									{statusTexts[state]}
								</span>
							) : (
								''
							)}
						</span>
					);

					return (
						<li key={label + index}>
							{url ? (
								<a href={url} className={classNames[state]}>
									{labelElement}
								</a>
							) : (
								<span className={classNames[state]}>{labelElement}</span>
							)}
						</li>
					);
				})}
			</ol>
		</div>
	);
}

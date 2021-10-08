import {statusTexts, classNames} from '../js/stepped-progress-step';

export interface StepProps {
	label: string;
	state?: 'complete' | 'error' | 'current';
	url?: string;
}

export function Step({label, state, url}: StepProps) {
	const labelElement = (
		<span className="o-stepped-progress__label">
			{label}
			{state ? (
				<span className="o-stepped-progress__status">{statusTexts[state]}</span>
			) : (
				''
			)}
		</span>
	);

	let stepClasses = `o-stepped-progress__step ${classNames[state]}`;

	return (
		<li>
			{url ? (
				<a href={url} className={stepClasses}>
					{labelElement}
				</a>
			) : (
				<span className={stepClasses}>{labelElement}</span>
			)}
		</li>
	);
}

export interface SteppedProgressProps {
	steps: StepProps[];
	children: JSX.Element | JSX.Element[];
}

export function SteppedProgress({steps, children}: SteppedProgressProps) {
	return (
		<div className="o-stepped-progress" data-o-component="o-stepped-progress">
			<ol className="o-stepped-progress__steps">
				{steps.map((step, index) => {
					return <Step {...step} key={step.label + index} />;
				})}
				{children}
			</ol>
		</div>
	);
}

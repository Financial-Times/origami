export type TooltipProps = {
	content: string;
	title?: string;
	placement: 'top' | 'right' | 'bottom' | 'left';
};

export interface OnboardingToolTipProps extends Omit<TooltipProps, 'placement'> {
	contentId: string;
	targetId: string;
	placement:
		| 'top-start'
		| 'top'
		| 'top-end'
		| 'right-start'
		| 'right'
		| 'right-end'
		| 'bottom-start'
		| 'bottom'
		| 'bottom-end'
		| 'left-start'
		| 'left'
		| 'left-end';
}
export interface ToggleToolTipProps extends TooltipProps {}

declare global {
	namespace JSX {
		interface IntrinsicElements {
			'o3-tooltip-onboarding': any;
			'o3-tooltip-toggle': any;
		}
	}
}

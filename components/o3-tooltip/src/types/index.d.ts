export type TooltipProps = {
	targetId: string;
	content: string;
	contentId?: string;
	title?: string;
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
};

declare global {
	namespace JSX {
		interface IntrinsicElements {
			'o3-tooltip-onboarding': any;
			'o3-tooltip-toggle': any;
		}
	}
}

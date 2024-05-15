import type {OnboardingToolTipProps} from '../types/index';

export function TooltipOnboarding({
	targetId,
	placement = 'top',
	content,
	title,
	contentId,
}: OnboardingToolTipProps) {
	return (
		<o3-tooltip-onboarding
			role="tooltip"
			placement={placement}
			target-id={targetId}
			class="o3-tooltip"
			content={content}
			title={title}
			content-id={contentId}
		/>
	);
}

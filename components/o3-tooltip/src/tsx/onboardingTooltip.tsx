import type {OnboardingToolTipProps} from '../types/index';
import {MutableRefObject, useEffect, useRef} from "react";

export function TooltipOnboarding({
	id,
	targetId,
	placement = 'top',
	content,
	title,
	contentId,
	onClose
}: OnboardingToolTipProps) {
	const ref: MutableRefObject<{ onClose?: () => void } | null> = useRef(null);

	useEffect(() => {
		if (!ref.current) return;

		ref.current.onClose = onClose;
	}, [onClose]);

	return (
		<o3-tooltip-onboarding
			id={id}
			ref={ref}
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

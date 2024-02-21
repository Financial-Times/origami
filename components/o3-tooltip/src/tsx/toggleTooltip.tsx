import type {TooltipProps} from '../types';

export function TooltipToggle({
	targetId,
	placement = 'top',
	content,
	title,
	contentId,
}: TooltipProps) {
	return (
		<o3-tooltip-toggle
			role="tooltip"
			placement={placement}
			target-id={targetId}
			class="o3-tooltip">
			<div className="o3-tooltip-wrapper">
				<div data-tooltip-arrow></div>
				<div className="o3-tooltip-content" id={contentId}>
					{title && <div className="o3-tooltip-content-title">{title}</div>}
					<div>{content}</div>
				</div>
			</div>
		</o3-tooltip-toggle>
	);
}

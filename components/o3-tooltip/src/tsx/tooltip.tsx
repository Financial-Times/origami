import type {TooltipProps} from '../types';

export function Tooltip({
	targetId,
	tipPlacement = 'top',
	content,
	title,
	contentId,
}: TooltipProps) {
	return (
		<o3-tooltip
			role="tooltip"
			tip-placement={tipPlacement}
			target-id={targetId}
			className="o3-tooltip">
			<div className="o3-tooltip-wrapper">
				<div data-tooltip-arrow></div>
				<div className="o3-tooltip-content" id={contentId}>
					{title && <div className="o3-tooltip-content-title">{title}</div>}
					<div>{content}</div>
				</div>
				<button
					className="o3-tooltip-close"
					aria-label="Close tooltip"
					title="Close tooltip"></button>
			</div>
		</o3-tooltip>
	);
}

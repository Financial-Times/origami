import type {TooltipProps} from '../types';

export function Tooltip({
	targetId,
	placement = 'top',
	content,
	title,
	renderOnOpen = false,
	contentId,
}: TooltipProps) {
	return (
		<o3-tooltip
			role="tooltip"
			placement={placement}
			target-id={targetId}
			render-on-open={renderOnOpen ? '' : undefined}
			className="o3-tooltip">
			<div className="o3-tooltip-wrapper">
				<div data-tooltip-arrow></div>
				<div className="o3-tooltip-content" id={contentId}>
					{title && <div className="o3-tooltip-content-title">{title}</div>}
					<div>{content}</div>
				</div>
				{renderOnOpen && <button
					className="o3-tooltip-close"
					aria-label="Close tooltip"
					title="Close tooltip"></button>}
			</div>
		</o3-tooltip>
	);
}

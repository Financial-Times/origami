export type TooltipProps = {
	targetId: string;
	content: string;
	contentId: string;
	title?: string;
	tipPlacement?:
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
			<div data-tooltip-arrow></div>
			<div className="o3-tooltip-content" id={contentId}>
				{title && <div className="o3-tooltip-content-title">{title}</div>}
				<div>{content}</div>
			</div>
			<button
				className="o3-tooltip-close"
				aria-label="Close tooltip"
				title="Close tooltip"></button>
		</o3-tooltip>
	);
}

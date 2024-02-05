export type TooltipProps = {
	targetId: string;
	tipPosition?: 'above' | 'below' | 'left' | 'right';
	tipAlignment?: 'top' | 'bottom' | 'left' | 'right';
	children?: JSX.Element;
};

export function Tooltip({
	targetId,
	tipPosition = 'above',
	tipAlignment = 'top',
	children,
}: TooltipProps) {
	return (
		<o3-tooltip
			role="tooltip"
			tip-position={tipPosition}
			tip-alignment={tipAlignment}
			target-id={targetId}
			className="o3-tooltip">
			<div className="o3-tooltip-content">{children}</div>
			<button
				className="o3-tooltip-close"
				aria-label="Close tooltip"
				title="Close tooltip"></button>
		</o3-tooltip>
	);
}

import type {TooltipProps} from '../types';

export function TooltipToggle({
	targetId,
	placement = 'top',
	content,
	title,
}: TooltipProps) {
	return (
		<o3-tooltip-toggle
			placement={placement}
			target-id={targetId}
			class="o3-tooltip">
			<div className="o3-tooltip-wrapper">
				<div data-tooltip-arrow></div>
				<div className="o3-tooltip-content" role='status'>
					{title && <div className="o3-tooltip-content-title">{title}</div>}
					<div>{content}</div>
				</div>
			</div>
		</o3-tooltip-toggle>
	);
}

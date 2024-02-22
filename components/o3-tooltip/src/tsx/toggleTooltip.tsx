import type {ToggleToolTipProps} from '../types';

export function TooltipToggle({
	placement = 'top',
	content,
	title,
}: ToggleToolTipProps) {
	return (
		<o3-tooltip-toggle placement={placement} class="o3-tooltip">
			<button
				type="button"
				className="o3-tooltip-info"
				aria-label="Tooltip info"
				title="Tooltip description"
			/>
			<div className="o3-tooltip-wrapper">
				<div data-tooltip-arrow></div>
				<div className="o3-tooltip-content" role="status">
					{title && <div className="o3-tooltip-content-title">{title}</div>}
					<div>{content}</div>
				</div>
			</div>
		</o3-tooltip-toggle>
	);
}

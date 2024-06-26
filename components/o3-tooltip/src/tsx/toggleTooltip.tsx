import type {ToggleToolTipProps} from '../types/index';

export function TooltipToggle({
	placement = 'top',
	content,
	title,
	infoLabel,
}: ToggleToolTipProps) {
	return (
		<o3-tooltip-toggle
			placement={placement}
			class="o3-tooltip"
			content={content}
			title={title}
			info-label={infoLabel}
		/>
	);
}

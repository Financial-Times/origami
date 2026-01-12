import type {ToggleToolTipProps} from '../types/index';

export function TooltipToggle({
	id,
	placement = 'top',
	content,
	title,
	infoLabel,
}: ToggleToolTipProps) {
	return (
		<o3-tooltip-toggle
			id={id}
			placement={placement}
			class="o3-tooltip"
			content={content}
			title={title}
			info-label={infoLabel}
		/>
	);
}

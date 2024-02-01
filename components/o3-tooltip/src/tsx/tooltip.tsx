export type TooltipProps = {
	target: string;
	position?: 'above' | 'below' | 'left' | 'right';
	showOnConstruction?: boolean;
	showOnHover?: boolean;
	showOnFocus?: boolean;
	showOnClick?: boolean;
	toggleOnClick?: boolean;
	/**
	 * number of seconds to wait before showing the tooltip.
	 * Only applies when `showOnConstruction` is set to true
	 */
	showAfter?: number;
	/**
	 * number of seconds to wait before hiding the tooltip.
	 * Only applies when `showOnConstruction` is set to true
	 */
	closeAfter?: number;
	zIndex?: number;
	/**
	 * the distance in pixels away from target to start and end animation
	 */
	animationDistance: string;
	appendToBody?: boolean;
};

export function Tooltip({
	target,
	position = 'above',
	showOnConstruction = true,
	showOnHover = false,
	showOnFocus = false,
	showOnClick = false,
	toggleOnClick = false,
	showAfter = 0,
	closeAfter = 0,
	zIndex = 100,
	animationDistance = '10px',
	appendToBody = false,
}: TooltipProps) {
	return (
		<o3-tooltip
			tooltip-target={target}
			tooltip-position={position}
			show-on-construction={showOnConstruction}
			show-on-hover={showOnHover}
			show-on-focus={showOnFocus}
			show-on-click={showOnClick}
			toggle-on-click={toggleOnClick}
			show-after={showAfter}
			close-after={closeAfter}
			z-index={zIndex}
			animation-distance={animationDistance}
			append-to-body={appendToBody}>
			<div
				data-o-component="o-tooltip"
				data-o-tooltip-position={position}
				data-o-tooltip-target={target}
				data-o-tooltip-show-on-construction={showOnConstruction}
				className="o3-tooltip visible o3-tooltip--arrow-left o3-tooltip-arrow--align-middle">
				<div className="o3-tooltip-content">
					<p>supercalifragilisticexpialidocious</p>
				</div>
			</div>
		</o3-tooltip>
	);
}

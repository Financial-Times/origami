import {TooltipToggle} from '@financial-times/o3-tooltip';

function ToggleTipPreview() {
	return (
		// <preview>
		<div className="o3-tooltip-demo-wrapper">
			<div className="o3-tooltip-demo-message">
				<p>Click the info button to toggle the tooltip</p>
			</div>
			<div id="component-wrapper">
				<TooltipToggle
					content="Lorem ipsum muta est. Scribere possum quicquid hic volo, et nihil potes de illo."
					placement="top"
				/>
			</div>
		</div>
		// </preview>
	);
}

export const filePath = 'src/components/tooltip/preview/Toggletip.tsx';
export {ToggleTipPreview as preview};

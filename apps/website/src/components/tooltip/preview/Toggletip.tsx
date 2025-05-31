import {TooltipToggle} from '@financial-times/o3-tooltip';

function ToggleTipPreview() {
	return (
		<div className="o3-tooltip-demo-wrapper">
			<div className="o3-tooltip-demo-message">
				<p>Click the info button to toggle the tooltip</p>
			</div>
			<div id="component-wrapper">
				<meta itemProp="@preview" />
				<TooltipToggle
					content="Lorem ipsum muta est. Scribere possum quicquid hic volo, et nihil potes de illo."
					placement="top"
				/>
				<meta itemProp="@preview" />
			</div>
		</div>
	);
}

export const filePath = 'src/components/tooltip/preview/Toggletip.tsx';
export {ToggleTipPreview as preview};

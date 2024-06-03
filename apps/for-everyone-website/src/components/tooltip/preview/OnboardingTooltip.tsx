import {TooltipOnboarding} from '@financial-times/o3-tooltip/esm';
import {Button} from '@financial-times/o3-button/esm';
import './demo-styles.css';
function OnboardingTooltipPreview() {
	return (
		// <preview>
		<div className="o3-tooltip-demo-wrapper">
			<div className="o3-tooltip-demo-message">
				<p>Refresh to view bounce animation</p>
			</div>
			<div id="component-wrapper">
				<Button
					label="Share"
					type="secondary"
					attributes={{
						id: 'demo-o3-tooltip-id',
						'aria-describedby': 'demo-o3-tooltip-content',
					}}
				/>
				<TooltipOnboarding
					placement="top"
					title="Heading"
					content="Lorem ipsum muta est. Scribere possum quicquid hic volo, et nihil potes de illo."
					targetId="demo-o3-tooltip-id"
					contentId="demo-o3-tooltip-content"
				/>
			</div>
		</div>
		// </preview>
	);
}

export const filePath = 'src/components/tooltip/preview/OnboardingTooltip.tsx';
export const previewMarkers = {
	mark: ['demo-o3-tooltip-id', 'demo-o3-tooltip-content'],
};
export {OnboardingTooltipPreview as preview};

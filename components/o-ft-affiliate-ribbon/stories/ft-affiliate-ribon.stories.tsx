import {ComponentMeta, ComponentStory} from "@storybook/react";
import './ft-affiliate-ribbon.scss';
import {withDesign} from "storybook-addon-designs";

import withHtml from 'origami-storybook-addon-html';

export default {
	title: 'Components/o-ft-affiliate-ribbon',
	component: FtAffiliateRibbon,
	parameters: {
		layout: 'fullscreen'
	},
	decorators: [withDesign, withHtml],
} as ComponentMeta<typeof FtAffiliateRibbon>;

export const StoryFtAffiliateRibbon: ComponentStory<typeof FtAffiliateRibbon> = () => {
	return (
		<FtAffiliateRibbon />
	);
};
StoryFtAffiliateRibbon.storyName = 'Default FT Affiliate Ribbon';

const FtAffiliateRibbon = () => {
	return (
		<div className="o-ft-affiliate-ribbon">
			<div className="o-ft-affiliate-ribbon__container">
				<div className="o-ft-affiliate-ribbon__row">
					<a className="o-ft-affiliate-ribbon__logo" href="https://www.ft.com/" title="The Financial Times" target="_blank">
						<span className="o-ft-affiliate-ribbon__visually-hidden">A service from the Financial Times</span>
					</a>
				</div>
			</div>
		</div>
	)
}

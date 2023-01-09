import {ComponentMeta, ComponentStory} from "@storybook/react";
import './ft-affiliate-ribbon.scss';
import {withDesign} from "storybook-addon-designs";

import withHtml from 'origami-storybook-addon-html';
import {FtAffiliateRibbon} from "../src/ft-affiliate-ribbon";

export default {
	title: 'Components/o-ft-affiliate-ribbon',
	component: FtAffiliateRibbon,
	parameters: {
		layout: 'fullscreen'
	},
	decorators: [withDesign, withHtml],
} as ComponentMeta<typeof FtAffiliateRibbon>;

export const FtAffiliateRibbonStory: ComponentStory<typeof FtAffiliateRibbon> = () => {
	return (
		<FtAffiliateRibbon />
	);
};
FtAffiliateRibbonStory.storyName = 'Default FT Affiliate Ribbon';


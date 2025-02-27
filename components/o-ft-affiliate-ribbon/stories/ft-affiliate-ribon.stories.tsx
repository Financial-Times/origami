import {ComponentMeta, ComponentStory} from '@storybook/react';
import './ft-affiliate-ribbon.scss';
import {FtAffiliateRibbon} from '../src/tsx/ft-affiliate-ribbon';

export default {
	title: 'Maintained/o-ft-affiliate-ribbon',
	component: FtAffiliateRibbon,
	parameters: {
		layout: 'fullscreen',
	},
} as ComponentMeta<typeof FtAffiliateRibbon>;

export const FtAffiliateRibbonStory: ComponentStory<
	typeof FtAffiliateRibbon
> = () => {
	return <FtAffiliateRibbon />;
};
FtAffiliateRibbonStory.storyName = 'Default FT Affiliate Ribbon';

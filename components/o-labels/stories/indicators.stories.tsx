import ODate from '@financial-times/o-date/main';
import type {ComponentMeta, ComponentStory} from '@storybook/react';
import withHtml from 'origami-storybook-addon-html';
import {useEffect} from 'react';
import {withDesign} from 'storybook-addon-designs';
import {IndicatorLabel as OIndicatorLabel} from '../src/tsx/label';
import './labels.scss';

export default {
	title: 'Components/o-labels',
	component: OIndicatorLabel,
	decorators: [withDesign, withHtml],
	argTypes: {
		inverse: {control: 'boolean', defaultValue: false},
	},
} as ComponentMeta<typeof OIndicatorLabel>;

const Template: ComponentStory<typeof OIndicatorLabel> = args => {
	useEffect(() => {
		let dates = ODate.init();
		return function cleanup() {
			dates = Array.isArray(dates) ? dates : [dates];
			dates.forEach(date => date.destroy());
		};
	});
	return <OIndicatorLabel {...args} />;
};

export const LiveIndicatorLabel: ComponentStory<typeof OIndicatorLabel> =
	Template.bind({});
LiveIndicatorLabel.args = {
	indicator: 'live',
	status: 'live',
};

export const ClosedIndicatorLabel: ComponentStory<typeof OIndicatorLabel> =
	Template.bind({});
ClosedIndicatorLabel.args = {
	indicator: 'closed',
	status: 'closed',
};

export const NewIndicatorLabel: ComponentStory<typeof OIndicatorLabel> =
	Template.bind({});
NewIndicatorLabel.args = {
	indicator: 'new',
	status: 'new',
	timestamp: {dateTime: new Date(2022, 1, 10, 8, 30).toISOString()},
};

export const UpdatedIndicatorLabel: ComponentStory<typeof OIndicatorLabel> =
	Template.bind({});
UpdatedIndicatorLabel.args = {
	indicator: 'updated',
	status: 'updated',
};

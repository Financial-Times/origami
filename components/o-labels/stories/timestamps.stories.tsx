import ODate from '@financial-times/o-date/main';
import type {ComponentMeta, ComponentStory} from '@storybook/react';
import withHtml from 'origami-storybook-addon-html';
import {useEffect} from 'react';
import {withDesign} from 'storybook-addon-designs';
import {TimestampLabel as OTimestampLabel} from '../src/tsx/label';
import './labels.scss';

export default {
	title: 'Components/o-labels',
	component: OTimestampLabel,
	decorators: [withDesign, withHtml],
	argTypes: {
		inverse: {control: 'boolean', defaultValue: false},
		dateTime: {control: 'date'},
	},
} as ComponentMeta<typeof OTimestampLabel>;

export const TimestampLabel: ComponentStory<typeof OTimestampLabel> = args => {
	useEffect(() => {
		let dates = ODate.init();
		return function cleanup() {
			dates = Array.isArray(dates) ? dates : [dates];
			dates.forEach(date => date.destroy());
		};
	});
	return <OTimestampLabel {...args} />;
};
TimestampLabel.args = {
	dateTime: new Date(2022, 1, 10, 8, 30).toISOString(),
};

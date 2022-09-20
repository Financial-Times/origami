import ODate from '@financial-times/o-date/main';
import {Date as DateTSX} from '@financial-times/o-date/src/tsx/date';
import type {Meta, Story} from '@storybook/react';
import withHtml from 'origami-storybook-addon-html';
import {useEffect} from 'react';
import {withDesign} from 'storybook-addon-designs';
import {IndicatorLabel as OIndicatorLabel, IndicatorLabelProps} from '../src/tsx/label';
import './labels.scss';

export default {
	title: 'Components/o-labels',
	component: OIndicatorLabel,
	decorators: [withDesign, withHtml],
	argTypes: {
		inverse: {control: 'boolean', defaultValue: false},
		dateTime: {control: 'date'}
	},
} as Meta<IndicatorLabelProps>;

type IndicatorStory =  Story<IndicatorLabelProps & {dateTime: Date | number}>
const Template: IndicatorStory = args => {
	useEffect(() => {
		let dates = ODate.init();
		return function cleanup() {
			dates = Array.isArray(dates) ? dates : [dates];
			dates.forEach(date => date.destroy());
		};
	});
	const dateString = args.dateTime && new Date(args.dateTime).toISOString()
	return <OIndicatorLabel {...args}>
		{dateString && <DateTSX dateTime={dateString} />}
	</OIndicatorLabel>;
};

export const LiveIndicatorLabel: IndicatorStory =
	Template.bind({});
LiveIndicatorLabel.args = {
	indicator: 'live',
	status: 'live',
};

LiveIndicatorLabel.argTypes = {
	dateTime: {
		table: {
			disable: true
		}
	}
}

export const ClosedIndicatorLabel: IndicatorStory =
	Template.bind({});
ClosedIndicatorLabel.args = {
	indicator: 'closed',
	status: 'closed',
};
ClosedIndicatorLabel.argTypes = {
	dateTime: {
		table: {
			disable: true
		}
	}
}

export const NewIndicatorLabel: IndicatorStory =
	Template.bind({});
NewIndicatorLabel.args = {
	indicator: 'new',
	status: 'new',
	dateTime: Date.now(),
};

export const UpdatedIndicatorLabel: IndicatorStory =
	Template.bind({});
UpdatedIndicatorLabel.args = {
	indicator: 'updated',
	status: 'updated',
	dateTime: Date.now(),
};

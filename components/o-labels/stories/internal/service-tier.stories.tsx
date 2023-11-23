import {ServiceLabel} from '../../src/tsx/label';
import '../labels.scss';

const ComponentDescription = {
	title: 'Components/o-labels',
	component: ServiceLabel,
	argTypes: {
		state: { defaultValue: 'tier-bronze' },
		size: {
			options: ['small', 'default', 'big'],
			defaultValue: 'default'
		},
		text: {
			name: 'text',
			type: { name: 'string', required: false },
			control: {
			  type: 'text'
			}
		  }
	}
};

export default ComponentDescription;

export const ServiceTierLabel = args => {
	const copy = args.text || args.state.replace('tier-', '');
	if(args.size === 'default') {
		delete args.size;
	}
	return <ServiceLabel {...args}>{copy}</ServiceLabel>;
}
ServiceTierLabel.args = {
	text: 'Bronze'
}

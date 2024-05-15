import {ContentLabel as ContentLabelTsx} from '../../src/tsx/label';
import '../labels.scss';

const ComponentDescription = {
    title: 'Components/o-labels',
    component: ContentLabelTsx,
    argTypes: {
        state: { defaultValue: 'content-premium' },
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

export const ContentLabel = args => {
    const copy = args.text || args.state.replace('content-', '');
    if(args.size === 'default') {
        delete args.size;
    }
    return <ContentLabelTsx {...args}>{copy}</ContentLabelTsx>;
}
ContentLabel.args = {
	text: 'Premium',
}

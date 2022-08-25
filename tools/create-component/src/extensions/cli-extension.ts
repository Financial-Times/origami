import {GluegunToolbox} from 'gluegun';

import {copyTemplates} from '../../helpers/ejsFunctions';

// add your CLI-specific functionality here, which will then be accessible
// to your commands
module.exports = (toolbox: GluegunToolbox) => {
	toolbox.origami = {
		copyTemplates: props => {
			if (props.name.includes('test')) {
				return;
			}
			return copyTemplates(props);
		},
	};
};

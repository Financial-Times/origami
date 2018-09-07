import oLayout from './src/js/layout';
import * as oHeader from 'o-header-services'; // eslint-disable-line no-unused-vars

const constructAll = function() {
	oLayout.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export default oLayout;

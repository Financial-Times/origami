import oTooltip from './src/js/oTooltip';

const constructAll = function() {
	oTooltip.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export default oTooltip;

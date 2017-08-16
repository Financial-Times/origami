import SubsCard from './src/js/subsCard';

const constructAll = function() {
	SubsCard.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

module.exports = SubsCard;

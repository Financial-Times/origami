import oTeaser from './src/js/teaser';

const constructAll = function() {
	oTeaser.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export default oTeaser;

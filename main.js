import SyntaxHighlight from './src/js/syntax-highlight';

const constructAll = function() {
	oSyntaxHighlight.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export default SyntaxHighlight;

import SyntaxHighlight from './src/js/syntax-highlight';

const constructAll = function() {
	SyntaxHighlight.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export default SyntaxHighlight

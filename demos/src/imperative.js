import SyntaxHighlight from '../../main.js';

const highlighter = new SyntaxHighlight('<div>There is a <a href="#">link</a>here.</div>', {
	language: 'html'
});

document.querySelector('.demo').innerHTML = highlighter.tokenise();

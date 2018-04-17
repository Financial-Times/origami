// global require
const SyntaxHighlight = require('./../../src/js/syntax-highlight.js');

let highlighter = new SyntaxHighlight('<div>There is a <p> here</p> and a <a href="#">link</a>here.</div>', {language: 'html'})
document.querySelector('.demo').innerHTML = highlighter.tokenise();

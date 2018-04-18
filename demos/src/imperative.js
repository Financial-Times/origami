import SyntaxHighlight from '../../main.js';
let syntax = new SyntaxHighlight('<div>Lols</div>', {language: 'html'});
document.querySelector('.test').innerHTML = syntax.tokenise();

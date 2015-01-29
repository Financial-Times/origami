document.body.addEventListener('oExpander.collapse', function (ev) {
    document.querySelector('.alert').innerHTML = 'Oh no - come back!';
});

document.body.addEventListener('oExpander.expand', function (ev) {
    document.querySelector('.alert').innerHTML = 'Get outta my way!';
})

require('./demo');
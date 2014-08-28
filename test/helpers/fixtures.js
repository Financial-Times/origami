/*global exports*/
"use strict";
var sandboxEl;

function createSandbox() {
    if (document.querySelector('.sandbox')) {
        sandboxEl = document.querySelector('.sandbox');
    } else {
        sandboxEl = document.createElement('div');
        sandboxEl.setAttribute('class', 'sandbox');
        document.body.appendChild(sandboxEl);
    }
}

function reset() {
    sandboxEl.innerHTML = '';
}

function insert(html) {
    createSandbox();
    sandboxEl.innerHTML = html;
}

function insertShareLinks() {
    var html = [
        '<div data-o-component="o-share" data-o-version="0.1.0" class="o-share">',
        '<ul>',
        '<li class="o-share__action o-share__action--url" data-o-share-action="url">',
        '<a href="http://on.ft.com/1mUdgA2"><i>URL</i></a>',
        '</li>',
        '<li class="o-share__action o-share__action--twitter">',
        '<a href="https://twitter.com/intent/tweet?url=http:&#x2F;&#x2F;on.ft.com&#x2F;1mUdgA2&text=Pfizer+says+its+AstraZeneca+vow+over+big+UK+presence+is+binding&related=ftcompanies&via=FT"><i>Twitter</i></a>',
        '</li>',
        '<li class="o-share__action o-share__action--facebook">',
        '<a href="http://www.facebook.com/sharer.php?u=http:&#x2F;&#x2F;on.ft.com&#x2F;1mUdgA2&t=Pfizer+says+its+AstraZeneca+vow+over+big+UK+presence+is+binding+|+FT%2Ecom+%7C+Pharmaceuticals"><i>Facebook</i></a>',
        '</li>',
        '<li class="o-share__action o-share__action--googleplus">',
        '<a href="https://plus.google.com/share?url=http:&#x2F;&#x2F;on.ft.com&#x2F;1mUdgA2"><i>Google+</i></a>',
        '</li>',
        '<li class="o-share__action o-share__action--linkedin">',
        '<a href="http://www.linkedin.com/shareArticle?mini=true&url=http:&#x2F;&#x2F;on.ft.com&#x2F;1mUdgA2&title=Pfizer+says+its+AstraZeneca+vow+over+big+UK+presence+is+binding+|+FT%2Ecom+%7C+Pharmaceuticals&summary=US+drugs+group+vows+to+maintain+big+British+presence&source=Financial+Times"><i>LinkedIn</i></a>',
        '</li>',
        '<li class="o-share__action o-share__action--stumbleupon">',
        '<a href="http://www.stumbleupon.com/submit?url=http:&#x2F;&#x2F;on.ft.com&#x2F;1mUdgA2&title=Pfizer+says+its+AstraZeneca+vow+over+big+UK+presence+is+binding"><i>StumbleUpon</i></a>',
        '</li>',
        '<li class="o-share__action o-share__action--reddit">',
        '<a href="http://reddit.com/submit?url=http:&#x2F;&#x2F;on.ft.com&#x2F;1mUdgA2&title=Pfizer+says+its+AstraZeneca+vow+over+big+UK+presence+is+binding"><i>Reddit</i></a>',
        '</li>',
        '<li class="o-share__action o-share__action--tumblr">',
        '<a href="http://www.tumblr.com/share/link?url=http:&#x2F;&#x2F;on.ft.com&#x2F;1mUdgA2&name=Pfizer+says+its+AstraZeneca+vow+over+big+UK+presence+is+binding&description=US+drugs+group+vows+to+maintain+big+British+presence"><i>Tumblr</i></a>',
        '</li>',
        '</ul>',
        '</div>'
    ];
    insert(html.join(''));
}

exports.insertShareLinks = insertShareLinks;
exports.reset = reset;
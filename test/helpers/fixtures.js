/*global exports*/
'use strict';
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

function insertSimple() {
    var html = [
        '<ul data-o-component="o-tabs" data-o-version="1.0.0" class="o-tabs" role="tablist">',
        '<li role="tab"><a href="#tabContent1">Tab 1</a></li>',
        '<li role="tab"><a href="#tabContent2">Tab 2</a></li>',
        '<li role="tab"><a href="#tabContent3">Tab 3</a></li>',
        '</ul>',
        '<div id="tabContent1" class="o-tabs__tabpanel" role="tabpanel">Tab content 1</div>',
        '<div id="tabContent2" class="o-tabs__tabpanel" role="tabpanel">Tab content 2</div>',
        '<div id="tabContent3" class="o-tabs__tabpanel" role="tabpanel">Tab content 3</div>',
    ];
    insert(html.join(''));
}

exports.insertSimple = insertSimple;
exports.reset = reset;
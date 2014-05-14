/*global require,module*/

var oDom = require('o-dom'),
    shareDom = require('./shareDom'),
    ToolTip = require('./ToolTip');

function ShareLinks(rootEl) {
    "use strict";

    var shareObj = this,
        openWindows = {};

    function dispatchCustomEvent(name, data) {
        if (document.createEvent && rootEl.dispatchEvent) {
            var event = document.createEvent('Event');
            event.initEvent(name, true, true);
            if (data) {
                event.detail = data;
            }
            rootEl.dispatchEvent(event);
        }
    }

    function handleClick(ev) {
        ev.preventDefault();
        var actionEl = oDom.getClosestMatch(ev.target, 'li'),
            url;
        if (actionEl && actionEl.querySelector('a[href]')) {
            url = actionEl.querySelector('a[href]').href;
            if (actionEl.getAttribute('data-o-share-action') === "url") {
                shareUrl(url, actionEl);
            } else {
                shareSocial(url);
            }
        }
    }

    function shareUrl(url, parentEl) {
        if (!url || !parentEl || parentEl.hasAttribute("aria-selected")) {
            return;
        }
        var inputEl = shareDom.createInputEl(url),
            inputWidth,
            tooltip;
        inputEl.addEventListener('blur', function() {
            parentEl.removeChild(inputEl);
            parentEl.removeAttribute('aria-selected');
            tooltip.destroy();
            tooltip = null;
            inputEl = null;
        }, false);
        inputEl.addEventListener('copy', function() {
            tooltip.setText('Copied!');
            dispatchCustomEvent('oTabs.copy', {
                share: shareObj,
                action: "url",
                url: url
            });
        }, false);
        inputEl.addEventListener('keyup', function(ev) {
            if (ev.keyCode === 27) {
                inputEl.blur();
            }
        }, false);
        parentEl.setAttribute('aria-selected', 'true');
        parentEl.insertBefore(inputEl, parentEl.childNodes[0]);
        inputWidth = shareDom.getPixelWidthOfText(url, inputEl);
        if (inputWidth) {
            inputEl.style.width = inputWidth + 'px';
        }
        inputEl.focus();
        inputEl.select();
        tooltip = new ToolTip('Copy this link for sharing', parentEl);
        dispatchCustomEvent('oTabs.open', {
            share: shareObj,
            action: "url",
            url: url
        });
    }

    function shareSocial(url) {
        if (url) {
            if (openWindows[url] && !openWindows[url].closed) {
                openWindows[url].focus();
            } else {
                openWindows[url] = window.open(url, url, 'width=646,height=436');
            }
            dispatchCustomEvent('oTabs.open', {
                share: shareObj,
                action: "social",
                url: url
            });
        }
    }

    function init() {
        rootEl.classList.add('o-share--js');
        rootEl.addEventListener('click', handleClick, false);
        dispatchCustomEvent('oShare.ready', {
            share: shareObj
        });
    }

    function destroy() {
        rootEl.classList.remove('o-share--js');
        rootEl.removeEventListener('click', handleClick, false);
    }

    init();

    this.shareUrl = destroy;
    this.shareViaSocialMedia = destroy;
    this.destroy = destroy;
}

module.exports = ShareLinks;
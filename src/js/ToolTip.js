/*global module*/

function ToolTip(text, refEl) {
    "use strict";

    var tipEl,
        cssClass = "o-share-tooltip";

    function create() {
        tipEl = document.createElement('div');
        tipEl.classList.add(cssClass);
        tipEl.innerHTML = '<div class="' + cssClass + '__text">' + text + '</div><div class="' + cssClass + '__arrow"></div>';
        refEl.insertBefore(tipEl, refEl.childNodes[0]);
        tipEl.style.width = tipEl.clientWidth + "px"; // Set width based on initial text
    }

    function position() {
        tipEl.style.left = (refEl.offsetWidth - tipEl.offsetWidth) / 2 + "px";
        tipEl.style.opacity = 1;
    }

    function setText(text) {
        tipEl.querySelector('.' + cssClass + '__text').innerText = text;
    }

    function destroy() {
        refEl.removeChild(tipEl);
        tipEl = null;
    }

    create();
    position();

    this.setText = setText;
    this.destroy = destroy;
}

module.exports = ToolTip;
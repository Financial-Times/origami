var $ = require('jquery'),
    html = $('html'),
    isAnimatable = html.hasClass('csstransforms');

module.exports = {
    L: 'left',
    R: 'right',
    T: 'top',
    B: 'bottom',
    H: 'height',
    W: 'width',
    win: $(window),
    body: $('body'),
    doc: $(document),
    html: html,
    presets: {},
    templates: {},
    isAnimatable: isAnimatable,
    isFlexbox: html.hasClass('flexbox') || html.hasClass('flexboxlegacy'),
    dialogs: isAnimatable ? (new Array(2)) : []
};
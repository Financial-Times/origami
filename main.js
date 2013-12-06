





$.fn.responsiveDialog = function () {

  function getSpacing(el, side) {
    return parseInt(el.css('padding-' + side), 10) + parseInt(el.css('margin-' + side), 10);
  }

  var win = $(window);

  var Plugin = function (el) {
    var self = this;
    this.dialogWrapper = el;
    this.dialogEl = this.dialogWrapper.children(".dialog__content");
    this.isLegacyOverlay = !Modernizr.flexbox && !Modernizr.flexboxlegacy && this.dialogWrapper.hasClass('dialog--overlay');
    this.idealWidth = this.recalculateIdealWidth();
    this.idealHeight = this.recalculateIdealHeight();
    this.resizeDialog();
    win.on("resize.responsiveDialog", function() {
        self.resizeDialog();
    });
  };

  Plugin.prototype = {

    fullScreenSwitch: function (dimension) {
      var edge = dimension === 'width' ? 'left' : 'top',
          capitalisedDimension = dimension.charAt(0).toUpperCase() + dimension.substr(1);

      if (win[dimension]() <= this['ideal' + capitalisedDimension]) {
        this.dialogWrapper.addClass('dialog--full-' + dimension);
        if (this.isLegacyOverlay) {
          this.dialogEl.css('margin-' + edge, 0);
        }
      } else {
        this.dialogWrapper.removeClass('dialog--full-' + dimension);
        this['ideal' + capitalisedDimension] = Math.max(
          this['recalculateIdeal' + capitalisedDimension](this.dialogEl, this.dialogWrapper),
          this['ideal' + capitalisedDimension]
        );
        if (this.isLegacyOverlay) {
          this.dialogEl.css('margin-' + edge, -this.dialogEl['outer' + capitalisedDimension]()/2);
        }
      }
    },
    resizeDialog: function () {
      this.fullScreenSwitch('width');
      this.fullScreenSwitch('height');
    },
    recalculateIdealWidth: function () {
      return this.dialogEl.outerWidth() + getSpacing(this.dialogWrapper, 'left') + getSpacing(this.dialogWrapper, 'right');
    },
    recalculateIdealHeight: function () {
      return this.dialogEl.outerHeight() + getSpacing(this.dialogWrapper, 'top') + getSpacing(this.dialogWrapper, 'bottom');
    }
  };
 

  return this.each(function () {
    win.off("resize.responsiveDialog");
    var wrapper = $(this);
    wrapper.data('responsive-dialog', new Plugin(wrapper));
  });
};

/* document.getElementById('username').focus(); */

$('.dialog-trigger').click(function () {
    $('.dialog').removeClass('is-open');
    $('.' + $(this).data('target')).toggleClass('is-open').responsiveDialog();
});

// $('.dialog--overlay').click(function () {
//     $(this).removeClass('is-open');
// });

$(document).keyup(function(e) {

  if (e.keyCode == 27) { $('.dialog').removeClass('is-open'); }   // esc
});
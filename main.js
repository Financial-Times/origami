function getSpacing(el, side) {
  return parseInt(el.css('padding-' + side), 10) + parseInt(el.css('margin-' + side), 10);
}

function getWrappedWidth(el, wrapper) {
  return el.outerWidth() + getSpacing(wrapper, 'left') + getSpacing(wrapper, 'right');
}


function getWrappedHeight(el, wrapper) {
  return el.outerHeight() + getSpacing(wrapper, 'top') + getSpacing(wrapper, 'bottom');
}

function isLegacyOverlay (el) {
  return !Modernizr.flexbox && !Modernizr.flexboxlegacy && el.hasClass('dialog--overlay');
}





$.fn.resizify = function () {
  $(window).off("resize.resizify");
  
  return this.each(function () {
    var dialogWrapper = $(this),
      dialogEl = dialogWrapper.children(".dialog__content"),
      dialogOrigWidth = getWrappedWidth(dialogEl, dialogWrapper);
      dialogOrigHeight = getWrappedHeight(dialogEl, dialogWrapper);

    function resizeDialog() {
      var win = $(window),
          vw = win.width(),
          vh = win.height();
      
      if (vw <= dialogOrigWidth) {
        dialogWrapper.addClass("dialog--full-width");
        if (isLegacyOverlay(dialogWrapper)) {
          dialogEl.css('margin-left', 0);
        }
      } else {
         dialogWrapper.removeClass("dialog--full-width");
         dialogOrigWidth = Math.max(getWrappedWidth(dialogEl, dialogWrapper), dialogOrigWidth);
         if (isLegacyOverlay(dialogWrapper)) {
          dialogEl.css('margin-left', - dialogEl.outerWidth()/2);
         }
      }
      
      
      if (vh <= dialogOrigHeight) {
        dialogWrapper.addClass("dialog--full-height");
        if (isLegacyOverlay(dialogWrapper)) {
          dialogEl.css('margin-top', 0);
        }
      } else {
        dialogWrapper.removeClass("dialog--full-height");
        dialogOrigHeight = Math.max(getWrappedHeight(dialogEl, dialogWrapper), dialogOrigHeight);
        if (isLegacyOverlay(dialogWrapper)) {
          dialogEl.css('margin-top', - dialogEl.outerHeight()/2);
        }
      }
      
    }

    resizeDialog();

    $(window).on("resize.resizify", function() {
        resizeDialog();
    });



  });
};

/* document.getElementById('username').focus(); */

$('.dialog-trigger').click(function () {
    $('.dialog').removeClass('is-open');
    $('.' + this.dataset.target).toggleClass('is-open').resizify();
});

// $('.dialog--overlay').click(function () {
//     $(this).removeClass('is-open');
// });

$(document).keyup(function(e) {

  if (e.keyCode == 27) { $('.dialog').removeClass('is-open'); }   // esc
});
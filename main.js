function getSpacing(el, side) {
  return parseInt(el.css('padding-' + side), 10) + parseInt(el.css('margin-' + side), 10);
}

function getWrappedWidth(el, wrapper) {
  return el.outerWidth() + getSpacing(wrapper, 'left') + getSpacing(wrapper, 'right');
}


function getWrappedHeight(el, wrapper) {
  return el.outerHeight() + getSpacing(wrapper, 'top') + getSpacing(wrapper, 'bottom');
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
      } else {
         dialogWrapper.removeClass("dialog--full-width");
         dialogOrigWidth = Math.max(getWrappedWidth(dialogEl, dialogWrapper), dialogOrigWidth);
      }
      
      
      if (vh <= dialogOrigHeight) {
        dialogWrapper.addClass("dialog--full-height");
      } else {
        dialogWrapper.removeClass("dialog--full-height");
        dialogOrigHeight = Math.max(getWrappedHeight(dialogEl, dialogWrapper), dialogOrigHeight);
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
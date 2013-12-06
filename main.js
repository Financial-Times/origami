function getSpacing(el, side) {
  return parseInt(el.css('padding-' + side), 10) + parseInt(el.css('margin-' + side), 10);
}




$.fn.resizify = function () {
  $(window).off("resize.resizify");
  
  return this.each(function () {
    var dialogWrapper = $(this),
      dialogEl = dialogWrapper.children(".dialog__content"),
      dialogOrigWidth = dialogEl.outerWidth() + getSpacing(dialogWrapper, 'left') + getSpacing(dialogWrapper, 'right'),
      dialogOrigHeight = dialogEl.outerHeight() + getSpacing(dialogWrapper, 'top') + getSpacing(dialogWrapper, 'bottom');



    function resizeDialog() {
      var win = $(window),
          vw = win.width(),
          vh = win.height();
      
      if (vw <= dialogOrigWidth) {
        dialogWrapper.addClass("dialog--full-width");
      } else {
         dialogWrapper.removeClass("dialog--full-width");
      }
      
      
      if (vh <= dialogOrigHeight) {
        dialogWrapper.addClass("dialog--full-height");
      } else {
        dialogWrapper.removeClass("dialog--full-height");
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

$('.dialog--overlay').click(function () {
    $(this).removeClass('is-open');
});
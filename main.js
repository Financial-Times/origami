function getSpacing(el, side) {
  return parseInt(el.css('padding-' + side), 10) + parseInt(el.css('margin-' + side), 10);
}

var dialogDimensionCalculators = {
  width: function (el, wrapper) {
    return el.outerWidth() + getSpacing(wrapper, 'left') + getSpacing(wrapper, 'right');
  },
  height: function (el, wrapper) {
    return el.outerHeight() + getSpacing(wrapper, 'top') + getSpacing(wrapper, 'bottom');
  } 
};



function isLegacyOverlay (el) {
  return !Modernizr.flexbox && !Modernizr.flexboxlegacy && el.hasClass('dialog--overlay');
}





$.fn.resizify = function () {
  var win = $(window);

  win.off("resize.resizify");
  
  

  return this.each(function () {
    var dialogWrapper = $(this),
        dialogEl = dialogWrapper.children(".dialog__content"),
        dialogDimensions = {
          width: dialogDimensionCalculators.width(dialogEl, dialogWrapper),
          height: dialogDimensionCalculators.height(dialogEl, dialogWrapper)
        };

    function fullScreenSwitch (dimension) {
      var edge = dimension === 'width' ? 'left' : 'top',
          ucDimension = dimension.charAt(0).toUpperCase() + dimension.substr(1);

      if (win[dimension]() <= dialogDimensions[dimension]) {
        dialogWrapper.addClass('dialog--full-' + dimension);
        if (isLegacyOverlay(dialogWrapper)) {
          dialogEl.css('margin-' + edge, 0);
        }
      } else {
         dialogWrapper.removeClass('dialog--full-' + dimension);
         dialogDimensions[dimension] = Math.max(dialogDimensionCalculators[dimension](dialogEl, dialogWrapper), dialogDimensions[dimension]);
         if (isLegacyOverlay(dialogWrapper)) {
          dialogEl.css('margin-' + edge, -dialogEl['outer' + ucDimension]()/2);
         }
      }
    }
    
    function resizeDialog() {
      fullScreenSwitch('width');
      fullScreenSwitch('height');
    }

    resizeDialog();

    win.on("resize.resizify", function() {
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
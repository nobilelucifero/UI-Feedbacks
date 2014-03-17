// wait for onload
window.addEventListener("load", function () {

  'use strict';

  // from davidwalsh.name/css-animation-callback
  function whichAnimationEvent() {
    var t;
    var el = document.createElement('fakeelement');
    var animations = {
      'animation'      : 'animationend',
      'OAnimation'     : 'oAnimationEnd',
      'MozAnimation'   : 'animationend',
      'WebkitAnimation': 'webkitAnimationEnd',
      'MsAnimation'    : 'msAnimationEnd'
    };

    for(t in animations) {
        if(el.style[t] !== undefined) {
          return animations[t];
        }
    }
  }

  var ANIMATIONEND   = whichAnimationEvent();
  var buttons        = document.querySelectorAll('.js-feedback');
  var buttonFX       = 'FXBounce';
  var buttonFeedback = 'is--active';

  // applyFX: handles the CSS animation
  var applyFX = function(el) {
    el.classList.add(buttonFX);

    console.debug('FX::APPLY', el.className);

    el.addEventListener(ANIMATIONEND, function () {
      removeFX(el);
    });

    if (el.classList.contains('is--toggle') || el.classList.contains('has--queue')) {
      leaveFX(el);
    }
  };

  // removeFX: removes CSS animation after applyFX
  var removeFX = function (el) {
    el.classList.remove(buttonFX);

    console.debug('FX::REMOVE', el.className);
  };

  // leaveFX: apply possible feedback after applyFX
  var leaveFX = function (el) {
    var prevEl = el.previousElementSibling;

    el.classList.toggle(buttonFeedback);

    if (prevEl) {
      prevEl.classList.toggle(buttonFeedback);
    }

    console.debug('FX::LEAVE', el.className);
  };

  // cycle through buttons elements
  for (var i = 0, n = buttons.length; i < n; i++) {
    var el = buttons[i];

    el.addEventListener('click', function(e) {
      var trueHref = this.href.match(/#/);
      applyFX(this);

      if (trueHref) {
        e.preventDefault();
      }
    }, false);
  }

}); // end script

// jQuery code
// console.log('I\'m jQuery');
;// from davidwalsh.name/css-animation-callback
function whichAnimationEvent(){
    var t;
    var el = document.createElement('fakeelement');
    var animations = {
      'animation':'animationend',
      'OAnimation':'oAnimationEnd',
      'MozAnimation':'animationend',
      'WebkitAnimation':'webkitAnimationEnd',
      'MsAnimation':'msAnimationEnd'
    }

    for(t in animations){
        if( el.style[t] !== undefined ){
            return animations[t];
        }
    }
}

var ANIMATIONEND   = whichAnimationEvent();
var buttons        = document.querySelectorAll('.js-feedback');
var buttonFX       = 'FXBounce';
var buttonSTIdle   = 'STIdle';
var buttonFeedback = 'is--active';

// applyFX: handles the CSS animation
var applyFX        = function(el) {
  el.classList.add(buttonFX);
  console.log('FX::APPLY', el.className);
  el.addEventListener(ANIMATIONEND, function () {
    removeFX(el);
  });
  if (el.classList.contains('is--toggle')) {
    leaveFX(el);
  }
  if (el.classList.contains('has--queue')) {
    leaveFX(el);
  }
}
// removeFX: removes CSS animation after applyFX
var removeFX       = function (el) {
  el.classList.remove(buttonFX);
  console.log('FX::REMOVE', el.className);
};

// leaveFX: apply possible feedback after applyFX
var leaveFX        = function (el) {
	var prevEl = el.previousSibling.previousElementSibling;
  el.classList.toggle(buttonFeedback);
  if (prevEl) {
  	prevEl.classList.toggle(buttonFeedback);
  }
  console.log('FX::LEAVE', el.className);
};

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

// var availHeight = window.innerHeight;
// var folds = document.querySelectorAll('.header, section');
// var applyAvailHeight = function (el) {
//   el.style.minHeight = availHeight + 'px';
// }

// for (var i = 0, n = folds.length; i < n; i++) {
//   var el = folds[i];
//   applyAvailHeight(el);
// }

var svgs = document.querySelectorAll('.has--svg');

for (var i = 0, n = svgs.length; i < n; i++) {
  var el = svgs[i];
  // console.log('wohooo', el.src);
  // applyAvailHeight(el);
}

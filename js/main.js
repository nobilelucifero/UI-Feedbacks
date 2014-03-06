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
  console.log('wohooo', el.src);
  // applyAvailHeight(el);
}

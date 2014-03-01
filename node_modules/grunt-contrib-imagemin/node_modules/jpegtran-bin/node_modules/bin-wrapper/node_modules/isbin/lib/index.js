/**
 * Require dependencies
 */

var fs    = require('fs')
  , async = require('async');

/**
 * Check if given binary exists
 *
 * @param  {String} bin                     Binary to test
 * @param  {String|Array} additional        Additional paths to check
 * @param  {Function(result)} isbinChecked  Callback when check is done async, optional
 * @return {Boolean}                        True if binary was found
 */

function isbin(bin, additional, isbinChecked) {
  // isbin(bin, cb)
  if (!isbinChecked) isbinChecked = additional;

  // Read $PATH to get set up bin folders
  var paths = process.env.PATH.split(':') || [];

  // isbin(bin, 'path', cb)
  if ('string' === typeof additional) {
    paths.push(additional);
  }

  // isbin(bin, ['path1', 'path2'], cb)
  if ('object' === typeof additional && additional.length !== null) {
    paths.concat(additional);
  }

  // async check
  if ('function' === typeof isbinChecked) {
    return async.some(paths, function(path, pathChecked) {
      fs.exists(path + '/' + bin, pathChecked);
    }, isbinChecked);
  }

  // sync check
  return paths.reverse().some(function(path) {
    return fs.existsSync(path + '/' + bin);
  });
};

/**
 * Expose module
 */

module.exports = isbin;

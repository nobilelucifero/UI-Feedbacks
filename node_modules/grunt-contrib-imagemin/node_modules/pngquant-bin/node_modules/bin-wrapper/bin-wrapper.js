'use strict';

var download = require('download');
var exec = require('child_process').exec;
var fs = require('fs');
var hasOwn = require('mout/object/hasOwn');
var isbin = require('isbin');
var isFunction = require('mout/lang/isFunction');
var mixIn = require('mout/object/mixIn');
var os = require('os');
var path = require('path');
var ProgressBar = require('progress');
var spawn = require('child_process').spawn;
var which = require('which');

/**
 * Initialize BinWrapper with options
 *
 * @param {Object} opts
 * @api public
 */

function BinWrapper(opts) {
    opts = opts || {};
    this.opts = this._parse(opts);
    this.name = this.opts.name;
    this.bin = this.opts.bin;
    this.dest = this.opts.path;
    this.path = this._path() || path.join(this.dest, this.bin);
    this.url = this.opts.url;
    this.src = this.opts.src;
    this.buildScript = this.opts.buildScript;
    this.proxy = process.env.http_proxy ||
         process.env.HTTP_PROXY ||
         process.env.https_proxy ||
         process.env.HTTPS_PROXY ||
         null;
}

/**
 * Check if a binary is present and working
 *
 * @param {String|Array} cmd
 * @param {Function} cb
 * @api public
 */

BinWrapper.prototype.check = function (cmd, cb) {
    var self = this;

    if (!cb && isFunction(cmd)) {
        cb = cmd;
        cmd = ['--help'];
    }

    cmd = cmd;
    cmd = Array.isArray(cmd) ? cmd : [cmd];

    if (this._path()) {
        return self._test(cmd, cb);
    }

    this._download(this.url, this.dest, { mode: '0755', proxy: this.proxy })
        .once('close', function () {
            return self._test(cmd, cb);
        });
};

/**
 * Download source and build a binary
 *
 * @param {Function} cb
 * @api public
 */

BinWrapper.prototype.build = function (cb) {
    var self = this;
    var tmpDir = os.tmpdir ? os.tmpdir() : os.tmpDir();
    var tmp = path.join(tmpDir, this.name);
    var get = this._download(this.src, tmp, { extract: true, strip: '1', proxy: this.proxy });

    if (!cb || !isFunction(cb)) {
        cb = function () {};
    }

    if (!isbin('make')) {
        throw new Error('failed to find make');
    }

    get.once('close', function () {
        exec(self.buildScript, { cwd: tmp }, function (err) {
            if (err) {
                return cb(err);
            }

            return cb();
        });
    });
};

/**
 * Download a string or an array of files
 *
 * @param {String|Array} src
 * @param {String} dest
 * @param {Object} opts
 * @api private
 */

BinWrapper.prototype._download = function (src, dest, opts) {
    var get = download(src, dest, opts);

    get.on('response', function (res) {
        var len = parseInt(res.headers['content-length'], 10);
        var bar = new ProgressBar('  ' + path.basename(src) + ': downloading [:bar] :percent :etas', {
            complete: '=',
            incomplete: ' ',
            width: 20,
            total: len
        });

        res.on('data', function (data) {
            bar.tick(data.length);
        });

        res.on('end', function () {
            console.log('\n');
        });
    });

    return get;
};

/**
 * If a binary exists, get its path
 *
 * @api private
 */

BinWrapper.prototype._path = function () {
    var self = this;

    if (fs.existsSync(path.join(this.dest, this.bin))) {
        return path.join(self.dest, self.bin);
    }

    if (isbin(this.bin)) {
        if (which.sync(self.bin).indexOf('node_modules/.bin') === -1) {
            return which.sync(self.bin);
        }
    }

    return false;
};

/**
 * Test if a binary is working by checking its exit code
 *
 * @param {Array} cmd
 * @param {Function} cb
 * @api private
 */

BinWrapper.prototype._test = function (cmd, cb) {
    var working;
    var bin = spawn(this.path, cmd);

    bin.on('error', function () {
        working = false;
        return cb(working);
    });

    bin.on('exit', function (code) {
        working = code === 0;
        return cb(working);
    });
};

/**
 * Parse options
 *
 * @param {Object} opts
 * @api private
 */

BinWrapper.prototype._parse = function (opts) {
    opts.platform = opts.platform || {};
    opts.arch = opts.arch || {};

    var platform = process.platform;
    var arch = process.arch === 'x64' ? 'x64' : process.arch === 'arm' ? 'arm' : 'x86';
    var required = [
        'bin',
        'name',
        'path',
        'url'
    ];

    if (hasOwn(opts.platform, [platform])) {
        opts = mixIn(opts, opts.platform[platform]);
    }

    if (hasOwn(opts.arch, [arch])) {
        opts = mixIn(opts, opts.arch[arch]);
    }

    required.forEach(function (val) {
        if (!hasOwn(opts, val)) {
            throw new Error(val + ' option is required');
        }
    });

    delete opts.platform;
    delete opts.arch;

    return opts;
};

/**
 * Module exports
 */

module.exports = BinWrapper;

'use strict';

var Bin = require('bin-wrapper');
var path = require('path');

var options = {
	name: 'optipng',
	bin: 'optipng',
	path: path.join(__dirname, '../vendor'),
	src: 'http://downloads.sourceforge.net/project/optipng/OptiPNG/optipng-0.7.4/optipng-0.7.4.tar.gz',
	buildScript: './configure --with-system-zlib --bindir="' + path.join(__dirname, '../vendor') + '" && ' +
				 'make install',
	platform: {
		darwin: {
			url: 'https://raw.github.com/yeoman/node-optipng-bin/master/vendor/osx/optipng'
		},
		freebsd: {
			url: 'https://raw.github.com/yeoman/node-optipng-bin/master/vendor/freebsd/optipng'
		},
		linux: {
			url: 'https://raw.github.com/yeoman/node-optipng-bin/master/vendor/linux/x86/optipng',
			arch: {
				x64: {
					url: 'https://raw.github.com/yeoman/node-optipng-bin/master/vendor/linux/x64/optipng'
				}
			}
		},
		sunos: {
			url: 'https://raw.github.com/yeoman/node-optipng-bin/master/vendor/sunos/x86/optipng',
			arch: {
				x64: {
					url: 'https://raw.github.com/yeoman/node-optipng-bin/master/vendor/sunos/x64/optipng',
				}
			}
		},
		win32: {
			bin: 'optipng.exe',
			url: 'https://raw.github.com/yeoman/node-optipng-bin/master/vendor/win/optipng.exe'
		}
	}
};
var bin = new Bin(options);

exports.bin = bin;
exports.options = options;
exports.path = bin.path;

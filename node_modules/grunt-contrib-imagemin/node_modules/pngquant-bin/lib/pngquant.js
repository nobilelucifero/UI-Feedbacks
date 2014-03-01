'use strict';

var Bin = require('bin-wrapper');
var path = require('path');

var options = {
	name: 'pngquant',
	bin: 'pngquant',
	path: path.join(__dirname, '../vendor'),
	src: 'https://github.com/pornel/pngquant/archive/2.0.0.tar.gz',
	buildScript: 'make install BINPREFIX="' + path.join(__dirname, '../vendor') + '"',
	platform: {
		darwin: {
			url: 'https://raw.github.com/sindresorhus/node-pngquant-bin/v0.1.5/vendor/osx/pngquant'
		},
		linux: {
			url: 'https://raw.github.com/sindresorhus/node-pngquant-bin/v0.1.5/vendor/linux/x86/pngquant',
			arch: {
				x64: {
					url: 'https://raw.github.com/sindresorhus/node-pngquant-bin/v0.1.5/vendor/linux/x64/pngquant'
				}
			}
		},
		win32: {
			bin: 'pngquant.exe',
			url: 'https://raw.github.com/sindresorhus/node-pngquant-bin/v0.1.5/vendor/win/pngquant.exe'
		}
	}
};
var bin = new Bin(options);

exports.bin = bin;
exports.options = options;
exports.path = bin.path;

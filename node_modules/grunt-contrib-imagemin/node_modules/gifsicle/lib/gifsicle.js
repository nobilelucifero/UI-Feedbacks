'use strict';

var Bin = require('bin-wrapper');
var path = require('path');

var options = {
	name: 'gifsicle',
	bin: 'gifsicle',
	path: path.join(__dirname, '../vendor'),
	src: 'http://www.lcdf.org/gifsicle/gifsicle-1.71.tar.gz',
	buildScript: './configure --disable-gifview --disable-gifdiff ' +
				 '--bindir="' + path.join(__dirname, '../vendor') + '" && ' +
				 'make install',
	platform: {
		darwin: {
			url: 'https://raw.github.com/yeoman/node-gifsicle/master/vendor/osx/gifsicle'
		},
		linux: {
			url: 'https://raw.github.com/yeoman/node-gifsicle/master/vendor/linux/x86/gifsicle',
			arch: {
				x64: {
					url: 'https://raw.github.com/yeoman/node-gifsicle/master/vendor/linux/x64/gifsicle'
				}
			}
		},
		freebsd: {
			url: 'https://raw.github.com/yeoman/node-gifsicle/master/vendor/freebsd/x86/gifsicle',
			arch: {
				x64: {
					url: 'https://raw.github.com/yeoman/node-gifsicle/master/vendor/freebsd/x64/gifsicle'
				}
			}
		},
		win32: {
			bin: 'gifsicle.exe',
			url: 'https://raw.github.com/yeoman/node-gifsicle/master/vendor/win/x86/gifsicle.exe',
			arch: {
				x64: {
					url: 'https://raw.github.com/yeoman/node-gifsicle/master/vendor/win/x64/gifsicle.exe'
				}
			}
		}
	}
};
var bin = new Bin(options);

exports.bin = bin;
exports.options = options;
exports.path = bin.path;

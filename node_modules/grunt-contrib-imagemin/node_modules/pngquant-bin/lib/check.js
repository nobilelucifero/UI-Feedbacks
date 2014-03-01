'use strict';

var bin = require('./pngquant').bin;
var chalk = require('chalk');

bin.check(function (w) {
	if (!w) {
		console.log(chalk.red('✗ pre-build test failed, compiling from source...'));

		if (process.platform === 'win32') {
			throw new Error('building is not supported on ' + process.platform);
		}

		return bin.build(function (err) {
			if (err) {
				return console.log(chalk.red('✗ ' + err.message));
			}

			console.log(chalk.green('✓ pngquant rebuilt successfully'));
		});
	}

	console.log(chalk.green('✓ pre-build test passed successfully'));
});

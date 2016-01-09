/* eslint no-console: 0 */

'use strict';

// Dependencies
// --------------------------------------------------------

const mocha  = require('mocha');
const eslint = require('eslint');

// --------------------------------------------------------

Promise.resolve()

// 1) Static Analysis
// --------------------------------------------------------

	.then(function ()
	{
		console.log('1) Static Analysis');

		let engine = new eslint.CLIEngine(
		{
			useEslintrc : true
		});

		let report = engine.executeOnFiles(
		[
			'scripts/test.js', 'src/RuntimeError.js', 'tests/RuntimeError.js'
		]);

		if (report.errorCount > 0 || report.warningCount > 0)
		{
			console.log(
				engine.getFormatter('stylish')(report.results)
			);
		}
		else
		{
			console.log('');
			console.log('No problems or warnings found.');
			console.log('');
		}

		if (report.errorCount > 0)
		{
			throw new Error('Static analysis has found some problems that are requiring your immediate attention.');
		}
	})

// 2) Tests
// --------------------------------------------------------

	.then(function ()
	{
		console.log('2) Tests');

		return new Promise(function (success, failure)
		{
			new mocha(
			{
				ui : 'bdd', reporter : 'spec'

			}).addFile('tests/RuntimeError.js').run(function (errors)
			{
				if (errors)
				{
					failure(
						new Error('Some tests have failed and are requiring your immediate attention.')
					);
				}
				else
				{
					success();
				}
			});
		});
	})

// Catch
// --------------------------------------------------------

	.then(

		// Success.
		function ()
		{
			process.exit(0);
		},

		// Failure.
		function ()
		{
			process.exit(-1);
		});

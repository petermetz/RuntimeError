/* eslint no-console: 0 */

'use strict';

// Dependencies
// --------------------------------------------------------

const eslint = require('eslint');
const mocha  = require('mocha');
const colors = require('colors');

// --------------------------------------------------------

Promise.resolve()

// Static Analysis
// --------------------------------------------------------

	.then(function ()
	{
		console.log(
			colors.underline('Running static analysis (eslint)')
		);

		let engine = new eslint.CLIEngine(
		{
			useEslintrc : true
		});

		let report = engine.executeOnFiles(
		[
			'scripts/test.js', 'src/RuntimeError.js', 'tests/RuntimeError.js'
		]);

		console.log(
			engine.getFormatter('stylish')(report.results)
		);

		if (report.errorCount > 0)
		{
			throw new Error('Static analysis has found some problems that are requiring your immediate attention.');
		}
	})

// Unit Tests
// --------------------------------------------------------

	.then(function ()
	{
		console.log(
			colors.underline('Running unit tests (mocha)')
		);

		return new Promise(function (success, failure)
		{
			new mocha(
			{
				ui : 'bdd', reporter : 'list'
			})
				.addFile('tests/RuntimeError.js').run(function (errors)
				{
					if (errors)
					{
						failure(
							new Error('Some tests have failed and are requiring your immediate attention.')
						);

						return;
					}

					success();
				});
		});
	})

// --------------------------------------------------------

	.then(function ()
	{
		process.exit(0);
	})

// --------------------------------------------------------

	.catch(function ()
	{
		process.exit(1);
	});

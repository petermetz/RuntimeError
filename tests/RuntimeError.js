/* eslint-env mocha */

'use strict';

// Dependencies
// --------------------------------------------------------

const chai = require('chai');

// --------------------------------------------------------

describe('class RuntimeError', function ()
{
	const RuntimeError = require('../src/RuntimeError');

	// -------------------------------------------------------

	describe('constructor(message, cause)', function ()
	{
		it('shall create a runtime error which extends the native Error type', function ()
		{
			// Act.
			let error = new RuntimeError();

			// Assert.
			chai.expect(error).to.be.an.instanceof(Error);
		});

		it('shall create a runtime error which has the `name` property set to `RuntimeError`', function ()
		{
			// Act.
			let error = new RuntimeError();

			// Assert.
			chai.expect(error.name).to.equal('RuntimeError');
		});

		it('shall create a runtime error with a given `message` and `cause`', function ()
		{
			// Prepare.
			let cause = new Error('This is an error.');

			// Act.
			let error = new RuntimeError(
				'This is a runtime error.', cause
			);

			// Assert.
			chai.expect(error.message).to.equal('This is a runtime error.');

			// Assert.
			chai.expect(error.cause).to.equal(cause);
		});

		it('shall create a runtime error with its `cause` set to `null` when no cause is provided', function ()
		{
			// Act.
			let error = new RuntimeError(
				'This is a runtime error with no cause.'
			);

			// Assert.
			chai.expect(error.cause).to.be.null;
		});

		it('shall create a runtime error with its `message` set to `` (an empty string) when no message is provided', function ()
		{
			// Act.
			let error = new RuntimeError();

			// Assert.
			chai.expect(error.message).to.equal('');
		});
	});

	// -------------------------------------------------------

	describe('toJSON()', function ()
	{
		it('shall return a plain object containing the standard `name` and `message` properties', function ()
		{
			// Prepare.
			let error = new RuntimeError('This is a runtime error.');

			// Act.
			let object = error.toJSON();

			// Assert.
			chai.expect(object).to.include(
			{
				name : error.name, message : error.message
			});
		});

		it('shall return a plain object with the `cause` property set to `null` if the target runtime error does not have a cause', function ()
		{
			// Prepare.
			let error = new RuntimeError('This is a runtime error.');

			// Act.
			let object = error.toJSON();

			// Assert.
			chai.expect(object.cause).to.equal(null);
		});

		it('shall recursively convert the `cause` to a plain object with all its properties (enemerable, or non-enemerable) copied to it', function ()
		{
			// Prepare.
			let cause = new Error('This is an error.');

			Object.defineProperty(cause, 'anEnumerableProperty',
			{
				enumerable : true, value : 'value'
			});

			Object.defineProperty(cause, 'aNonEnumerableProperty',
			{
				enumerable : false, value : 'value'
			});

			// Act.
			let object = new RuntimeError('This is a runtime error', cause).toJSON();

			// Assert.
			chai.expect(object.cause).to.include(
			{
				name : cause.name, message : cause.message, anEnumerableProperty : cause.anEnumerableProperty, aNonEnumerableProperty : cause.aNonEnumerableProperty
			});
		});
	});
});

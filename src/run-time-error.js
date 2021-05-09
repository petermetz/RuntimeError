'use strict';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function errorToObject (error)
{
	let object = { name : error.name };

	Object.getOwnPropertyNames(error).forEach(key =>
	{
		let value = error[key];

		if (value instanceof Error)
		{
			object[key] = errorToObject(value);
		}
		else
		{
			object[key] = value;
		}
	});

	return object;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

module.exports = class RuntimeError extends Error
{
	constructor (message, cause = null)
	{
		super(message);

		Object.defineProperty(this, 'name', {
			configurable : true, writable : true, enumerable : true, value : 'RuntimeError'
		});

		Object.defineProperty(this, 'message', {
			configurable : true, writable : true, enumerable : true, value : this.message
		});

		Object.defineProperty(this, 'stack', {
			configurable : true, writable : true, enumerable : true, value : this.stack
		});

		Object.defineProperty(this, 'cause', {
			configurable : true, writable : true, enumerable : true, value : cause
		});
	}

	toJSON ()
	{
		return errorToObject(this);
	}
};

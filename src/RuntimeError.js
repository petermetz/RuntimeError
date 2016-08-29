'use strict';

// --------------------------------------------------------

/**
 * Converts an Error object into a plain object.
 *
 * @private
 *
 * @static
 *
 * @returns {String} The plain object representation of the given Error object.
 *
 * @param {Error} error The error object to be converted.
 *
 * @memberof RuntimeError
 */
function errorToObject (error)
{
	let object = { name : error.name };

	// Now iterate over the error's properties to take into
	// account non-standard properties.
	Object.getOwnPropertyNames(error).forEach(function (key)
	{
		let value = error[key];

		// If a property is an Error, like `RuntimeError#cause`,
		// convert that into an object correctly too.
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

// --------------------------------------------------------

/**
 * A better error that is inspired by the Java exception that is also serializable to JSON.
 *
 * Example usage:
 *
 * ```
 * try
 * {
 *    JSON.parse(someMalformedServiceData);
 * }
 * catch (error)
 * {
 *    throw new RuntimeError('The service data could not be parsed.', error);
 * }
 * ```
 *
 * @extends Error
 */
class RuntimeError extends Error
{
	/**
	 * Creates a runtime error.
	 *
	 * @param {String} message The error message.
	 * @param {Error}  [cause] The error that caused this error.
	 */
	constructor (message, cause = null)
	{
		super(message);

		/**
		 * The name of the error.
		 *
		 * This is redefined to be enumerable unlike `Error#name` because it is usually defined on `Error.prototype`.
		 *
		 * @instance
		 *
		 * @type {String}
		 *
		 * @default 'RuntimeError'
		 *
		 * @memberof RuntimeError
		 */
		Object.defineProperty(this, 'name',
		{
			configurable : true, writable : true, enumerable : true, value : 'RuntimeError'
		});

		/**
		 * The error message.
		 *
		 * This is redefined to be enumerable unlike `Error#message`.
		 *
		 * @instance
		 *
		 * @type {String}
		 *
		 * @memberof RuntimeError
		 */
		Object.defineProperty(this, 'message',
		{
			configurable : true, writable : true, enumerable : true, value : this.message
		});

		/**
		 * The stack trace describing the point in the code at which this error was instantiated.
		 *
		 * This is redefined to be enumerable unlike `Error#stack`.
		 *
		 * @instance
		 *
		 * @type {Error}
		 *
		 * @default null
		 *
		 * @memberof RuntimeError
		 */
		Object.defineProperty(this, 'stack',
		{
			configurable : true, writable : true, enumerable : true, value : this.stack
		});

		/**
		 * The error that caused this runtime error.
		 *
		 * @instance
		 *
		 * @type {Error}
		 *
		 * @default null
		 *
		 * @memberof RuntimeError
		 */
		Object.defineProperty(this, 'cause',
		{
			configurable : true, writable : true, enumerable : true, value : cause
		});
	}

	/**
	 * Returns this runtime error as a plain object for JSON serialization.
	 *
	 * @returns {Object} A plain object representation of this runtime error.
	 */
	toJSON ()
	{
		return errorToObject(this);
	}
}

// --------------------------------------------------------

module.exports = RuntimeError;

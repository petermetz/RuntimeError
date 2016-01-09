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
	let object = { name : error.name, message : error.message };

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
	constructor (message, cause)
	{
		super(message);

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
		this.cause = cause || null;
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

// To maintain consistency with the native Error types; the
// `name` property is defined on the prototype object.
//
// I guess it's done this way to be more memory effecient
// as it's an instance property that won't normally change.
//
// The ECMAScript 6 class syntax doesn't allow property
// definitions, hence why we set it the old fashion way.
RuntimeError.prototype.name = 'RuntimeError';

// --------------------------------------------------------

module.exports = RuntimeError;

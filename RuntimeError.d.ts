/**
 * A better error that is inspired by the Java exception that is also serializable to JSON.
 *
 * Example usage:
 *
 * ``` js
 * try
 * {
 *     throw new Error('The root cause error.');
 * }
 * catch (cause)
 * {
 *     throw new RuntimeError('An unexpected error occurred while performing an operation.', cause);
 * }
 * ```
 */
export default class RuntimeError extends Error
{
	/**
	 * Creates a runtime error.
	 *
	 * @param message The error message.
	 * @param cause   The error that caused the error.
	 */
	constructor(message : string, cause? : Error);

	/**
	 * The error that caused this error.
	 */
	cause : Error | string | null;

	/**
	 * Returns a JSON representation of this runtime error.
	 *
	 * @returns A plain object representation of this runtime error that is serializable to JSON.
	 */
	toJSON() : Object;
}

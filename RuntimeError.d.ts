// Type definitions for RuntimeError
// --------------------------------------------------------

declare class RuntimeError extends Error
{
	cause : Error | null;

	// ----------------------------------------------------

	constructor(message : string, cause? : Error);

	// ----------------------------------------------------

	toJSON() : string;
}

// --------------------------------------------------------

export = RuntimeError;

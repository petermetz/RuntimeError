import { babel } from '@rollup/plugin-babel';
import terser    from '@rollup/plugin-terser';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function bundle (output, {
	transpile = false
} = {})
{
	const plugins = [
		terser()
	];

	if (transpile)
	{
		plugins.unshift(babel({
			babelHelpers : 'bundled'
		}));
	}

	return {
		output, plugins, input : 'src/run-time-error.js'
	};
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default
[
	bundle({
		file : './dist/esm/run-time-error.es5.js',
		format : 'esm'
	}, {
		transpile : true
	}),

	bundle({
		file : './dist/umd/run-time-error.es5.cjs',
		format : 'umd',
		name : 'run-time-error',
		exports : 'named'
	}, {
		transpile : true
	}),

	bundle({
		file : './dist/cjs/run-time-error.cjs',
		format : 'cjs',
		exports : 'named'
	}),

	bundle({
		file : './dist/esm/run-time-error.js',
		format : 'esm'
	})
];

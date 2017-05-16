#!/bin/bash

# ---------------------------------------------------------

set -e

# ---------------------------------------------------------

setupNodeEnvironment ()
{
	echo 'Setting up the Node.js environment...'

	npm install

	# Add the current working directory to the `NODE_PATH`
	# so we can avoid horrible relative paths in our `require`
	# statements.
	export NODE_PATH=$NODE_PATH:$PWD

	# Add the `.bin` directory found in the `node_modules`
	# directory to our PATH, so we can execute tools such
	# as `browserify` directly.
	export PATH=$(npm bin):$PATH
}

# ---------------------------------------------------------

runStaticAnalysis ()
{
	echo 'Running static analysis...'

	eslint ./src/RuntimeError.js ./tests/RuntimeError.test.js
}

# ---------------------------------------------------------

runUnitTests ()
{
	echo 'Running unit tests...'

	mocha ./tests/RuntimeError.test.js
}

# ---------------------------------------------------------

for task; do true; done

case $task in

	'test')
		setupNodeEnvironment
		runStaticAnalysis
		runUnitTests
	;;

esac

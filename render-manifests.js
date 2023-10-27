import fs from 'fs';

const CJS_PACKAGE_JSON_CONTENTS = `
{
  "type": "commonjs"
}
`;

const ESM_PACKAGE_JSON_CONTENTS = `
{
  "type": "module",
  "types": "./dist/esm/run-time-error.d.ts"
}
`;

function main ()
{
	fs.writeFileSync('./dist/esm/package.json', ESM_PACKAGE_JSON_CONTENTS);
	fs.writeFileSync('./dist/cjs/package.json', CJS_PACKAGE_JSON_CONTENTS);
	fs.copyFileSync('./run-time-error.cjs.d.ts', './dist/cjs/run-time-error.d.ts');
	fs.copyFileSync('./run-time-error.esm.d.ts', './dist/esm/run-time-error.d.ts');
}

main();

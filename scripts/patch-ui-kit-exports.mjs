import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const pkgPath = join(process.cwd(), 'dist/ui-kit/package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));

pkg.exports = {
	'./package.json': { default: './package.json' },
	'.': {
		types: './index.d.ts',
		esm2022: './esm2022/marianaLinoGit-model-ui-kit.mjs',
		esm: './esm2022/marianaLinoGit-model-ui-kit.mjs',
		default: './fesm2022/marianaLinoGit-model-ui-kit.mjs'
	},
	'./styles/index': './styles/index.scss',
	'./styles/*': './styles/*'
};

writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);

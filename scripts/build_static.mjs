import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const entryFile = path.resolve(projectRoot, 'src', 'main.tsx');
const outFile = path.resolve(projectRoot, 'assets', 'app.js');

await mkdir(path.dirname(outFile), { recursive: true });

try {
  await build({
    entryPoints: [entryFile],
    bundle: true,
    format: 'esm',
    target: ['es2022'],
    minify: true,
    sourcemap: false,
    outfile: outFile,
    define: {
      'process.env.NODE_ENV': '"production"'
    }
  });
  console.log(`Static bundle written to ${path.relative(projectRoot, outFile)}`);
} catch (error) {
  console.error('Failed to build static bundle', error);
  process.exit(1);
}
